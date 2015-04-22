// model base

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Load required packages
var timestamps = require('mongoose-timestamp');
var user = require('./plugins/user');


var logSchema = new Schema({
	  where : { type : String, trim : true, required: true}, 
	  what: { type : String, trim : true, required: true},	 
	  ip : { type : Number, required: true}	  
    }, { capped: { size: 1024, max: 5000, autoIndexId: true } });


logSchema.pre('save', function (next) {
  
 // do stuff

  next();
  
});


logSchema.methods.saveAction = function(req){
	
	 var HEAD = req.headers;
	 var Token = require('./token');
	 var token = new token;
	 var self = this;
	 var actions = {
	 	 "GET" : "Obtuvo",
	 	 "POST" : "Almacenó",
	 	 "DELETE" : "Borró",
	 	 "PUT" : "Actualizó"
	 };

	 token.getOwner(HEAD.token, function(err, user){

	 	    if(user.length === 0)
	 	    {
	 	    	res.send(Error('Unauthotized'));
	 	    	return;
	 	    }

	 	    self._user = Schema.Types.ObjectId(user._id);
	 	    self.where = req.url;
	 	    self.what = action[req.method];

	 });


}


//add plugins
logSchema.plugin(user);
logSchema.plugin(timestamps);


module.exports = mongoose.model('Log', logSchema); 