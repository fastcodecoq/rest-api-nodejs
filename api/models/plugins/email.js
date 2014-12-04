
  module.exports = exports = function namePlugin(schema, required) {

  required || (required = true)

  schema.add({
  	email: {
	    type: String,
	    required: required,
	    trim: true,
	    match: [/^\w+([\.\-]?\w+)*@\w+([\.\-]?\w+)*(\.\w{2,3})+$/, 'Invalid email']
      }
  });

};