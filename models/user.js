var mongoose    = require('mongoose');
var Schema      = mongoose.Schema;
var bcrypt      = require('bcrypt');

// user Schema
var UserSchema = mongoose.Schema({
    nom:       { type: String, required: true },
    prenom:    { type: String, required: true },
    email:     { type: String, required: true, index: { unique: true }, validate: { validator: function(mail) {return /^[a-zA-Z0-9.!#$%&’*+\/=?^_`{|}~-]+@ynov\.com$/.test(mail)} }  },
    password:  { type: String, required: true },
    resultats: {

        score: String,

        equipe:String,

        date : Date
    }
});


// Saves the user's password hashed (plain text password storage is not good)
UserSchema.pre('save', function (next) {
    var user = this;
    if (this.isModified('password') || this.isNew) {
        bcrypt.genSalt(10, function (err, salt) {
            if (err) {
                return next(err);
            }
            bcrypt.hash(user.password, salt, function(err, hash) {
                if (err) {
                    return next(err);
                }
                user.password = hash;
                next();
            });
        });
    } else {
        return next();
    }
});

// Create method to compare password input to password saved in database
UserSchema.methods.comparePassword = function(pw, cb) {
    bcrypt.compare(pw, this.password, function(err, isMatch) {
        if (err) {
            return cb(err);
        }
        cb(null, isMatch);
    });
};

var User = mongoose.model('utilisateurs', UserSchema);

module.exports = User;