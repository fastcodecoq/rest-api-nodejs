
  module.exports = exports = function userPlugin(schema, options) {

  options || (options = {});

  schema.add({
  	_user_id: {
    
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'Usuario'
       }
  });

};