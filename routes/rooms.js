const router = require('express').Router()
const roomData = require('../roomData')
const { rooms, createRoom } = roomData

router.post('/create', (req, res) => {
  const room = createRoom()
  console.log('Room created:', room)

  res.json({
    roomId: room.id
  })
})

module.exports = router
