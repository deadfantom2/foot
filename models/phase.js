var mongoose    = require('mongoose');
var Schema      = mongoose.Schema;

// Phase Schema
var PhaseSchema = mongoose.Schema({
    libelle:       { type: String, required: true },
    dateDebut : { type: Date, required: true },
    dateFin : { type: Date, required: true }
});


var Phase = mongoose.model('phases', PhaseSchema);

module.exports = Phase;