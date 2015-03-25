// Load required packages
var mongoose = require('mongoose');
var timestamps = require('mongoose-timestamp');
var location = require('./plugins/location');
var empresa = require('./plugins/empresa');;
var Schema = mongoose.Schema;

// Define our Orden de Servicio schema
var OrdenServicioSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  _responsible: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'Usuario'
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
  contact : { type : Schema.Types.ObjectId , ref : 'Usuario'},
  _solicitud : { type : Schema.Types.ObjectId , ref : 'SolicitudServicios'},
  type : Number,
  anticipos: [Object],
  _cargo : {type: Schema.Types.ObjectId, ref: 'Cargo'},
  candidato_interno: Boolean,
  _candidato: [{type: Schema.Types.ObjectId, ref: 'Usuario'}],
  _tipo_evaluacion: {type: Schema.Types.ObjectId, ref: 'TipoEvaluacion'},
  consultora_externa: {type: Boolean, required:true},
  _consultora : {type: Schema.Types.ObjectId, ref: 'Usuario'},
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