const User = require('./models/User')
const shortid = require('shortid')

class Room {
  constructor(text, numWinners = 0, playerIds = [], playersById = {}) {
    this.text = text
    this.wordArray = text.split(' ')
    this.numWinners = numWinners
    this.playerIds = playerIds
    this.playersById = playersById
    this.timer = null
    this.isRunning = false
    this.raceTime = 20 // 20 seconds
  }

  startRace(callback) {
    if (this.timer) clearTimeout(this.timer)

    this.isRunning = true
    this.timer = setTimeout(() => {
      console.log('race done!')
      this.resetRoom()
      callback()
    }, 1000 * this.raceTime) // 20 seconds TODO: change this
  }

  resetRoom() {
    this.numWinners = 0
    this.playerIds = []
    this.playersById = {}
    this.isRunning = false
  }

  findJoinedPlayer(id) {
    if (this.playersById.hasOwnProperty(id)) {
      return id
    }

    return null
  }

  async addPlayer(socket) {
    // default values
    let username = null
    let id = null
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

    if (!id || !this.playersById.hasOwnProperty(id)) {
      username = username || 'Guest'
      id = id || shortid.generate()

      this.playersById[id] = {
        username,
        id,
        isGuest,
        nextWordId: 0,
        place: null
      }
      this.playerIds.push(id)
    }

    return id
  }

  updateStats() {
    // find the logged in users
    const userIds = this.playerIds.filter(id => {
      return !this.playersById[id].isGuest
    })

    // increment the races stat for all logged in users
    User.updateMany(
      { _id: { $in: userIds } },
      { $inc: { 'stats.races': 1 } }
    ).exec()

    // if the winner is logged in, we increment their wins
    for (let id in this.playersById) {
      const { place, isGuest } = this.playersById[id]

      if (place == 1) {
        if (!isGuest) {
          User.updateOne(
            { _id: id },
            { $inc: { 'stats.wins': 1 } }
          ).exec()
        }

        break;
      }
    }
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
