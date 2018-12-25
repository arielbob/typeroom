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

const User = require('./models/User')

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
const { rooms } = roomData

io.use((socket, next) => {
  // call the session middleware from the socket middleware to share session data
  sessionMiddleware(socket.request, socket.request.res, next)
})

// TODO: add resetting the game
io.on('connection', async (socket) => {
  const { id: roomId } = socket.handshake.query
  console.log('A user connected to room', roomId)
  socket.join(roomId)

  if (!rooms.hasOwnProperty(roomId)) {
    socket.emit('serverError', 'Room does not exist!')
    socket.disconnect()
    return
  }

  let username = null;
  let id = socket.id;
  const { session } = socket.request

  // get the current user's data
  if (session && session.userId) {
    try {
      const user = await User.findById(session.userId).exec()

      if (user.username) {
        username = user.username
        id = user._id
      }
    } catch {
      // not sure if we should like return an error here or something
      // just keep the default values if findById throws an error
    }
  }

  let { text, wordArray, playersById } = rooms[roomId]
  if (!playersById.hasOwnProperty(id)) {
    playersById[id] = {
      username: username || 'Guest',
      nextWordId: 0,
      place: null,
      id: id
    }
  }

  console.log(util.inspect(rooms, false, null, true))

  const player = playersById[id]

  socket.to(roomId).emit('connection', player) // send to everyone else that a new player joined
  // send to connected client their id, the game text, and the player list
  socket.emit('clientInfo', id)
  socket.emit('text', text)
  socket.emit('players', playersById)

  // add listeners to this socket
  socket.on('word input', (word) => {
    // const { nextWordId } = playersById[id]
    if (player.nextWordId < wordArray.length) {
      console.log(word, wordArray[player.nextWordId])
      if (word.trim() == wordArray[player.nextWordId]) {
        player.nextWordId++
        // send the progress of whoever just typed a word to everyone in the room (including the typer)
        io.to(roomId).emit('progress', id, player.nextWordId)

        if (player.nextWordId == wordArray.length) {
          player.place = ++rooms[roomId].numWinners
          io.to(roomId).emit('place', id, player.place)
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

    io.to(roomId).emit('disconnect', id)
  })
})

http.listen(3000, function () {
  console.log('Example app listening on port 3000!\n')
})
