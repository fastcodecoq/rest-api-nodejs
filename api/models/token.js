// model base

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Load required packages
var timestamps = require('mongoose-timestamp');


var tokenSchema = new Schema({
	    value : {type:String},
        ttl : {type:Number, required:true, default: 1800},        
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


//add plugins

tokenSchema.plugin(timestamps);


module.exports = mongoose.model('Token', tokenSchema); 