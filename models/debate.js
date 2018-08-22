const mongoose = require('mongoose');
let Schema = mongoose.Schema;

let DebateSchema = new Schema({
    teams: {
        prop: {
            type: Schema.Types.ObjectId,
            ref: 'Team'
            },
        opp: {
            type: Schema.Types.ObjectId,
            ref: 'Team'
            }
      },
    judge: {
        type: Schema.Types.ObjectId,
        ref: 'Person'
      },
    location: String
  });

  const Debate = mongoose.model('Debate', DebateSchema);

  module.exports = Debate;