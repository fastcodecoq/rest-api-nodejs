// model base

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Load required packages
var timestamps = require('mongoose-timestamp');
var location = require('./plugins/location');
var candidate_data = require('./plugins/candidate_data');
var email = require('./plugins/email');
var activate = require('./plugins/active');
var privilege = require('./plugins/privileges');
var user = require('./plugins/user');
var empresa = require('./plugins/empresa');


var candidateSchema = new Schema({
	 _cv : {type: Schema.Types.ObjectId, required : true}
});



//add createdAt, updatedAt fields
candidateSchema.plugin(user);
candidateSchema.plugin(location);
candidateSchema.plugin(timestamps);




module.exports = new mongoose.model('Candidate', candidateSchema); 