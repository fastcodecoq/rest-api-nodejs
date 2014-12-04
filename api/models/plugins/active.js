module.exports = exports = function activePlugin(schema, required) {

    required || (required = false)

  schema.add({  			
		active : {
		      type : Boolean,
		      default : true,
		      required : required
		  }
  });

};
