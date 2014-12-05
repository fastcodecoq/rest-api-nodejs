// Load required packages
var mongoose = require('mongoose');
var timestamps = require('mongoose-timestamp');
var location = require('./plugins/location');
var email = require('./plugins/email');
var privilege = require('./plugins/privileges');
var user = require('./plugins/user');
var Schema = mongoose.Schema;

// Define our Empresa schema
var EmpresaSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  nit: {
    type: Number,
    required: true
  },
  tel: {
    type: Number,
    required: true
  }
});

//add createdAt, updatedAt fields
EmpresaSchema.plugin(timestamps);
//add location field
EmpresaSchema.plugin(location);
//add email field
EmpresaSchema.plugin(email);
//add userid
EmpresaSchema.plugin(user);

// Export the Mongoose model
module.exports = mongoose.model('Empresa', EmpresaSchema);