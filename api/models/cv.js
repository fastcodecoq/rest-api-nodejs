// model base

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Load required packages
var timestamps = require('mongoose-timestamp');
var url = require('./plugin/url.js');



var CvSchema = new Schema({
	  Cv : { type : String, trim : true},
	  _candidate : {type : Schema.Types.ObjectId, required: true, ref: 'Candidate'},
	  _cv_format : {type : Schema.Types.ObjectId, required: true, ref: 'CvFormat'}
});


CvSchema.pre('save', function (next) {
  
 // do stuff

  next();
  
});


 
//add createdAt, updatedAt fields
CvSchema.plugin(timestamps);
CvSchema.plugin(url);


module.exports = mongoose.model('Cv', CvSchema); 