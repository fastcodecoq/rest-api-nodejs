
var ctrlUsuario = function (server) {

  // Load required packages
  var Usuario = require('../models/usuario');
  var Credential = require('../models/credential');
  var mongoose = require('mongoose');


  function post(req, res) {


// Create a new instance of the Usuario model
    var usuario = new Usuario;    
    var REQ = req.params;    
    
// Set the usuario properties that came from the POST data
    !REQ.name  || (usuario.name = REQ.name);    
    !REQ.last_name || (usuario.last_name = REQ.last_name);
    !REQ._name  || (usuario._name = REQ._name);    
    !REQ._last_name || (usuario._last_name = REQ._last_name);
    !REQ.email || (usuario.email = REQ.email);  
    !REQ.avatar  || (usuario.avatar = REQ.avatar);    
    !REQ.tel || (usuario.tel = REQ.tel);  
    !REQ.location || (usuario.location = REQ.location);  
    !REQ.is_candidate || (usuario.is_candidate = REQ.is_candidate);  
    !REQ.candidate_data || (usuario.candidate_data = REQ.candidate_data);      
    !REQ.active || (usuario.active = REQ.active);  
    !REQ.cv || (usuario.cv = REQ.cv);
    !REQ.attached_cv  || (usuario.attached_cv = REQ.attached_cv);
    !REQ.active  || (usuario.active = REQ.active);    
    !REQ.tipo_documento  || (usuario.tipo_documento = REQ.tipo_documento);    
    !REQ.numero_documento  || (usuario.numero_documento = REQ.numero_documento);    
    !REQ.metadata  || (usuario.metadata = REQ.metadata);  

    !REQ.type  || (usuario.type = REQ.type);    

    

// Save the usuario and check for errors
    usuario.save(function (err, usuario) {
     
      if (err) {
        res.send(err);
        return;
      }

       var credential = new Credential;

       credential._usuario = mongoose.Types.ObjectId(usuario._id);
       !REQ.password || (credential.password = REQ.password);

       credential.save(function(err){
          res.json({message: 'Usuario added', data: usuario});
       });
      

    });
  }


  function get(req, res) {

// Use the Usuario model to find a specific usuario
     var query = {};
     var REQ = req.params;

     console.log(REQ);    

     try{
     !REQ.userid || (query._id = mongoose.Types.ObjectId(REQ.userid))    
      }
     catch(e){
         console.log(e)
     }
     finally{
      !REQ.type || (query.type = REQ.type)          
     }


// Use the Usuario model to find all usuario
    Usuario
      .find(query)
      .limit(300)
      .exec(function (err, usuario) {
      if (err) {
        res.send(err);
        return;        
      }

      if(usuario.length === 0)
       {
        res.send(200,{message:'Not records found'});        
        return;        
       }

      res.json({data:usuario});
    });

  }



  function put(req, res) {
// Use the Usuario model to find a specific usuario
  
    var data = {};
    var REQ = req.params;

    !REQ.name  || (data.name = REQ.name);    
    !REQ.last_name || (data.last_name = REQ.last_name);
    !REQ.email || (data.email = REQ.email);  
    !REQ.tel || (data.tel = REQ.tel);  
    !REQ.avatar  || (data.avatar = REQ.avatar);    
    !REQ.location || (data.location = REQ.location);  
    !REQ.is_candidate || (data.is_candidate = REQ.is_candidate);  
    !REQ.candidate_data || (data.candidate_data = REQ.candidate_data);      
    !REQ.active || (data.active = REQ.active);  
    !REQ.cv || (data.cv = REQ.cv);
    !REQ.attached_cv  || (data.attached_cv = REQ.attached_cv);  
    !REQ.metadata  || (data.metadata = REQ.metadata);   
    !REQ.type  || (data.type = REQ.type);    
    !REQ._name  || (data._name = REQ._name);    
    !REQ._last_name || (data._last_name = REQ._last_name);


    Usuario.update({
      _id: mongoose.Types.ObjectId(REQ.userid)
      }, data, function (err, num, raw) {
      if (err) {
        res.send(err);
        return;

      }
      res.json({message: num + ' updated'});
    });
  }

  function del(req, res) {

    var REQ = req.params;


   // Use the Usuario model to find a specific usuario and remove it
    Usuario.remove({_id: mongoose.Types.ObjectId(REQ.userid)}, function (err) {
      if (err) {
        res.send(err);
        return;        
      }
      res.json({message: 'Usuario removed'});
    });
  }

  console.log(global.apiBaseUri);

  server.get(global.apiBaseUri + '/usuario/:userid', get);
  server.get(global.apiBaseUri + '/usuario/type/:type', get);
  server.get(global.apiBaseUri + '/usuario', get);
  server.post(global.apiBaseUri + '/usuario', post);
  server.put(global.apiBaseUri + '/usuario/:userid', put);
  server.del(global.apiBaseUri + '/usuario/:userid', del);

};

module.exports = ctrlUsuario;