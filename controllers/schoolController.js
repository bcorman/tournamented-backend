const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const db = require('../models/');

/*CRUD Functions

Create - Added
Read - Added
Update - Added
Destroy - Added
*/

module.exports = {
  index: (req, res) => {
    //get all schools
    db.School.find({}, (err, schools) => {
        if (err) { console.log(err) }
        console.log(`Schools Delivered`);
        res.json(schools);
      })
  },
  indexByTour: (req, res) => {
    //get all schools for specific tournament
    const id = req.params.tournamentid;
    console.log('indexByTour hit')
    db.Tournament.findById(id)
      .populate('schools')
      .exec((err, tournament) => {
       if (err) {
         res.sendStatus(500);
         console.log(err);
       }
       const schools = tournament.schools;
       res.json(schools);
     })

  },
  create: (req, res) => {
    const id = req.body.id;
    const school = req.body.school;

    db.Tournament.findById(id, (err, tournament) => {
      if (err) {
        res.sendStatus(500);
        console.log(err);
      }

    db.School.findOne({name: school.name}, (err, found) => {

      if (err) { console.log(err) }

      if (found) {
        res.send('School name must be unique');
      }

      if (found === null) {

          let newSchool = new db.School({
            name: school.name,
            tournaments: [tournament]
          })
          tournament.schools.push(newSchool);
          tournament.save();
          newSchool.save();
          res.json(newSchool)
        }
      })
    })
  },
  show: (req, res) => {
    //get single school
    let id = req.params.id;
    db.School.findById(id, (err, school) => {
        if (err) { console.log(err) }
        console.log(`Single School Delivered`)
        res.json(school);
    })
  },
  destroy: (req, res) => {

    //User should never need to do this.
    let id = req.params.id
    db.School.findByIdAndRemove(id, (err, success) => {
      if (err) { console.log(err) }
      console.log(`School removed`);
      res.json(success);
    })
  },
  update: (req, res) => {
    let id = req.params.id;
    let newInfo = req.body;
    db.School.findByIdAndUpdate(id, newInfo, (err, success) => {
      if (err) { console.log(err) }
      console.log(success);
      res.json(success);
    })
  }
}
