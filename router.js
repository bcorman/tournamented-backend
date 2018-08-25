const passportService = require('./services/passport');
const passport = require('passport');
const controller = require('./controllers');
const requireAuth = passport.authenticate('jwt', {session: false});
const requireSignIn = passport.authenticate('local', {session: false});

module.exports = (app) => {
  app.post('/signup', controller.authentication.signUp);
  app.post('/signin', requireSignIn, controller.authentication.signIn);
  app.post('/setup/init', controller.tournament.create);
  app.delete('/tournament/delete/:id', controller.tournament.delete);
};
