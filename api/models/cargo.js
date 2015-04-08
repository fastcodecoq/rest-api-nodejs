// model base

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Load required packages
var timestamps = require('mongoose-timestamp');
var activate = require('./plugins/active');
var empresa = require('./plugins/empresa');
var metadata = require('./plugins/metadata');


var nameSchema = new Schema({
	  name : { type : String, trim : true, required : true},
	  perfil : {type : String, trim : true}
});


nameSchema.pre('save', function (next) {
  
 // do stuff

  next();
  
});


//add plugins
nameSchema.plugin(empresa);
nameSchema.plugin(timestamps);
nameSchema.plugin(metadata);
nameSchema.plugin(active);


module.exports = mongoose.model('Cargo', nameSchema); 