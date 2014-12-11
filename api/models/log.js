// model base

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Load required packages
var timestamps = require('mongoose-timestamp');
var user = require('./plugins/user');


var logSchema = new Schema({
	  what: { type : String, trim : true, required: true},
	  ip : { type : Number, required: true}	  
});


logSchema.pre('save', function (next) {
  
 // do stuff

  next();
  
});


log.methods.saveAction = function(req){
	
	 var HEAD = req.headers;
	 var Token = require('./token');
	 var token = new token;
	 var self = this;

	 token.findOwner(HEAD.token, function(err, user){

	 	    if(user.length === 0)
	 	    {
	 	    	res.send(Error('Unauthotized'));
	 	    	return;
	 	    }

	 	    this._user = Schema.Types.ObjectId(user._id);

	 	    next();	 	    

	 });


}


//add plugins
logSchema.plugin(user);
logSchema.plugin(timestamps);


module.exports = mongoose.model('Log', logSchema); 