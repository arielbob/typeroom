const router = require('express').Router()
const User = require('../models/User')

router.get('/top10', (req, res, next) => {
  User.aggregate([
      { $sort: {'stats.wins': -1 } },
      { $limit: 10 }
    ])
    .exec()
    .then(users => {
      const topUsers = users.map(user => ({
        username: user.username,
        stats: user.stats
      }))

      res.json([
        ...topUsers
      ])
    })
    .catch(next)
})

module.exports = router
