const router = require('express').Router()
const User = require('../models/user')

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

  if (email && username && password) {
    console.log('attempting to create user')

    User.create(userData)
      .then(() => {
        console.log('created user')
        return res.redirect('/')
      })
      .catch(next)
  } else {
    const err = new Error('All fields must be filled')
    err.status = 400
    return next(err)
  }
})

router.post('/login', function(req, res, next) {
  const { email, password } = req.body

  if (email && password) {
    User.authenticate(email, password)
      .then(user => {
        req.session.userId = user._id
        res.redirect('/profile')
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
    return next()
  }
})

module.exports = router
