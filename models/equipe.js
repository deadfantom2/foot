var mongoose    = require('mongoose');
var Schema      = mongoose.Schema;

// user Schema
var EquipeSchema = mongoose.Schema({
    nomEquipe:       { type: String, required: true },
    photo:    { type: String, required: true }
});


var Equipe = mongoose.model('equipes', EquipeSchema);

module.exports = Equipe;