
  module.exports = exports = function urlPlugin(schema, required) {

  required || (required = true)

  schema.add({
  	email: {
	    type: String,	    
	    trim: true,
      index: { unique: true },
	    match: [/^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/, 'Invalid url']
      }
  });

};