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

const roomData = require('./roomData')
const {
  rooms,
  resetRoom,
  addPlayer,
  findJoinedPlayer
} = roomData

io.use((socket, next) => {
  // call the session middleware from the socket middleware to share session data
  sessionMiddleware(socket.request, socket.request.res, next)
})

io.on('connection', async (socket) => {
  const { id: roomId } = socket.handshake.query
  console.log('A user connected to room', roomId)
  socket.join(roomId)

  if (!rooms.hasOwnProperty(roomId)) {
    socket.emit('serverError', 'Room does not exist!')
    socket.disconnect()
    return
  }

  console.log(util.inspect(rooms, false, null, true))

  let player = null

  // if the user's already joined, then we can send their data before actually joining the game
  if (socket.request.session && socket.request.session.userId) {
    player = findJoinedPlayer(roomId, socket.request.session.userId)
    if (player) socket.emit('clientInfo', player.id)
  }

  // send to connected client the game text, and the player list
  const room = rooms[roomId]
  socket.emit('text', room.text)
  socket.emit('players', room.playersById)

  socket.on('join room', async () => {
    player = await addPlayer(socket, roomId)

    if (player) {
      // send the client their id
      socket.emit('clientInfo', player.id)
      // send to everyone (including the new player themself) that a new player connected
      io.to(roomId).emit('join', player)
    }
  })

  // add listeners to this socket
  socket.on('word input', (word) => {
    const { text, wordArray, playerIds, playersById } = room

    if (player && player.nextWordId < wordArray.length) {
      console.log(word, wordArray[player.nextWordId])

      if (word.trim() == wordArray[player.nextWordId]) {
        player.nextWordId++

        // send the progress of whoever just typed a word to everyone in the room (including the typer)
        io.to(roomId).emit('progress', player.id, player.nextWordId)

        if (player.nextWordId == wordArray.length) {
          player.place = ++rooms[roomId].numWinners
          io.to(roomId).emit('place', player.id, player.place)

          if (player.place == playerIds.length) {
            console.log('Game is over!')
            resetRoom(roomId)
            console.log(util.inspect(rooms, false, null, true))

            io.to(roomId).emit('text', text)
            io.to(roomId).emit('players', rooms[roomId].playersById)
            io.to(roomId).emit('removePlayer')
          }
        }
      }
    }
  })

  socket.on('disconnecting', () => {
    console.log('A user disconnected...');
    // don't remove the player when they disconnect
    // we reset players when game resets and then people just join in; i.e. there isn't a
    // need for removing players when they disconnect
    // playersById[id] = undefined

    if (player) {
      io.to(roomId).emit('disconnect', player.id)
    }
  })
})

http.listen(3000, function () {
  console.log('Example app listening on port 3000!\n')
})
