const router = require('express').Router()
const roomData = require('../roomData')
const { rooms } = roomData

router.post('/create', (req, res) => {
  const roomId = roomData.numRooms++
  const text = 'Type this text from room ' + roomId

  rooms[roomId] = {
    text,
    wordArray: text.split(' '),
    numWinners: 0,
    playersById: {}
  }

  console.log('Room created:', rooms[roomId])

  res.redirect('/room/' + roomId)
})

module.exports = router
