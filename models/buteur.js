var mongoose    = require('mongoose');
var Schema      = mongoose.Schema;

// Buteur Schema
var ButeurSchema = mongoose.Schema({
    nom:       { type: String, required: true, index: { unique: true } }
});


var Buteur = mongoose.model('buteurs', ButeurSchema);

module.exports = Buteur;