var mongoose    = require('mongoose');
var Schema      = mongoose.Schema;
var bcrypt      = require('bcrypt');
var Prono       = require('./prono');

// user Schema
var UserSchema = mongoose.Schema({
    nom:       { type: String, required: true },
    prenom:    { type: String, required: true },
    email:     { type: String, required: true, index: { unique: true }, validate: { validator: function(mail) {return /^[a-zA-Z0-9.!#$%&’*+\/=?^_`{|}~-]+@ynov\.com$/.test(mail)} }  },
    password:  { type: String, required: true },
    points:    { type: Number, default: 0 },
    choix_equipe_id : { type: Schema.Types.ObjectId, ref: 'equipes', required: true },
    choix_buteur_id : { type: Schema.Types.ObjectId, ref: 'buteurs', required: true },
    groupe : {type: Array},
    isAdmin: { type: Boolean, default: false }
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

UserSchema.methods.syncPoints = function() {
    let _id = this._id;
    Prono.aggregate(
        { 
            $match: {
                utilisateur_id : this._id
            }
        },
        { 
            $project: {
                utilisateur_id: '$utilisateur_id',
                points: { $sum: "$points" }
            }
        },
        {
            $group: {
                _id: "$utilisateur_id",
                points: { $sum: "$points" }
            }
        }
    )
    .exec(function (err, result) {
        if (err) {
            return false;
        } else {
            if(result.length == 0)
                result[0] = { _id: _id, points: 0 };
            User.update({_id: result[0]._id},{ points: result[0].points },{multi: false},function(err,data){
                if (err)
                    return false;
                else
                  return true;
              });
        }
    });
};

var User = mongoose.model('utilisateurs', UserSchema);

module.exports = User;