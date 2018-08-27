/* eslint-disable */
const db = require('../models');

module.exports = {
  show: (req, res) => {
    console.log('tournament show hit')
    let id = req.params.id;
    db.Tournament.findById(id)
    .populate('*')
    .exec((err, tournament) => {
     if (err) {res.sendStatus(500)}
     res.json(tournament);
   })
  },
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
        const tourData = {
          name: success.name,
          location: success.location,
          length: success.length,
          date: success.date,
          _id: success._id
        }
        res.json(tourData);
      })
    })
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
