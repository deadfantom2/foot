var mongoose    = require('mongoose');
var Schema      = mongoose.Schema;

// achatBoost Schema
var AchatBoostSchema = mongoose.Schema({
    utilisateur_id : { type: Schema.Types.ObjectId, ref: 'utilisateurs', required: true, index: true },
    boost_id : { type: Schema.Types.ObjectId, ref: 'boosts', required: true, index: true },
    quantite : { type : number, required : true}


});


var AchatBoost = mongoose.model('achatBoosts', ButeurSchema);

module.exports = AchatBoost;