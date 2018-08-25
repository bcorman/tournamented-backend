/* eslint-disable */
const db = require('../models');

module.exports = {
  create: (req, res) => {
    db.User.findById(req.body.user, (err, user) => {
      if (err) { console.log(err) }
      let tournament = new db.Tournament({
        name: req.body.tourName,
        location: req.body.tourLocation,
        date: new Date(req.body.tourDate),
        length: req.body.tourLength,
        users: [user]
      });
      tournament.save((err, success) => {
        if (err) {
          console.log(err);
          req.sendStatus(500);
        }
        res.json(success);
      })
    })
    // console.log(req)
    // db.Tournament.create(req.body, (err, newTournament) => {
    //   if (err) {
    //     res.sendStatus(500);
    //   }
    //   console.log(newTournament);
    //   res.json(newTournament);
    // })
  },
  delete: (req, res, next) => {
    let id = req.params.id;
    console.log(id)
    db.Tournament.findByIdAndDelete(id, (err, success) => {
      if (err) {
        res.sendStatus(500);
      }
      res.sendStatus(200);
      console.log(success);
    })
  }
};
