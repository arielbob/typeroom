const User = require('./models/User')

class Room {
  constructor(text, numWinners = 0, playerIds = [], playersById = {}) {
    this.text = text
    this.wordArray = text.split(' ')
    this.numWinners = numWinners
    this.playerIds = playerIds
    this.playersById = playersById
  }

  resetRoom() {
    this.numWinners = 0
    this.playerIds = []
    this.playersById = {}
  }

  findJoinedPlayer(id) {
    if (this.playersById.hasOwnProperty(id)) {
      return this.playersById[id]
    }

    return null
  }

  async addPlayer(socket) {
    // default values
    let username = 'Guest'
    let id = this.playerIds.length
    let isGuest = true

    // get the current user's data
    const { session } = socket.request
    if (session && session.userId) {
      try {
        const user = await User.findById(session.userId).exec()

        if (user) {
          username = user.username
          id = user._id
          isGuest = false
        }
      } catch(err) {
        console.log(err)
        // not sure if we should like return an error here or something
        // just keep the default values if findById throws an error
      }
    }

    if (!this.playersById.hasOwnProperty(id)) {
      this.playersById[id] = {
        username,
        id,
        isGuest,
        nextWordId: 0,
        place: null
      }
      this.playerIds.push(id)
    }

    return this.playersById[id]
  }
}

const text = 'Type me :)'
let rooms = {
  0: new Room(text),
  1: new Room('This is the text from room 1')
}

let numRooms = 2

const createRoom = () => {
  const id = numRooms
  const text = 'This is the text from room ' + id

  rooms[id] = new Room(text)
  numRooms++

  return rooms[id]
}

const roomData = {
  rooms,
  createRoom,
  numRooms
}

module.exports = roomData
