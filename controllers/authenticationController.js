const jwt = require('jwt-simple')
const User = require('../models/user')
const db = require('../models')

// Auth functions modeled after General Assembly WDI-Labs demonstration.
// Link to repo: https://git.generalassemb.ly/SF-WDI/react-router-v4-redux-auth


const tokenForUser = (user) => {
    const timestamp = new Date().getTime();
    return jwt.encode({sub: user.id, iat: timestamp}, process.env.KEY)
}

exports.signIn = function (req, res, next) {
  // User has already had their email and password auth'd
  // We just need to give them a token
  const email = req.body.email
  User.findOne({email: email})
  .select('-password')
  .exec(function (err, user) {
      if (err) {
          console.log(err)
          res.sendStatus(500)
          console.log('user not found')
      }
      res.send({token: tokenForUser(req.user)})
  })
}

exports.signUp = function (req, res, next) {
    const username = req.body.username
    const email = req.body.email
    const password = req.body.password

  // See if a user with the given email exists
    if (!email || !password) {
        return res.status(422).send({error: 'You must provide email and password'})
    }

    User.findOne({email: email}, function (err, existingUser) {
        if (err) {
            return next(err) }
        if (existingUser) { return res.status(422).send({error: 'Email is in use'}) }

        const user = new User({ name, username, email, password, isAdmin })

        user.save( function (err) {
            if (err) { return next(err) }
            res.json({token: tokenForUser(user), user, faculty })
        })
    })
}
