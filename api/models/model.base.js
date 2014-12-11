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


var nameSchema = new Schema({
	  name : { type : String, trim : true}
});


nameSchema.pre('save', function (next) {
  
 // do stuff

  next();
  
});


//add plugins
nameSchema.plugin(fullname);
nameSchema.plugin(location);
nameSchema.plugin(candidate_data);
nameSchema.plugin(email);
nameSchema.plugin(privilege);
nameSchema.plugin(user);
nameSchema.plugin(empresa);
nameSchema.plugin(timestamps);


module.exports = mongoose.model('Model', nameSchema); 