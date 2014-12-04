// Load required packages
var mongoose = require('mongoose');
var timestamps = require('mongoose-timestamp');
var location = require('./plugins/location');
var candidate_data = require('./plugins/candidate_data');
var email = require('./plugins/email');
var activate = require('./plugins/active');
var Schema = mongoose.Schema;

// Define our Empresa schema
var UsuarioSchema = new mongoose.Schema({
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
  },
  attached_cv : {
     type : String     
  },
  config : {
      type : Object,
      default : {}
  }
});

//add createdAt, updatedAt fields
UsuarioSchema.plugin(timestamps);
//add location field
UsuarioSchema.plugin(location);
//add candidate data
UsuarioSchema.plugin(candidate_data);
//add email
UsuarioSchema.plugin(email);
//add active
UsuarioSchema.plugin(active);

// Export the Mongoose model
module.exports = mongoose.model('Usuario', UsuarioSchema);