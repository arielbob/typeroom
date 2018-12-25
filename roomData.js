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

const roomData = {
  rooms,
  numRooms: 2
}

module.exports = roomData
