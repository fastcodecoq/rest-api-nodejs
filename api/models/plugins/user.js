
  module.exports = exports = function userPlugin(schema, options) {

  ObjectId = require('mongoose').Schema.Types.ObjectId;

  options || (options = {});

  schema.add({
  	_user_id: {
    
    type: ObjectId,
    required: true,
    ref: 'Usuario'
       }
  });

};