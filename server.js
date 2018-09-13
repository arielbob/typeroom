const express = require('express')
const morgan = require('morgan')
const webpack = require('webpack')
const webpackDevMiddleware = require('webpack-dev-middleware')
const config = require('./webpack.dev.js')

const compiler = webpack(config)
const app = express()
const http = require('http').Server(app);
const io = require('socket.io')(http)

app.use(morgan('dev'))

app.use(webpackDevMiddleware(compiler, {
  publicPath: config.output.publicPath
}))

let rooms = {}
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

app.get('/room/:id', (req, res) => {
  res.status(200).send('Welcome to room ' + req.params.id)
})

let text = 'Type me :)'
let wordArray = text.split(' ')
let numWinners = 0
let playersById = {}

// TODO: handle sending messages to only certain rooms
io.on('connection', (socket) => {
  console.log('A user connected...')
  if (!playersById.hasOwnProperty(socket.id)) {
    playersById[socket.id] = {
      username: socket.id, // TODO: get username from db
      nextWordId: 0,
      place: null,
      id: socket.id
    }
  }

  socket.broadcast.emit('connection', playersById[socket.id]) // send to everyone else that a new player joined
  socket.emit('text', text)
  socket.emit('players', playersById) // send to connected client the player list

  socket.on('word input', (word) => {
    const { nextWordId } = playersById[socket.id]
    if (nextWordId < wordArray.length) {
      console.log(word, wordArray[nextWordId])
      if (word.trim() == wordArray[nextWordId]) {
        playersById[socket.id].nextWordId++
        // send everyone their progress (including sender)
        io.emit('progress', socket.id, playersById[socket.id].nextWordId)
        // socket.broadcast.emit('progress', socket.id, playersById[socket.id].nextWordId)
      }
    }
  })

  socket.on('disconnecting', () => {
    console.log('A user disconnected...');
    playersById[socket.id] = undefined

    io.sockets.emit('disconnect', socket.id)
  })
})

http.listen(3000, function () {
  console.log('Example app listening on port 3000!\n')
})
