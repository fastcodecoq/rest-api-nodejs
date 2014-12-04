



  module.exports = exports = function namePlugin(schema, options) {

  options || (options = {});

  schema.add({
  	email: {
	    type: String,
	    required: true,
	    trim: true,
	    match: [/^\w+([\.\-]?\w+)*@\w+([\.\-]?\w+)*(\.\w{2,3})+$/, 'Invalid email']
      }
  });

};