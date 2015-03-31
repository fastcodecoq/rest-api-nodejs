
  module.exports = exports = function documentoPlugin(schema, options) {

  ObjectId = require('mongoose').Schema.Types.ObjectId;

  options || (options = {});

  schema.add({
      tipo_documento : String,
      numero_documento : {type:Number,trim:true,unique:true}  
  });

}