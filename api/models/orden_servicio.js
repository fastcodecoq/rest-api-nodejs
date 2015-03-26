// Load required packages
var mongoose = require('mongoose');
var timestamps = require('mongoose-timestamp');
var location = require('./plugins/location');
var empresa = require('./plugins/empresa');;
var Schema = mongoose.Schema;

// Define our Orden de Servicio schema
var OrdenServicioSchema = new mongoose.Schema({
  name: {
    type: String
  },
  _responsable: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'Contacto'
  },
  description: {
    type: String,    
    trim: true
  },
  rate: {
    type: Number    
  },
  start_date: {
    type: Date
  },
  end_date: {
    type: Date
  },
  status: {
    type: String,
    required: true
  },
  _contact : { type : Schema.Types.ObjectId , ref : 'Contacto'},
  _solicitud_servicio : { type : Schema.Types.ObjectId , ref : 'SolicitudServicios'},
  type : String,
  anticipos: [Object],
  _cargo : {type: Schema.Types.ObjectId, ref: 'Cargo'},
  candidato_interno: Boolean,
  _candidato: [{type: Schema.Types.ObjectId, ref: 'Usuario'}],
  _tipo_evaluacion: {type: Schema.Types.ObjectId, ref: 'TipoEvaluacion'},
  consultora_externa: {type: Boolean, default:false},
  _consultora : {type: Schema.Types.ObjectId, ref: 'Usuario'},
  _consultora_externa : {type: Schema.Types.ObjectId, ref: 'Usuario'},
  _coordinadora: {type: Schema.Types.ObjectId, ref: 'Usuario'},
  _modelo_compentencia : {type: Schema.Types.ObjectId, ref: 'ModeloCompetencia'},
  _orden_servicio : [{type: Schema.Types.ObjectId, ref: 'OrdenServicio'}]
});


OrdenServicioSchema.plugin(empresa);
OrdenServicioSchema.plugin(location);
//add createdAt, updatedAt fields
OrdenServicioSchema.plugin(timestamps);
var metadata = require('./plugins/metadata');
OrdenServicioSchema.plugin(metadata);

// Export the Mongoose model
module.exports = mongoose.model('OrdenServicio', OrdenServicioSchema);