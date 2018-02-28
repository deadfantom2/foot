var mongoose    = require('mongoose');
var Schema      = mongoose.Schema;

// Boost Schema
var BoostSchema = mongoose.Schema({
    nom:       { type: String, required: true},
    description : { type: String, required: true},
    prix : {type: number, required: true},
    image:    { type: String, required: true }
});


var Boost = mongoose.model('boosts', BoostSchema);

module.exports = Boost;