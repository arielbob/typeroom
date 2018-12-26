const text = 'Type me :)'
let rooms = {
  0: {
    text,
    wordArray: text.split(' '),
    numWinners: 0,
    playerIds: [],
    playersById: {}
  },
  1: {
    text: 'This is the text from room 1',
    wordArray: 'This is the text from room 1'.split(' '),
    numWinners: 0,
    playerIds: [],
    playersById: {}
  }
}

let numRooms = 2

const createRoom = () => {
  const id = numRooms
  const text = 'This is the text from room ' + id

  rooms[id] = {
    text,
    wordArray: text.split(' '),
    numWinners: 0,
    playerIds: [],
    playersById: {}
  }

  numRooms++
  return id
}

const resetRoom = (id) => {
  if (rooms.hasOwnProperty(id)) {
    rooms[id].numWinners = 0
    rooms[id].playersById = {}
  }
}

const roomData = {
  rooms,
  createRoom,
  resetRoom,
  numRooms
}

module.exports = roomData
