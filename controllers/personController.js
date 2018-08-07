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
    //get all people
    db.Person.find({})
    //populate
      .populate('affiliation')
      .populate('team')
      .exec((err, people) => {
        if (err) { console.log(err) }
        console.log(`People Delivered`)
        res.json(people)
      })
  },
  create: (req, res) => {
    console.log(req.body.people)
    db.Person.create(req.body.people, (err, newPeople) => {
      if (err) { console.log(err) }
      console.log(`${newPeople} created`)
      res.json(newPeople)
    })
  },
  show: (req, res) => {
    //get single person
    let id = req.params.id
    db.Person.findById(id)
      //populate
      .populate('affiliation')
      .populate('team')
      .exec((err, person) => {
        if (err) { console.log(err) }
        console.log(`Single Person Delivered`)
        res.json(person)
    })
  },
  destroy: (req, res) => {
    let id = req.params.id
    db.Person.findByIdAndRemove(id, (err, success) => {
      if (err) { console.log(err) }
      console.log(`Person removed`)
      res.json(success)
    })
  },
  update: (req, res) => {
    let id = req.params.id
    db.Person.findByIdAndUpdate(id, req.body, (err, updatedPerson) => {
      if (err) { console.log(err) }
      console.log(`${updatedPerson} updated`)
      res.json(updatedPerson)
    })
  }
}
