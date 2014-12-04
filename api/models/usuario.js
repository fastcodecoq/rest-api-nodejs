// Load required packages
var mongoose = require('mongoose');
var timestamps = require('mongoose-timestamp');
var location = require('./plugins/location');
var candidate_data = require('./plugins/candidate_data');
var email = require('./plugins/email');
var Schema = mongoose.Schema;

// Define our Empresa schema
var EmpresaSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  last_name: {
    type: String,    
    trim: true
  },
  is_candidate: {
     type: Boolean,
     default: false
  },  
  cv : {
     type : Schema.Types.ObjectId,
     ref : 'Cv'
  }
});

//add createdAt, updatedAt fields
UsuerioSchema.plugin(timestamps);
//add location field
UsuarioSchema.plugin(location);
//add candidate data
UsuarioSchema.plugin(candidate_data);
//add email
UsuarioSchema.plugin(email);

// Export the Mongoose model
module.exports = mongoose.model('Usuario', EmpresaSchema);