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
var fullname = require('./plugins/fullname');
var metadata = require('./plugins/metadata');
var orden_servicio = require('./plugins/orden_servicio');


var nameSchema = new Schema({
	  name : { type : String, trim : true}, 
	  description : { type : String, trim : true},
	  entity: String,
	  entity_name: { type : String, trim : true},
	  link : { type : String, trim : true}

});


nameSchema.pre('save', function (next) {
  
 // do stuff

  next();
  
});


//add plugins

nameSchema.plugin(user);
nameSchema.plugin(timestamps);
nameSchema.plugin(metadata);
nameSchema.plugin(orden_servicio);


module.exports = mongoose.model('Event', nameSchema); 