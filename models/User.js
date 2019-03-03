const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const { isEmail } = require('validator')

var userSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: true,
    trim: true,
    validate: [isEmail, 'Please enter a valid e-mail', 'isinvalid']
  },
  username: {
    type: String,
    unique: true,
    required: true,
    trim: true,
    validate: {
      validator: (v) => {
        return /^[a-zA-Z0-9_-]*$/.test(v)
      },
      type: 'isinvalid',
      message: 'Your username can only contain letters, numbers, underscores, and/or dashes'
    }
  },
  password: {
    type: String,
    required: true
  },
  stats: {
    wpm: {
      total: {
        type: Number,
        default: 0
      },
      average: {
        type: Number,
        default: 0
      }
    },
    races: {
      type: Number,
      default: 0
    },
    wins: {
      type: Number,
      default: 0
    }
  }
})

userSchema.pre('save', function(next) {
  var that = this

  User.findOne({ $or: [ { email: that.email }, { username: that.username} ] }).exec()
    .then(user => {
      if (user) {
        let message = ''
        if (user.username == that.username) {
          message = 'Username already exists'
          if (user.email == that.email) {
            message = 'Username and e-mail already exist'
          }
        } else if (user.email == that.email) {
          message = 'E-mail already exists'
        }

        const err = new Error(message)
        err.status = 400

        next(err)
      } else {
        next()
      }
    })
})

userSchema.pre('save', function(next) {
  var user = this

  bcrypt.hash(user.password, 10)
    .then(hash => {
      user.password = hash
      return next()
    })
    .catch(next)
})

userSchema.statics.authenticate = function(email, password) {
  return new Promise(function(resolve, reject) {
    User.findOne({ email: email }).exec(function(err, user) {
      if (err) return reject(err)
      if (!user) {
        const err = new Error('Incorrect username or password')
        err.status = 401
        return reject(err)
      }

      bcrypt.compare(password, user.password, function(err, result) {
        if (err) return reject(err)

        if (result) {
          return resolve(user)
        } else {
          const err = new Error('Incorrect username or password')
          err.status = 401
          return reject(err)
        }
      })
    })
  })
}

var User = mongoose.model('User', userSchema)

module.exports = User
