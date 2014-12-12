// Load required packages
var mongoose = require('mongoose');
var timestamps = require('mongoose-timestamp');
var location = require('./plugins/location');
var email = require('./plugins/email');
var privilege = require('./plugins/privileges');
var user = require('./plugins/user');
var active = require('./plugins/active');
var avatar = require('./plugins/avatar');
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
  },
  contact : [{ type : Schema.Types.ObjectId , ref : 'Usuario'}],
  competences :[String]
});


//add location field
EmpresaSchema.plugin(location);
//add email field
EmpresaSchema.plugin(email);
//add userid
EmpresaSchema.plugin(user);
//add createdAt, updatedAt fields
EmpresaSchema.plugin(timestamps);
//add active
EmpresaSchema.plugin(active);
EmpresaSchema.plugin(avatar);

// Export the Mongoose model
module.exports = mongoose.model('Empresa', EmpresaSchema);