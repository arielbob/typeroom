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

let playersById = {}
let text = 'Type me :)'

io.on('connection', (socket) => {
  console.log('A user connected...')

  socket.emit('players', playersById) // send to connected client the player list
  playersById[socket.id] = {
    words: '',
    id: socket.id
  }

  socket.emit('text', text)

  socket.broadcast.emit('connection', socket.id) // send to everyone else that a new player joined

  socket.on('word input', (word) => {
    console.log('word input: ' + word)
    // should probably check if the word is valid (i.e. it's the next word of the text that needs to be typed)
    // also don't think we even need to send the words; we just need to send their progress
    const { words } = playersById[socket.id]
    playersById[socket.id].words = words ? words + word : word

    socket.broadcast.emit('word input', socket.id, word)
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
