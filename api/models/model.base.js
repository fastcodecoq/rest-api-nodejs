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


var nameSchema = new Schema({

});



//add createdAt, updatedAt fields
UsuerioSchema.plugin(timestamps);
//add location field
UsuarioSchema.plugin(location);
//add candidate data
UsuarioSchema.plugin(candidate_data);
//add email
UsuarioSchema.plugin(email);
//add privilege
UsuarioSchema.plugin(privilege);
//add userid
UsuarioSchema.plugin(user);
//add empresaid
UsuarioSchema.plugin(empresa);


module.exports = new mongoose.model('Model', nameSchema); 