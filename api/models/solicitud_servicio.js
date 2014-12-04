// Load required packages
var mongoose = require('mongoose');
var timestamps = require('mongoose-timestamp');
var location = require('./plugins/location');
var Schema = mongoose.Schema;

// Define our Solicitud de Servicio schema
var SolicitudServicioSchema = new mongoose.Schema({
  role: {
    type: String,
    required: true
  },
  _empresa_id: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'Empresas'
  }
  accepted : {type : Boolean, default: false}
});

//add createdAt, updatedAt fields
SolicitudServicioSchema.plugin(timestamps);

// Export the Mongoose model
module.exports = mongoose.model('SolicitudServicios', SolicitudServicioSchema);