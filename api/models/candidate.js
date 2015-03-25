// model base

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Load required packages
var timestamps = require('mongoose-timestamp');
var location = require('./plugins/location');
var candidate_data = require('./plugins/candidate_data');
var user = require('./plugins/user');
var active = require('./plugins/active');


var candidateSchema = new Schema({
	 _perfil : {type: Schema.Types.ObjectId, ref: 'PerfilLaboral'}
});



//add createdAt, updatedAt fields
candidateSchema.plugin(user);
candidateSchema.plugin(location);
candidateSchema.plugin(candidate_data);
candidateSchema.plugin(timestamps);
candidateSchema.plugin(active);
var metadata = require('./plugins/metadata');
OrdenServicioSchema.plugin(metadata);




module.exports = mongoose.model('Candidate', candidateSchema); 