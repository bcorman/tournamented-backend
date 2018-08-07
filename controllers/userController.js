const db = require('../models')

exports.index = function(req, res) {
  db.User.find({})
    .select('-password')
    .exec(function(err, users) {
      if (err) { res.sendStatus(500) }
      res.json({users})
    })
}
