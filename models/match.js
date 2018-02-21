var mongoose    = require('mongoose');
var Schema      = mongoose.Schema;

// Equipe Schema
var MatchSchema = mongoose.Schema({

    equipe1_id:     { type: String, required: true },
    equipe2_id:     { type: String, required: true },
    goals1:         { type: String, required: true },
    goals2:         { type: String, required: true }
});


var Match = mongoose.model('matchs', MatchSchema);

module.exports = Match;