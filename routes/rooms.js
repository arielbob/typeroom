const router = require('express').Router()
const roomData = require('../roomData')
const { rooms, createRoom } = roomData

router.post('/create', (req, res) => {
  const roomId = createRoom()
  console.log('Room created:', rooms[roomId])

  res.redirect('/room/' + roomId)
})

module.exports = router
