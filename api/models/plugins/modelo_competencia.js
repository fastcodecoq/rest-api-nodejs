  module.exports = exports = function modeloCompetenciaPlugin(schema, options) {

  ObjectId = require('mongoose').Schema.Types.ObjectId;

  options || (options = {});

  schema.add({
  	_modelo_competencia: {
    
    type: ObjectId,
    ref: 'ModeloCompetencia'
       }
  });

};