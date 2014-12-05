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


//add full name
UsuarioSchema.plugin(fullname);
//add location field
nameSchema.plugin(location);
//add candidate data
nameSchema.plugin(candidate_data);
//add email
nameSchema.plugin(email);
//add privilege
nameSchema.plugin(privilege);
//add userid
nameSchema.plugin(user);
//add empresaid
nameSchema.plugin(empresa);
//add createdAt, updatedAt fields
nameSchema.plugin(timestamps);


module.exports = mongoose.model('Model', nameSchema); 