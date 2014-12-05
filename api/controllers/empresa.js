

var ctrlEmpresa = function (server) {

  // Load required packages
  var Empresa = require('../models/empresa');
  var mongoose = require('mongoose');

  function post(req, res) {
// Create a new instance of the Empresa model
    var empresa = new Empresa;

// Set the empresa properties that came from the POST data

    !req.body.name  || (empresa.name = req.body.name);    
    !req.body.nit  || (empresa.nit = req.body.nit);
    !req.body.tel  || (empresa.tel = req.body.tel);
    !req.body._user_id  || (empresa._user_id = mongoose.Types.ObjectId(req.body.userid));
    !req.body.email  || (empresa.name = req.body.email);    
    !req.body.location  || (empresa.location = req.body.location);    

  console.log(empresa);    

// Save the empresa and check for errors
    empresa.save(function (err) {
      if (err) {
        res.send(err);
        return;
      }
      res.json({message: 'Empresa added', data: empresa});
    });
  }


  function get(req, res) {

// Use the Empresa model to find a specific empresa
     var query = {};
     query._user_id = req.params.userid ? mongoose.Types.ObjectId(req.params.userid) : false;
     query._id = req.params.empresaid ? new mongoose.Types.ObjectId(req.params.empresaid) : false;

      for(x in query)
          if(!query[x])
          {
            res.send(500,'invalid params');
            return;
          }

   if(!req.params.userid || !req.params.empresaid)
          {
            res.send(500,'invalid params');
            return;
          }


// Use the Empresa model to find all empresa
    Empresa.find(query, function (err, empresas) {
      if (err) {
        res.send(err);
        return;
      }
      res.json({data:empresas});
    });

  }



  function put(req, res) {

    var data = {};

    !req.body.name  || (data.name = req.body.name);    
    !req.body.nit  || (data.nit = req.body.nit);
    !req.body.tel  || (data.tel = req.body.tel);
    !req.body._user_id  || (data._user_id = mongoose.Types.ObjectId(req.body.user_id));
    !req.body.email  || (data.name = req.body.email);    
    !req.body.location  || (data.location = req.body.location);    


// Use the Empresa model to find a specific empresa
    Empresa.update({
      _user_id: mongoose.Types.ObjectId(req.params.userid),
      _id: mongoose.Types.ObjectId(req.params.empresaid)
    }, data, function (err, num, raw) {
      if (err) {
        res.send(err);
      }
      res.json({message: num + ' updated'});
    });
  }

  function del(req, res) {
// Use the Empresa model to find a specific empresa and remove it
    Empresa.remove({userId: mongoose.Types.ObjectId(req.params.userid), _id: mongoose.Types.ObjectId(req.params.empresaid)}, function (err) {
      if (err) {
        res.send(err);
      }
      res.json({message: 'Empresa removed'});
    });
  }

  console.log(global.apiBaseUri);

  server.get(global.apiBaseUri + '/usuario/:userid/empresa', get);
  server.post(global.apiBaseUri + '/usuario/:userid/empresa', post);
  server.get(global.apiBaseUri + '/usuario/:userid/empresa/:empresaid', get);  
  server.put(global.apiBaseUri + '/usuario/:userid/empresa/:empresaid', put);
  server.del(global.apiBaseUri + '/usuario/:userid/empresa/:empresaid', del);
};

module.exports = ctrlEmpresa;