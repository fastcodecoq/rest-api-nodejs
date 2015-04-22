// Load required packages
var mongoose = require('mongoose');
var timestamps = require('mongoose-timestamp');
var privilege = require('./plugins/privileges');
var user = require('./plugins/user');
var empresa = require('./plugins/empresa');
var Schema = mongoose.Schema;

// Define our Empresa schema
var RoleSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  privileges : Object
});


//add empresaid
RoleSchema.plugin(empresa);
//add createdAt, updatedAt fields
RoleSchema.plugin(timestamps);

// Export the Mongoose model
module.exports = mongoose.model('Role', RoleSchema);