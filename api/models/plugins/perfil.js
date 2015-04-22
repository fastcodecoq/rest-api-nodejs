  module.exports = exports = function perfilPlugin(schema, options) {

  ObjectId = require('mongoose').Schema.Types.ObjectId;

  options || (options = {});

  schema.add({
  	_perfil: {
    
    type: ObjectId,
    ref: 'PerfilLaboral'
       }
  });

};