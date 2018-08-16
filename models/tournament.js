const mongoose = require('mongoose');
let Schema = mongoose.Schema;

let TournamentSchema = new Schema({
  schools: [{
    type: Schema.Types.ObjectId,
    ref: 'School'
  }],
  students: [{
    type: Schema.Types.ObjectId,
    ref: 'Person'
  }],
  judges: [{
    type: Schema.Types.ObjectId,
    ref: 'Person'
  }],
  coaches: [{
    type: Schema.Types.ObjectId,
    ref: 'Person'
  }],
  teams: [{
    type: Schema.Types.ObjectId,
    ref: 'Team'
  }],
  debates: [{
    type: Schema.Types.ObjectId,
    ref: 'Debate'
  }]
})

const TournamentSchema = mongoose.model('Tournament', TournamentSchema)

module.exports = Tournament
