const User = require('./models/User')
const calculateWpm = require('./util/calculateWpm')
const shortid = require('shortid')

class Room {
  constructor(id, text, numWinners = 0, playerIds = [], playersById = {}) {
    this.id = id
    this.text = text
    this.wordArray = text.split(' ')
    this.numWinners = numWinners
    this.playerIds = playerIds
    this.playersById = playersById

    this.startTimestamp = null

    this.isCounting = false // is the countdown going?
    this.isRunning = false  // has the actual race started?

    this.countdownTime = 0
    this.countdownTimer = null

    // TODO: actually calculate a good race time based on text length
    this.raceTime = 20 // 20 seconds
    this.currentTime = 0
    this.timer = null
  }

  startCountdown(callback) {
    if (this.countdownTimer) clearTimeout(this.countdownTimer)

    console.log('countdown started!')

    this.isCounting = true
    this.countdownTime = 5 // 3 seconds

    this.countdownTimer = setInterval(() => {
      this.countdownTime--

      if (this.countdownTime <= 0) {
        console.log('countdown done!')
        this.isCounting = false
        clearTimeout(this.countdownTimer)
        callback()
      }
    }, 1000)
  }

  // TODO: we can probably move all the io calls to a separate module
  startRace(updateCallback, endCallback) {
    if (this.timer) clearTimeout(this.timer)

    console.log('race started!');

    this.isRunning = true
    this.currentTime = this.raceTime
    this.startTimestamp = Date.now()

    // NOTE: this is only accurate to 1 second so... client time may be off by like
    // at most 1 second
    this.timer = setInterval(() => {
      this.currentTime--
      updateCallback()

      if (this.currentTime < 0) {
        console.log('race done!')
        this.isRunning = false
        clearTimeout(this.timer)
        endCallback()
      }
    }, 1000)
  }

  resetRoom() {
    this.numWinners = 0
    this.playerIds = []
    this.playersById = {}

    this.startTimestamp = null

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
        place: null,
        wpm: 0
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

  updateWpms() {
    for (let id in this.playersById) {
      const player = this.playersById[id]
      if (!player.place) {
        const typed = this.wordArray.slice(0, player.nextWordId).join(' ')
        const delta = Date.now() - this.startTimestamp
        player.wpm = calculateWpm(typed, delta)
      }
    }
  }
}

const text = 'Type me :)'
let rooms = {
  0: new Room(0, text),
  1: new Room(1, 'This is the text from room 1'),
  test: new Room('test', 'The quick brown fox jumps over the lazy dog')
}

const createRoom = () => {
  const id = shortid.generate()
  const text = 'This is the text from room ' + id

  rooms[id] = new Room(id, text)

  return rooms[id]
}

const deleteRoom = (id) => {
  if (rooms[id]) {
    rooms[id].resetRoom()
    delete rooms[id]
    console.log('deleted ' + id)
  }
}

const roomData = {
  rooms,
  createRoom,
  deleteRoom
}

module.exports = roomData
