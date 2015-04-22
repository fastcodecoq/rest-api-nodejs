// Load required packages
var mongoose = require('mongoose');
var timestamps = require('mongoose-timestamp');
var location = require('./plugins/location');
var empresa = require('./plugins/empresa');
var cargo = require('./plugins/cargo');
var contacto = require('./plugins/contacto');
var responsable = require('./plugins/responsable');
var responsable_factura = require('./plugins/responsable_factura');
var modelo_compentencia = require('./plugins/modelo_competencia');

var Schema = mongoose.Schema;

// Define our Solicitud de Servicio schema
var SolicitudServicioSchema = new mongoose.Schema({
  
  type : {type: String, required:true, lowercase: true, trim: true},
  name : {type: String, trim: true},
  numero_orden_pedido : {type: String, trim: true},
  status : {type: String, required: true, default: 'Recibida'},
  accepted : {type : Boolean, default: false},
  readed : {type : Boolean, default: false},
  candidato_interno : {type : Boolean, default: false},
  description : {type: String},
  vacantes : {type:Number},
  vigency : Number,
  tipo_evaluacion : String,
  _orden_servicio : [{type: Schema.Types.ObjectId, ref:'OrdenServicio'}],
  _candidato : {type: Schema.Types.ObjectId, ref:'Usuario'}
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
SolicitudServicioSchema.plugin(responsable_factura);
SolicitudServicioSchema.plugin(cargo);
SolicitudServicioSchema.plugin(modelo_compentencia);
//var ai = require('mongoose-auto-increment')
//SolicitudServicioSchema.plugin(ai.plugin, 'SolicitudServicio');
var metadata = require('./plugins/metadata');
SolicitudServicioSchema.plugin(metadata);

// Export the Mongoose model
module.exports = mongoose.model('SolicitudServicios', SolicitudServicioSchema);