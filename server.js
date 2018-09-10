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

let text = 'Type me :)'
let wordArray = text.split(' ')
let numWinners = 0
let playersById = {}

io.on('connection', (socket) => {
  console.log('A user connected...')
  playersById[socket.id] = {
    nextWordId: 0,
    id: socket.id
  }

  socket.broadcast.emit('connection', socket.id) // send to everyone else that a new player joined
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
