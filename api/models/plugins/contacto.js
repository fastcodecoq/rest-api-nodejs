  module.exports = exports = function contactoPlugin(schema, options) {

  ObjectId = require('mongoose').Schema.Types.ObjectId;

  options || (options = {});

  schema.add({
  	_contacto: {
    
    type: ObjectId,
    ref: 'Usuario'
       }
  });

};