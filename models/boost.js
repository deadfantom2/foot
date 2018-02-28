var mongoose    = require('mongoose');
var Schema      = mongoose.Schema;

// Boost Schema
var BoostSchema = mongoose.Schema({
    nom:            { type: String, required: true },
    description :   { type: String },
    prix :          { type: Number, required: true },
    image:          { type: String },
    type:           { type: Number, required: true, index: { unique: true } }
});


var Boost = mongoose.model('boosts', BoostSchema);

module.exports = Boost;