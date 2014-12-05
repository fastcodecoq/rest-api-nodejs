
  module.exports = exports = function empresaPlugin(schema, options) {

  options || (options = {});

  schema.add({
  	_user_id: {
    
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'Empresa'
       
       }

   });

};