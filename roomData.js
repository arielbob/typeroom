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
    rooms[id].playerIds = []
    rooms[id].playersById = {}
  }
}

const addPlayer = (roomId, playerId, username = 'Guest', nextWordId = 0, place = null) => {
  if (rooms.hasOwnProperty(roomId)) {
    const room = rooms[roomId]
    const { playerIds, playersById } = room

    if (!playersById.hasOwnProperty(playerId)) {
      playersById[playerId] = {
        username,
        nextWordId,
        place,
        id: playerId
      }
      playerIds.push(playerId)

      return playersById[playerId]
    }
  }

  return null
}

const roomData = {
  rooms,
  createRoom,
  resetRoom,
  addPlayer,
  numRooms
}

module.exports = roomData
