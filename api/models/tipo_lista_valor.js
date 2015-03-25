// model base

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Load required packages
var timestamps = require('mongoose-timestamp');
var metadata = require('./plugins/metadata');


var nameSchema = new Schema({
	  name : { type : String, trim : true},
	  prefijo : { type : String, trim : true},
	  sufijo : { type : String, trim : true}
});


nameSchema.pre('save', function (next) {
  
 // do stuff

  next();
  
});


//add plugins
nameSchema.plugin(timestamps);
OrdenServicioSchema.plugin(metadata);


module.exports = mongoose.model('TipoListaValor', nameSchema); 