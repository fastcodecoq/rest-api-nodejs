

var ctrlPerfil_laboral = function (server) {

  // Load required packages
  var Perfil_laboral = require('../models/perfil_laboral');
  var mongoose = require('mongoose');

  function post(req, res) {
// Create a new instance of the Perfil_laboral model
    var perfil_laboral = new Perfil_laboral;

// Set the perfil_laboral properties that came from the POST data
    var REQ = req.params;    

    console.log(REQ, 'req')

    
    !REQ.name  || (perfil_laboral.name = REQ.name);          
    !REQ.area  || (perfil_laboral.area = REQ.area);              
    !REQ.orden_servicio  || (perfil_laboral._orden_servicio = mongoose.Types.ObjectId(REQ.orden_servicio));        
    !REQ.profesion  || (perfil_laboral.profesion = REQ.profesion);    
    !REQ.experience  || (perfil_laboral.experience = REQ.experience);    
    !REQ.salary_range  || (perfil_laboral.salary_range = REQ.salary_range);    
    !REQ.functions  || (perfil_laboral.functions = REQ.functions);    
    !REQ.priorities  || (perfil_laboral.priorities = REQ.priorities);    
    !REQ.results_expected  || (perfil_laboral.results_expected = REQ.results_expected);    
    !REQ.english_level  || (perfil_laboral.english_level = REQ.english_level);    
    !REQ.academic_level  || (perfil_laboral.academic_level = REQ.academic_level);    
    !REQ.academic_title  || (perfil_laboral.academic_title = REQ.academic_title);    
    !REQ.genre  || (perfil_laboral.genre = REQ.genre);    
    !REQ.notes  || (perfil_laboral.notes = REQ.notes);    
    !REQ.project_presentation  || (perfil_laboral.project_presentation = REQ.project_presentation);    
    !REQ.min_experience_years  || (perfil_laboral.min_experience_years = REQ.min_experience_years);    
    !REQ.max_experience_years  || (perfil_laboral.max_experience_years = REQ.max_experience_years);    
    !REQ.status  || (perfil_laboral.status = REQ.status);    
    !REQ.contract_type  || (perfil_laboral.contract_type = REQ.contract_type);    

    if(REQ.candidate)
       for(x in REQ.candidate)
          perfil_laboral._candidates.push(mongoose.Types.ObjectId(REQ.candidate))
    

    

   
    console.log(perfil_laboral);    

// Save the perfil_laboral and check for errors
    perfil_laboral.save(function (err) {
      if (err) {
        res.send(err);
        return;
      }
      res.json({message: 'Perfil_laboral added', data: perfil_laboral});
    });
  }


  function get(req, res) {

// Use the Perfil_laboral model to find a specific perfil_laboral
     var query = {};
     var REQ = req.params;


      
   if(!REQ.perfil_laboralid)
          {
            res.send(500,'invalid params');
            return;
          }
      
      !REQ.perfil_laboralid  || (query._id = mongoose.Types.ObjectId(REQ.perfil_laboralid));
      !REQ.orden_servicioid || (query._orden_servicio = mongoose.Types.ObjectId(REQ.orden_servicioid));



// Use the Perfil_laboral model to find all perfil_laboral
    Perfil_laboral.find(query)
    .populate('_candidates _orden_servicio')
    .exec(function (err, perfil_laborals) {
      if (err) {
        res.send(err);
        return;
      }


      if(perfil_laborals.length === 0)
      {
        res.send(new Error('Not records found'));        
        return;        
       }

      res.json({data:perfil_laborals});
    });


  }


 
  function put(req, res) {

    var data = {};
    var REQ = req.params;


   if(!REQ.perfil_laboralid)
          {
            res.send(500,'invalid params');
            return;
          } 

        
        
    !REQ.name  || (data.name = REQ.name);          
    !REQ.area  || (data.area = REQ.area);              
    !REQ.orden_servicio  || (data._orden_servicio = mongoose.Types.ObjectId(REQ.orden_servicio));        
    !REQ.profesion  || (data.profesion = REQ.profesion);    
    !REQ.experience  || (data.experience = REQ.experience);    
    !REQ.salary_range  || (data.salary_range = REQ.salary_range);    
    !REQ.functions  || (data.functions = REQ.functions);    
    !REQ.priorities  || (data.priorities = REQ.priorities);    
    !REQ.results_expected  || (data.results_expected = REQ.results_expected);    
    !REQ.english_level  || (data.english_level = REQ.english_level);    
    !REQ.academic_level  || (data.academic_level = REQ.academic_level);    
    !REQ.academic_title  || (data.academic_title = REQ.academic_title);    
    !REQ.genre  || (data.genre = REQ.genre);    
    !REQ.notes  || (data.notes = REQ.notes);    
    !REQ.project_presentation  || (data.project_presentation = REQ.project_presentation);    
    !REQ.min_experience_years  || (data.min_experience_years = REQ.min_experience_years);    
    !REQ.max_experience_years  || (data.max_experience_years = REQ.max_experience_years);    
    !REQ.status  || (data.status = REQ.status);    
    !REQ.contract_type  || (data.contract_type = REQ.contract_type);    

    if(REQ.candidate)
       {
          data._candidates = [];
          for(x in REQ.candidate)
                 data._candidates.push(mongoose.Types.ObjectId(REQ.candidate))
       }
    


    var query = {};

    !REQ.perfil_laboralid  || (query._id = mongoose.Types.ObjectId(REQ.perfil_laboralid));    
    !REQ.empresaid  || (query._empresa = mongoose.Types.ObjectId(REQ.empresaid));

    

// Use the Perfil_laboral model to find a specific perfil_laboral
    Perfil_laboral.update(query, data, function (err, num, raw) {
      if (err) {
        res.send(err);
        return;
      }
      res.json({message: num + ' updated'});
    });
  }

  function del(req, res) {
// Use the Perfil_laboral model to find a specific perfil_laboral and remove it
    Perfil_laboral.remove({ _id: mongoose.Types.ObjectId(req.params.perfil_laboralid)}, function (err) {
      if (err) {
        res.send(err);
      }
      res.json({message: 'Perfil_laboral removed'});
    });
  }

  console.log(global.apiBaseUri);

  
  server.get(global.apiBaseUri + '/orden_servicio/:orden_servicioid/perfil_laboral', get);
  server.post(global.apiBaseUri + '/orden_servicio/:orden_servicioid/perfil_laboral', post);
  server.post(global.apiBaseUri + '/perfil_laboral/', post);
  server.put(global.apiBaseUri + '/perfil_laboral/:perfil_laboralid', put);
  server.del(global.apiBaseUri + '/perfil_laboral/:perfil_laboralid', del);
  server.get(global.apiBaseUri + '/perfil_laboral/:perfil_laboralid', get);



};

module.exports = ctrlPerfil_laboral;