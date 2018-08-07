// tell server to look at index.js
const express = require('express'),
bodyParser = require('body-parser')

//Get express
const app = express()

//Tell controller to look at database
const db = require('../models/')

/*CRUD Functions

Create - Added
Read - Added
Update - Added
Destroy - Added
*/

module.exports = {
  index: (req, res) => {
    //get all teams
    db.Team.find({})
    //not currently sure if populate is necessary. Adding anyway.
      .populate('debates')
      .populate('schools')
      .exec((err, teams) => {
        if (err) { console.log(err) }
        console.log(`Teams Delivered`)
        res.json(teams)
      })
  },
  create: (req, res) => {
    db.Team.create(req.body, (err, newTeam) => {
      if (err) { console.log(err) }
      console.log(newTeam)
      res.json(newTeam)
    })
  },
  show: (req, res) => {
    //get single team
    let id = req.params.id
    db.Team.findById(id)
      //again, populate may be unnecessary
      .populate('debates')
      .populate('schools')
      .exec((err, team) => {
        if (err) { console.log(err) }
        console.log(`Single Team Delivered`)
        res.json(team)
    })
  },
  destroy: (req, res) => {
    let id = req.params.id
    db.Team.findByIdAndRemove(id, (err, success) => {
      if (err) { console.log(err) }
      console.log(`Team removed`)
      res.json(success)
    })
  },
  update: (req, res) => {
    let id = req.params.id
    db.findByIdAndUpdate(id, req.body, (err, updatedTeam) => {
      if (err) { console.log(err) }
      console.log(`Updated ${updatedTeam}`)
      res.json(updatedTeam)
    })
  }
}
