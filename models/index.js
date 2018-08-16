const mongoose = require("mongoose")
mongoose.connect( process.env.MONGODB_URI || "mongodb://localhost:27017/tournamented", { useNewUrlParser: true } )


module.exports = {
    User: require('./user.js'),
    School: require('./school.js'),
    Debate: require('./debate.js'),
    Team: require('./team.js'),
    Person: require('./person.js'),
    Tournament: require('./tournament.js')
}
