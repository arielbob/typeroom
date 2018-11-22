const express = require('express')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const session = require('express-session')

const webpack = require('webpack')
const webpackDevMiddleware = require('webpack-dev-middleware')
const history = require('connect-history-api-fallback')
const config = require('./webpack.dev.js')

const compiler = webpack(config)
const app = express()
const http = require('http').Server(app)
const io = require('socket.io')(http)

const accounts = require('./routes/accounts')

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

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false
}))

app.use(accounts)

app.use(history())
app.use(webpackDevMiddleware(compiler, {
  publicPath: config.output.publicPath
}))

const text = 'Type me :)'
let rooms = {
  0: {
    text,
    wordArray: text.split(' '),
    numWinners: 0,
    playersById: {}
  },
  1: {
    text: 'This is the text from room 1',
    wordArray: 'This is the text from room 1'.split(' '),
    numWinners: 0,
    playersById: {}
  }
}
let numRooms = 0

app.post('/create', (req, res) => {
  const roomId = numRooms++
  rooms[roomId] = {
    text: 'Type this text from room ' + roomId,
    numWinners: 0,
    playersById: {}
  }

  console.log('Room created:', rooms[roomId])

  res.redirect('/room/' + roomId)
})

// TODO: add resetting the game
io.on('connection', (socket) => {
  const { id: roomId } = socket.handshake.query
  console.log('A user connected to room', roomId)
  socket.join(roomId)

  if (!rooms.hasOwnProperty(roomId)) {
    socket.emit('serverError', 'Room does not exist!')
    socket.disconnect()
    return
  }

  let { text, wordArray, playersById } = rooms[roomId]
  if (!playersById.hasOwnProperty(socket.id)) {
    playersById[socket.id] = {
      username: socket.id, // TODO: get username from db
      nextWordId: 0,
      place: null,
      id: socket.id
    }
  }

  console.log(rooms)

  socket.to(roomId).emit('connection', playersById[socket.id]) // send to everyone else that a new player joined
  socket.emit('text', text)
  socket.emit('players', playersById) // send to connected client the player list

  socket.on('word input', (word) => {
    const { nextWordId } = playersById[socket.id]
    if (nextWordId < wordArray.length) {
      console.log(word, wordArray[nextWordId])
      if (word.trim() == wordArray[nextWordId]) {
        playersById[socket.id].nextWordId++
        // send the progress of whoever just typed a word to everyone in the room (including the typer)
        io.to(roomId).emit('progress', socket.id, playersById[socket.id].nextWordId)
        if (playersById[socket.id].nextWordId == wordArray.length) {
          io.to(roomId).emit('place', socket.id, ++rooms[roomId].numWinners)
        }
      }
    }
  })

  socket.on('disconnecting', () => {
    console.log('A user disconnected...');
    playersById[socket.id] = undefined

    io.to(roomId).emit('disconnect', socket.id)
  })
})

http.listen(3000, function () {
  console.log('Example app listening on port 3000!\n')
})
