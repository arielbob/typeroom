const User = require('./models/User')

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

const addPlayer = async (socket, roomId) => {
  if (rooms.hasOwnProperty(roomId)) {
    // default values
    let username = 'Guest';
    let id = socket.id;

    // get the current user's data
    const { session } = socket.request
    if (session && session.userId) {
      try {
        const user = await User.findById(session.userId).exec()

        if (user) {
          username = user.username
          id = user._id
        }
      } catch(err) {
        console.log(err)
        // not sure if we should like return an error here or something
        // just keep the default values if findById throws an error
      }
    }

    const room = rooms[roomId]
    const { playerIds, playersById } = room

    if (!playersById.hasOwnProperty(id)) {
      playersById[id] = {
        username,
        id,
        nextWordId: 0,
        place: null
      }
      playerIds.push(id)
    }

    return playersById[id]
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
