var mongoose    = require('mongoose');
var Schema      = mongoose.Schema;

// Prono Schema
var PronoSchema = mongoose.Schema({
    match_id : { type: Schema.Types.ObjectId, ref: 'matchs', required: true },
    utilisateur_id : { type: Schema.Types.ObjectId, ref: 'utilisateurs', required: true },
    goals1:         { type: Number, required: true },
    goals2:         { type: Number, required: true },
    points:          { type: Number, default: 0 },
    date:           { type: Date, required: true }
});


var Prono = mongoose.model('pronos', PronoSchema);

module.exports = Prono;