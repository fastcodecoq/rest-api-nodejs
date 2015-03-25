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
var descripcion = require('./plugins/descripcion');


var nameSchema = new Schema({
	  name : { type : String, trim : true, required: true},
	  nivel: { type : String, trim : true, required: true}	  
});	


nameSchema.pre('save', function (next) {
  
 // do stuff

  next();
  
});


//add plugins
nameSchema.plugin(empresa);
nameSchema.plugin(timestamps);
OrdenServicioSchema.plugin(metadata);


module.exports = mongoose.model('Competencia', nameSchema); 