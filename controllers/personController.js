// tell server to look at index.js
const express = require('express'),
bodyParser = require('body-parser')

//Get express
const app = express()

//Tell controller to look at database
const db = require('../models/')

module.exports = {
  index: (req, res) => {
    //get all people
    db.Person.find({})
    //populate
      .populate('affiliation')
      .populate('team')
      .exec((err, people) => {
        if (err) { res.sendStatus(500) }
        res.json(people)
      })
  },
  create: (req, res) => {
    if (req.body.type === 'student') {
      addStudent(res, req.body.student, req.body.schoolID);
    } else {
      console.log('type not student');
    }
  },
  show: (req, res) => {
    //get single person
    let id = req.params.id
    db.Person.findById(id)
      //populate
      .populate('affiliation')
      .populate('team')
      .exec((err, person) => {
        if (err) { res.sendStatus(500) }
        res.json(person)
      })
  },
  destroy: (req, res) => {
    let id = req.params.id
    db.Person.findByIdAndRemove(id, (err, success) => {
      if (err) { res.sendStatus(500) }
      res.json(success)
    })
  },
  update: (req, res) => {
    let id = req.params.id
    db.Person.findByIdAndUpdate(id, req.body, (err, updatedPerson) => {
      if (err) { res.sendStatus(500) }
      res.json(updatedPerson)
    })
  }
}


//Helper Functions

const addStudent = (res, studentName, schoolID) => {
  let studentExists;
  db.School.findById(schoolID)
    .populate('students')
    .exec((err, school) => {
      if (err) { res.sendStatus(err) }
      if (school) {

        let student = school.students.find(student => student.name === studentName)
        if (student) { 
          // add student to current tournament
        } else {
          let newStudent = new db.Person({
            name: studentName,
            role: 'student',
            affiliation: school
          })
          school.students.push(newStudent);
          newStudent.save();
          school.save();
          res.json(newStudent);
          console.log(newStudent)
        }
      }
    })
}