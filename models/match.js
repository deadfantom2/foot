var mongoose    = require('mongoose');
var Schema      = mongoose.Schema;

// Match Schema
var MatchSchema = mongoose.Schema({

    equipe1_id:     { type: Schema.Types.ObjectId, ref: 'equipes', required: true },
    equipe2_id:     { type: Schema.Types.ObjectId, ref: 'equipes', required: true },
    goals1:         { type: String, required: true },
    goals2:         { type: String, required: true }
});



var Match = mongoose.model('matchs', MatchSchema);

module.exports = Match;