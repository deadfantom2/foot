var mongoose    = require('mongoose');
var Schema      = mongoose.Schema;

// user Schema
var ResultatSchema = mongoose.Schema({
    equipeUserGoal1:       { type: String, required: true },
    equipeUserGoal2:    { type: String, required: true },
    match_id : { type: Schema.Types.ObjectId, ref: 'matchs'}
});


var Resultat = mongoose.model('resultats', ResultatSchema);

module.exports = Resultat;