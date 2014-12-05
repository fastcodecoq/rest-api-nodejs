// Load required packages
var mongoose = require('mongoose');
var timestamps = require('mongoose-timestamp');
var location = require('./plugins/location');
var empresa = require('./plugins/empresa');
var Schema = mongoose.Schema;

// Define our Solicitud de Servicio schema
var SolicitudServicioSchema = new mongoose.Schema({
  
  type : {type: String, required:true, lowercase: true, trim: true},
  name : {type: String, required:true, trim: true}
  accepted : {type : Boolean, default: false},
  readed : {type : Boolean, default: false}


});

//add createdAt, updatedAt fields
SolicitudServicioSchema.plugin(timestamps);
SolicitudServicioSchema.plugin(empresa);

// Export the Mongoose model
module.exports = mongoose.model('SolicitudServicios', SolicitudServicioSchema);