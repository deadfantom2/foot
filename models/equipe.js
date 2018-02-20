var mongoose    = require('mongoose');
var Schema      = mongoose.Schema;

// Equipe Schema
var EquipeSchema = mongoose.Schema({
    nom:       { type: String, required: true },
    drapeau:    { type: String, required: true }
});


var Equipe = mongoose.model('equipes', EquipeSchema);

module.exports = Equipe;