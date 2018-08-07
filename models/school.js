const mongoose = require('mongoose');
let Schema = mongoose.Schema;

let SchoolSchema = new Schema({
  name: { type: String, unique: true },
  teams: {
      type: Schema.Types.ObjectId,
      ref: 'Team'
  },
  debates: {
      type: Schema.Types.ObjectId,
      ref: 'Debate'
  },
  people: {
      type: Schema.Types.ObjectId,
      ref: 'Person'
  }
})

let School = mongoose.model('School', SchoolSchema);

module.exports = School;
