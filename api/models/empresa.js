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
    required: true,
    index: { unique: true }
  },
  tel: {
    type: Number    
  }
});


//add location field
EmpresaSchema.plugin(location);
//add email field
EmpresaSchema.plugin(email);
//add userid
EmpresaSchema.plugin(user);
//add createdAt, updatedAt fields
EmpresaSchema.plugin(timestamps);

// Export the Mongoose model
module.exports = mongoose.model('Empresa', EmpresaSchema);