  module.exports = exports = function osPlugin(schema, options) {

  ObjectId = require('mongoose').Schema.Types.ObjectId;

  options || (options = {});

  schema.add({
  	_orden_servicio: {
    
    type: ObjectId,
    ref: 'OrdenServicio'
       }
  });

};