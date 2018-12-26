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

let numRooms = 2

const resetRoom = (id) => {
  if (rooms.hasOwnProperty(id)) {
    rooms[id].numWinners = 0
    rooms[id].playersById = {}
  }
}

const roomData = {
  rooms,
  resetRoom,
  numRooms
}

module.exports = roomData
