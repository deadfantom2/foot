var mongoose    = require('mongoose');
var Schema      = mongoose.Schema;

// achatBoost Schema
var AchatBoostSchema = mongoose.Schema({
    utilisateur_id : { type: Schema.Types.ObjectId, ref: 'utilisateurs', required: true, index: true },
    boost_id :       { type: Schema.Types.ObjectId, ref: 'boosts', required: true, index: true },
    quantite :       { type: Number, required : true}
});

AchatBoostSchema.index({ utilisateur_id: 1, boost_id: 1 }, { unique: true });

var AchatBoost = mongoose.model('achatBoosts', AchatBoostSchema);

module.exports = AchatBoost;