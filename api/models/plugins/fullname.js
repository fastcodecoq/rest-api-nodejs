

module.exports = exports = function fullnamePlugin(schema, options) {

  options || (options = {});

  schema.add({
		  name: {
		    type: String,
		    required: true,
		    trim: true
		  },
		  last_name: {
		    type: String,    
		    trim: true
		  },
		  _name: {
		    type: String,    
		    trim: true
		  },
		  _last_name: {
		    type: String,    
		    trim: true
		  }

  });

};