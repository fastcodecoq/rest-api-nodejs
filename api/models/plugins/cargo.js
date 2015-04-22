  module.exports = exports = function cargoPlugin(schema, options) {

  ObjectId = require('mongoose').Schema.Types.ObjectId;

  options || (options = {});

  schema.add({
  	_cargo: {
    
    type: ObjectId,
    ref: 'Cargo'
       }
  });

};