  module.exports = exports = function responsableFactPlugin(schema, options) {

  ObjectId = require('mongoose').Schema.Types.ObjectId;

  options || (options = {});

  schema.add({
  	_responsable_factura: {
    
    type: ObjectId,
    ref: 'Contact'
       }
  });

};