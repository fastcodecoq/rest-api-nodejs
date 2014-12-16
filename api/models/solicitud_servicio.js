// Load required packages
var mongoose = require('mongoose');
var timestamps = require('mongoose-timestamp');
var location = require('./plugins/location');
var empresa = require('./plugins/empresa');
var Schema = mongoose.Schema;

// Define our Solicitud de Servicio schema
var SolicitudServicioSchema = new mongoose.Schema({
  
  type : {type: String, required:true, lowercase: true, trim: true},
  name : {type: String, trim: true},
  accepted : {type : Boolean, default: false},
  readed : {type : Boolean, default: false},
  description : {type: String},
  _perfil :  {type: Schema.Types.ObjectId, ref: 'PerfilLaboral'},
  _date : {type :Date, required: true},
  vigency : Number

});

SolicitudServicioSchema.pre('save', function (next) {
  
 // do stuff

  next();
  
});


SolicitudServicioSchema.plugin(empresa);
SolicitudServicioSchema.plugin(location);
//add createdAt, updatedAt fields
SolicitudServicioSchema.plugin(timestamps);
//var ai = require('mongoose-auto-increment')
//SolicitudServicioSchema.plugin(ai.plugin, 'SolicitudServicio');

// Export the Mongoose model
module.exports = mongoose.model('SolicitudServicios', SolicitudServicioSchema);