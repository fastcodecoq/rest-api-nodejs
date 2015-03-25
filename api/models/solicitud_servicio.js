// Load required packages
var mongoose = require('mongoose');
var timestamps = require('mongoose-timestamp');
var location = require('./plugins/location');
var empresa = require('./plugins/empresa');
var perfil = require('./plugins/perfil');
var cargo = require('./plugins/cargo');
var contacto = require('./plugins/contacto');
var responsable = require('./plugins/responsable');
var modelo_compentencia = require('./plugins/modelo_competencia');

var Schema = mongoose.Schema;

// Define our Solicitud de Servicio schema
var SolicitudServicioSchema = new mongoose.Schema({
  
  type : {type: String, required:true, lowercase: true, trim: true},
  name : {type: String, trim: true},
  status : {type: String, required: true, default: 'Recibida'},
  accepted : {type : Boolean, default: false},
  readed : {type : Boolean, default: false},
  description : {type: String},
  vacantes : {type:Number},
  _date : {type :Date, required: true},
  vigency : Number,
  _orden_servicio : [{type: Schema.Types.ObjectId, ref:'OrdenServicio'}]

});

SolicitudServicioSchema.pre('save', function (next) {
  
 // do stuff

  next();
  
});


SolicitudServicioSchema.plugin(empresa);
SolicitudServicioSchema.plugin(location);
//add createdAt, updatedAt fields
SolicitudServicioSchema.plugin(timestamps);
SolicitudServicioSchema.plugin(contacto);
SolicitudServicioSchema.plugin(responsable);
SolicitudServicioSchema.plugin(cargo);
SolicitudServicioSchema.plugin(modelo_compentencia);
//var ai = require('mongoose-auto-increment')
//SolicitudServicioSchema.plugin(ai.plugin, 'SolicitudServicio');
var metadata = require('./plugins/metadata');
OrdenServicioSchema.plugin(metadata);

// Export the Mongoose model
module.exports = mongoose.model('SolicitudServicios', SolicitudServicioSchema);