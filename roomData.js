const User = require('./models/User')
const shortid = require('shortid')

class Room {
  constructor(text, numWinners = 0, playerIds = [], playersById = {}) {
    this.text = text
    this.wordArray = text.split(' ')
    this.numWinners = numWinners
    this.playerIds = playerIds
    this.playersById = playersById

    this.isCounting = false // is the countdown going?
    this.isRunning = false // has the actual race started?

    this.countdownTime = 0
    this.countdownTimer = null

    this.currentTime = 0
    this.timer = null
  }

  startCountdown(callback) {
    if (this.countdownTimer) clearTimeout(this.countdownTimer)

    console.log('countdown started!')

    this.isCounting = true
    this.countdownTime = 3 // 3 seconds

    this.countdownTimer = setInterval(() => {
      this.countdownTime--

      if (this.countdownTime < 0) {
        console.log('countdown done!')
        this.isCounting = false
        clearTimeout(this.countdownTimer)
        callback()
      }
    }, 1000)
  }

  startRace(callback) {
    if (this.timer) clearTimeout(this.timer)

    console.log('race started!');

    this.isRunning = true
    this.currentTime = 20 // 20 seconds

    // NOTE: this is only accurate to 1 second so... client time may be off by like
    // at most 1 second
    this.timer = setInterval(() => {
      this.currentTime--

      if (this.currentTime < 0) {
        console.log('race done!')
        this.isRunning = false
        clearTimeout(this.timer)
        callback()
      }
    }, 1000)
  }

  resetRoom() {
    this.numWinners = 0
    this.playerIds = []
    this.playersById = {}

    this.isCounting = false
    this.isRunning = false

    this.countdownTime = 0
    clearInterval(this.countdownTimer)

    this.currentTime = 0
    clearInterval(this.timer)
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
