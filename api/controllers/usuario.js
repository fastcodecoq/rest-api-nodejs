// Load required packages
var Usuario = require('../models/usuario');
var mongoose = require('mongoose');

var ctrlUsuario = function (server) {

  function post(req, res) {

    console.log('usuario ctrl post');

// Create a new instance of the Usuario model
    var Usuario = new Usuario();

// Set the usuario properties that came from the POST data
    req.body.name  || (Usuario.name = req.body.name);    
    req.body.last_name || (Usuario.last_name = req.body.last_name);
    req.body.email || (Usuario.email = req.body.email);  
    req.body.location || (Usuario.location = req.body.location);  
    req.body.is_candidate || (Usuario.is_candidate = req.body.is_candidate);  
    req.body.candidate_data || (Usuario.candidate_data = req.body.candidate_data);      
    req.body.active || (Usuario.active = req.body.active);  
    req.body.cv || (Usuario.cv = req.body.cv);
    req.body.attached_cv  || (Usuario.attached_cv = req.body.attached_cv);

// Save the usuario and check for errors
    Usuario.save(function (err) {
      if (err) {
        res.send(err);
      }
      res.json({message: 'Usuario added', data: usuario});
    });
  }


  function get(req, res) {

// Use the Usuario model to find a specific usuario
     var query = {};

     !req.params.userid || (query._id = mongoose.Types.ObjectId(req.params.userid))    


// Use the Usuario model to find all usuario
    Usuario.find(query, function (err, usuarios) {
      if (err) {
        res.send(err);
      }
      res.json(usuarios);
    });

  }



  function put(req, res) {
// Use the Usuario model to find a specific usuario
  
    var data = {};

    req.body.name  || (data.name = req.body.name);    
    req.body.last_name || (data.last_name = req.body.last_name);
    req.body.email || (data.email = req.body.email);  
    req.body.location || (data.location = req.body.location);  
    req.body.is_candidate || (data.is_candidate = req.body.is_candidate);  
    req.body.candidate_data || (data.candidate_data = req.body.candidate_data);      
    req.body.active || (data.active = req.body.active);  
    req.body.cv || (data.cv = req.body.cv);
    req.body.attached_cv  || (data.attached_cv = req.body.attached_cv);

    Usuario.update({
      _id: mongoose.Types.ObjectId(req.params.userid)
      }, data, function (err, num, raw) {
      if (err) {
        res.send(err);
      }
      res.json({message: num + ' updated'});
    });
  }

  function del(req, res) {
   // Use the Usuario model to find a specific usuario and remove it
    Usuario.remove({_id: mongoose.Types.ObjectId(req.params.userid)}, function (err) {
      if (err) {
        res.send(err);
      }
      res.json({message: 'Usuario removed'});
    });
  }

  console.log(global.apiBaseUri);

  server.get(global.apiBaseUri + '/usuario/:userid', get);
  server.post(global.apiBaseUri + '/usuario', post);
  server.put(global.apiBaseUri + '/usuario/:userid', put);
  server.del(global.apiBaseUri + '/usuario/:userid', del);
};

module.exports = ctrlUsuario;