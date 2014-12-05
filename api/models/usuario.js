// Load required packages
var mongoose = require('mongoose');
var timestamps = require('mongoose-timestamp');
var location = require('./plugins/location');
var candidate_data = require('./plugins/candidate_data');
var email = require('./plugins/email');
var active = require('./plugins/active');
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

    console.log('usuario ctrl post');

//add createdAt, updatedAt fields
UsuarioSchema.plugin(timestamps);

    console.log('usuario ctrl post a');

//add location field
UsuarioSchema.plugin(location);

    console.log('usuario ctrl post b');

//add candidate data
UsuarioSchema.plugin(candidate_data);

    console.log('usuario ctrl post c');

//add email
UsuarioSchema.plugin(email);

    console.log('usuario ctrl post d');

//add active
UsuarioSchema.plugin(active);

    console.log('usuario ctrl post e');

// Export the Mongoose model
module.exports = mongoose.model('Usuario', UsuarioSchema);