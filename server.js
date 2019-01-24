const express = require('express')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const session = require('express-session')
const MongoStore = require('connect-mongo')(session)

const webpack = require('webpack')
const webpackDevMiddleware = require('webpack-dev-middleware')
const history = require('connect-history-api-fallback')
const config = require('./webpack.dev.js')

const compiler = webpack(config)
const app = express()
const http = require('http').Server(app)
const io = require('socket.io')(http)

const accountsRoutes = require('./routes/accounts')
const roomsRoutes = require('./routes/rooms')

// for logging objects
const util = require('util')

require('dotenv').config()

// connect to db
mongoose.connect('mongodb://localhost/typeroom', {
  useNewUrlParser: true
})
const db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', () => {
  console.log('connected to db')
})

app.use(morgan('dev'))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

const sessionMiddleware = session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  store: new MongoStore({
    mongooseConnection: db
  })
})
app.use(sessionMiddleware)

app.use(accountsRoutes)
app.use(roomsRoutes)

app.use(history())
app.use(webpackDevMiddleware(compiler, {
  publicPath: config.output.publicPath
}))

// app.use((err, req, res, next) => {
//   console.error(err.stack)
//   next(err)
// })
app.use((err, req, res, next) => {
  const status = err.status || 500
  if (status >= 500) console.error(err.message)

  res.status(status).json({
    status: status,
    message: (status >= 500) ? 'Something bad happened...' : err.message
  })
})

const roomData = require('./roomData')
const {
  rooms,
  resetRoom,
  addPlayer,
  findJoinedPlayer,
  deleteRoom
} = roomData

io.use((socket, next) => {
  // call the session middleware from the socket middleware to share session data
  sessionMiddleware(socket.request, socket.request.res, next)
})

io.on('connection', async (socket) => {
  const { id: roomId } = socket.handshake.query
  console.log('A user connected to room', roomId)
  socket.join(roomId)

  const room = rooms[roomId]

  if (!room) {
    socket.emit('gameError', 'roomNotFound')
    socket.disconnect()
    return
  }

  console.log(util.inspect(rooms, false, null, true))

  let playerId = null

  // if the user's already joined the game, we can send their client info.
  // when we send the player list, the client can see that they're already joined
  // so we allow them to type without manually joining again on the client
  if (socket.request.session && socket.request.session.userId) {
    playerId = room.findJoinedPlayer(socket.request.session.userId)
    if (playerId) {
      socket.emit('clientInfo', playerId)
      socket.emit('join', room.playersById[playerId])
    }
  }

  const resetAndEndRace = () => {
    // send the player data once before resetting since resetRoom() will stop the
    // update interval and we want everyone to have the final game data
    io.to(roomId).emit('players', room.playersById)
    room.resetRoom()
    io.to(roomId).emit('removePlayer')
    io.to(roomId).emit('endRace')
  }

  // send to connected client the game text, and the player list
  socket.emit('text', room.text)
  socket.emit('players', room.playersById)

  if (room.isCounting) socket.emit('startCountdown', room.countdownTime)
  if (room.isRunning) socket.emit('startRace', room.currentTime)

  socket.on('join room', async () => {
    playerId = await room.addPlayer(socket)
    const player = room.playersById[playerId]

    if (player) {
      // send the client their id
      socket.emit('clientInfo', playerId)
      // send to everyone (including the new player themself) that a new player connected
      io.to(roomId).emit('join', player)

      if (!room.isCounting && !room.isRunning) {
        // start the countdown on the server
        // send countdownStart to the client
        // when countdown finishes, start the race on the server
        // send startRace to the client
        // when the race ends, send text, players, removePlayer, and endRace

        // TODO: we might want to just send all the player data every few seconds
        // rather than individually every time someone types a word
        // it might be more efficient...
        const update = () => {
          room.updateWpms()
          io.to(roomId).emit('players', room.playersById)
        }

        room.startCountdown(() => {
          room.startRace(update, resetAndEndRace)

          io.to(roomId).emit('startRace', room.currentTime)
        })

        // send all the new data when a new game starts
        io.to(roomId).emit('text', room.text)
        io.to(roomId).emit('players', room.playersById)
        io.to(roomId).emit('startCountdown', room.countdownTime)
      }
    }
  })

  // add listeners to this socket
  socket.on('word input', (word) => {
    const { isRunning, wordArray, playerIds, playersById } = room
    // we do this to make sure the playerId is still joined in the game
    const player = playersById[playerId]

    if (isRunning && player && player.nextWordId < wordArray.length) {
      console.log(word, wordArray[player.nextWordId])

      if (word.trim() == wordArray[player.nextWordId]) {
        player.nextWordId++

        // send the progress of whoever just typed a word to everyone in the room (including the typer)
        // io.to(roomId).emit('progress', playerId, player.nextWordId)

        if (player.nextWordId == wordArray.length) {
          player.place = ++rooms[roomId].numWinners
          // io.to(roomId).emit('place', playerId, player.place)

          if (player.place == playerIds.length) {
            console.log('Game is over!')
            room.updateStats()
            resetAndEndRace()
          }
        }
      }
    }
  })

  socket.on('disconnecting', () => {
  })

  socket.on('disconnect', () => {
    // don't remove the player when they disconnect
    // we reset players when game resets and then people just join in; i.e. there isn't a
    // need for removing players when they disconnect
    // playersById[id] = undefined

    if (room.playersById[playerId]) {
      io.to(roomId).emit('disconnect', playerId)
    }

    // TODO: we might actually want to keep the room alive for a bit longer, but this is fine for now
    console.log('socket disconnected')
    io.sockets.in(roomId).clients((err, clients) => {
      if (err) throw err

      console.log(clients)

      if (clients.length <= 0) deleteRoom(roomId)
    })
  })
})

http.listen(3000, function () {
  console.log('Example app listening on port 3000!\n')
})
