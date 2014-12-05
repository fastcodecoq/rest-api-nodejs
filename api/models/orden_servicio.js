// Load required packages
var mongoose = require('mongoose');
var timestamps = require('mongoose-timestamp');
var location = require('./plugins/location');
var empresa = require('./plugins/empresa');
var Schema = mongoose.Schema;

// Define our Orden de Servicio schema
var OrdenServicioSchema = new mongoose.Schema({
  order_key: {
    type: String,
    required: true
  },
  _responsible: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'Users'
  },
  description: {
    type: String,
    required: true,
    trim: true
  },
  rate: {
    type: Number,
    required: true
  },
  start_date: {
    type: Date,
    required: true
  },
  end_date: {
    type: Date,
    required: true
  },
  status: {
    type: Number
  },
  contact : {
      type : { type : [Schema.Types.ObjectId] }      
  }
});


OrdenServicioSchema.plugin(empresa);
//add createdAt, updatedAt fields
OrdenServicioSchema.plugin(timestamps);

// Export the Mongoose model
module.exports = mongoose.model('OrdenServicios', OrdenServicioSchema);