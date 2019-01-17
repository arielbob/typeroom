const router = require('express').Router()
const User = require('../models/User')

router.post('/register', function(req, res, next) {
  const { email, username, password, passwordConf } = req.body

  if (password !== passwordConf) {
    const err = new Error('Passwords do not match')
    err.status = 400
    return next(err)
  }

  const userData = {
    email,
    username,
    password
  }

  if (email.trim() && username.trim() && password) {
    console.log('attempting to create user')

    User.create(userData)
      .then(user => {
        console.log('created user')
        req.session.userId = user._id
        res.json({
          username: user.username,
          email: user.email
        })
      })
      .catch(err => {
        if (err.errors) {
          if (err.errors['email'] && err.errors['email'].kind == 'isinvalid') {
            const error = new Error(err.errors['email'].message)
            error.status = 400
            return next(error)
          }

          if (err.errors['username'] && err.errors['username'].kind == 'isinvalid') {
            const error = new Error(err.errors['username'].message)
            error.status = 400
            return next(error)
          }
        }

        next(err)
      })
  } else {
    const err = new Error('All fields must be filled')
    err.status = 400
    return next(err)
  }
})

router.post('/login', function(req, res, next) {
  const { email, password } = req.body

  if (email && password) {
    // if (req.session.userId) {
    //   console.log(req.session.userId + ' is already logged in!')
    // } else {
    //   console.log('Not logged in yet')
    // }
    User.authenticate(email, password)
      .then(user => {
        req.session.userId = user._id
        res.json({
          username: user.username,
          email: user.email
        })
      })
      .catch(next)
  } else {
    const err = new Error('Please enter an e-mail and password')
    err.status = 400
    return next(err)
  }
})

router.post('/logout', function(req, res, next) {
  if (req.session.userId) {
    req.session.destroy(err => {
      if (err) return next()
    })
  }

  res.redirect('/')
})

router.get('/profile', function(req, res, next) {
  if (req.session.userId) {
    User.findById(req.session.userId).exec()
      .then(user => res.json({
        username: user.username,
        email: user.email
      }))
      .catch(next)
  } else {
    const err = new Error('Profile not found')
    err.status = 404
    return next(err)
  }
})

router.get('/auth', function(req, res, next) {
  if (req.session.userId) {
    User.findById(req.session.userId).exec()
      .then(user => res.json({
        username: user.username,
        email: user.email
      }))
      .catch(next)
  } else {
    const err = new Error('Could not authenticate')
    err.status = 400
    return next(err)
  }
})

module.exports = router
