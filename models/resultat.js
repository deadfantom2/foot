var mongoose    = require('mongoose');
var Schema      = mongoose.Schema;

// user Schema
var ResultatSchema = mongoose.Schema({
    adefinir:       { type: String, required: true },
    adefinir:    { type: String, required: true }
});


var Resultat = mongoose.model('resultats', ResultatSchema);

module.exports = Resultat;