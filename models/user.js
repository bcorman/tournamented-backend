const mongoose = require('mongoose');
let Schema = mongoose.Schema;
let bcrypt = require('bcrypt-nodejs');

let UserSchema = new Schema({
    username: { type: String, unique: true},
    email: { type: String, unique: true },
    password: String
});

UserSchema.pre('save', function (next) {
    const user = this;
    bcrypt.genSalt(10, function (err, salt) {
        if (err) { return next(err) };
        
        bcrypt.hash(user.password, salt, null, function (err, hash) {
            if (err) { return next(err) };
    
            user.password = hash;
            next();
        });
    });
});

UserSchema.methods.comparePassword = function (candidatePassword, callback) {
    bcrypt.compare(candidatePassword, this.password, function (err, isMatch) {
        if (err) { return callback(err) }
        callback(null, isMatch);
    });
};

const User = mongoose.model('User', UserSchema)

module.exports = User