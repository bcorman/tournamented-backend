const passportService = require('./services/passport');
const passport = require('passport');
const controller = require('./controllers')
const requireAuth = passport.authenticate('jwt', {session: false});
const requireSignIn = passport.authenticate('local', {session: false});

module.exports = (app) => {
    app.get('/', requireAuth, function (req, res) {
      res.send({message: 'S3CR3T M3SS4G3'});
    });
}
