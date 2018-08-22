const mongoose = require('mongoose');
let Schema = mongoose.Schema;

let TeamSchema = new Schema({
  name: {type: String, unique: true },
  wins: Number,
  debates: [{
       type: Schema.Types.ObjectId,
       ref: 'Debate'
     }],
  school: {
      type: Schema.Types.ObjectId,
      ref: 'School'
    }
});

const Team = mongoose.model('Team', TeamSchema);

module.exports = Team;
