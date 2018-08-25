const db = require('../models');

module.exports = {
  create: (req, res) => {
    console.log(req.body);
    db.Tournament.create(req.body, (err, newTournament) => {
      if (err) {
        res.sendStatus(500);
      }
      console.log(newTournament);
      res.json(newTournament);
    })
  }
};
