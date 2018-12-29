const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

var userSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: true,
    trim: true
  },
  username: {
    type: String,
    unique: true,
    required: true,
    trim: true
  },
  password: {
    type: String,
    required: true
  },
  stats: {
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
