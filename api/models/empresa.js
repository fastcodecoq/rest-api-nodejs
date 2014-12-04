// Load required packages
var mongoose = require('mongoose');
var timestamps = require('mongoose-timestamp');
var location = require('./plugins/location');
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
  },
  owner: {
    type: String,
    required: true,
    trim: true
  },
  _user_id: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'Users'
  },
  email: {
    type: String,
    required: true,
    trim: true,
    match: [/^\w+([\.\-]?\w+)*@\w+([\.\-]?\w+)*(\.\w{2,3})+$/,
      'Please fill a valid email address']
  }
});

//add createdAt, updatedAt fields
EmpresaSchema.plugin(timestamps);
//add location field
EmpresaSchema.plugin(location);
// Export the Mongoose model
module.exports = mongoose.model('Empresas', EmpresaSchema);