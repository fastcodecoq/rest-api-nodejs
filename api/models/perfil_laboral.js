// model base

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Load required packages
var timestamps = require('mongoose-timestamp');
var location = require('./plugins/location');


var perfil_laboralSchema = new Schema({
	  name : { type : String, trim : true, required: true},
	  area : { type : [{ type : String, trim : true, lowercase:true}], required: true},
	  profesion: { type : String, trim : true, lowercase:true, required: true},
	  experience: { type : String, trim : true, lowercase:true},
	  salary_range: { type : String, trim : true},
	  functions: { type : String, trim : true, lowercase:true, required: true},
	  priorities: { type : String, trim : true, lowercase:true},
	  results_expected: { type : String, trim : true, lowercase:true},
	  english_level: { type : String, trim : true},
	  academic_level: { type : String, trim : true, lowercase:true, required: true},
	  academic_title: { type : String, trim : true, lowercase:true, required: true},
	  genre: { type : String, trim : true, lowercase:true},
	  notes: { type : String, trim : true},
	  industry_sector : { type : String, trim : true, required: true},
	  project_presentation: { type : String, trim : true},
	  personal_caracteristics: { type : String, trim : true},
	  min_experience_years: {type: Number},
	  max_experience_years: {type: Number},	  
	  status: {type: Number},	  
	  contract_type: {type: Number},	  
	  _candidates : [{type: Schema.Types.ObjectId, ref : 'Candidate'}],
	  _orden_servicio : {type : Schema.Types.ObjectId, ref: 'OrdenServicio', required: true}
});


perfil_laboralSchema.pre('save', function (next) {
  
 // do stuff

  next();
  
});


//add location field
perfil_laboralSchema.plugin(location);
//add createdAt, updatedAt fields
perfil_laboralSchema.plugin(timestamps);


module.exports = mongoose.model('PerfilLaboral', perfil_laboralSchema); 