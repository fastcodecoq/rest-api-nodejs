// model base

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Load required packages
var timestamps = require('mongoose-timestamp');


var tokenSchema = new Schema({
	    value : {type:String},
        ttl : {type:Number, required:true},        
        _credential : {type: Schema.Types.ObjectId, required : true}
        });


tokenSchema.pre('save', function (next) {
  
    var crypto = require('crypto');

	this.value = require('rand-token').generator({
	  chars: 'A-Z',
	  source: crypto.randomBytes 
	});

    // do stuff
    next();
  
});

tokenSchema.methods.getByCredential = function(credentialid, callback){

	 this.find({_credential : Schema.Types.ObjectId(credentialid)}, callback);

}


tokenSchema.methods.expired = function(credentialid, callback){

	 return this.ttl < Date 

}

//add plugins

tokenSchema.plugin(timestamps);


module.exports = mongoose.model('Token', tokenSchema); 