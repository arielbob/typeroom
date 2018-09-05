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

let players = []

io.on('connection', (socket) => {
  console.log('A user connected...')

  socket.emit('player list', players) // send to connected client the player list
  players.push(socket.id)

  socket.broadcast.emit('connection', socket.id) // send to everyone else that a new player joined

  socket.on('word input', (word) => {
    console.log('word input: ' + word)
    socket.broadcast.emit('word input', socket.id, word)
  })

  socket.on('disconnecting', () => {
    console.log('A user disconnected...');
    players = players.filter((id) => id != socket.id)
    io.sockets.emit('disconnect', socket.id)
  })
})

http.listen(3000, function () {
  console.log('Example app listening on port 3000!\n')
})
