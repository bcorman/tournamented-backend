// tell server to look at index.js
const express = require('express')

const bodyParser = require('body-parser')

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
    //get all schools
    db.School.find({}, (err, schools) => {
        if (err) { console.log(err) }
        console.log(`Schools Delivered`)
        res.json(schools)
      })
  },
  create: (req, res) => {
    db.School.findOne(req.body, (err, found) => {
      if (err) { console.log(err) }
      if (found === null) {
        db.School.create(req.body, (err, newSchool) => {
            newSchool.name = req.body
            if (err) { console.log(err) }
            console.log(req.body)
            console.log(newSchool)
            res.json(newSchool)

        })
      }
    })
  },
  show: (req, res) => {
    //get single school
    let id = req.params.id
    db.School.findById(id, (err, school) => {
        if (err) { console.log(err) }
        console.log(`Single School Delivered`)
        res.json(school)
    })
  },
  destroy: (req, res) => {

    //User should never need to do this.
    let id = req.params.id
    db.School.findByIdAndRemove(id, (err, success) => {
      if (err) { console.log(err) }
      console.log(`School removed`)
      res.json(success)
    })
  },
  update: (req, res) => {
    let id = req.params.id
    let newInfo = req.body
    db.School.findByIdAndUpdate(id, newInfo, (err, success) => {
      if (err) { console.log(err) }
      console.log(success)
      res.json(success)
    })
  }
}
