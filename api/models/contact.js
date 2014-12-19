// model base

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Load required packages
var timestamps = require('mongoose-timestamp');
var user = require('./plugins/user');
var empresa = require('./plugins/empresa');
var meta = require('./plugins/metadata');
var active = require('./plugins/active');


var contactSchema = new Schema({
});


contactSchema.pre('save', function (next) {
  
 
  next();
  
});


//add plugins
contactSchema.plugin(user);
contactSchema.plugin(empresa);
contactSchema.plugin(timestamps);
contactSchema.plugin(meta);
contactSchema.plugin(active);


module.exports = mongoose.model('Contact', contactSchema); 