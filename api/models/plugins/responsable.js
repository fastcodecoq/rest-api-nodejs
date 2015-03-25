  module.exports = exports = function responsablePlugin(schema, options) {

  ObjectId = require('mongoose').Schema.Types.ObjectId;

  options || (options = {});

  schema.add({
  	_responsable: {
    
    type: ObjectId,
    ref: 'Usuario'
       }
  });

};