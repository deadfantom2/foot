var mongoose    = require('mongoose');
var Schema      = mongoose.Schema;

// Match Schema
var MatchSchema = mongoose.Schema({

    equipe1_id:     { type: Schema.Types.ObjectId, ref: 'equipes', required: true },
    equipe2_id:     { type: Schema.Types.ObjectId, ref: 'equipes', required: true },
    goals1:         { type: Number }, //Laisser ce champs vide si le match n'est pas passé ou bien ne pas le renseigner
    goals2:         { type: Number }, //Laisser ce champs vide si le match n'est pas passé ou bien ne pas le renseigner
    date:           { type: Date, required: true },
    phase_id:     { type: Schema.Types.ObjectId, ref: 'phases', required: true }


});


var Match = mongoose.model('matchs', MatchSchema);

module.exports = Match;