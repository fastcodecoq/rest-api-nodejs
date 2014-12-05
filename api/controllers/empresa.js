

var ctrlEmpresa = function (server) {

  // Load required packages
  var Empresa = require('../models/empresa');
  var mongoose = require('mongoose');

  function post(req, res) {
// Create a new instance of the Empresa model
    var empresa = new Empresa;

// Set the empresa properties that came from the POST data
    var REQ = req.params;
    


    !REQ.name  || (empresa.name = REQ.name);    
    !REQ.nit  || (empresa.nit = REQ.nit);
    !REQ.tel  || (empresa.tel = REQ.tel);
    !REQ.userid  || (empresa._user_id = mongoose.Types.ObjectId(REQ.userid));
    !REQ.email  || (empresa.name = REQ.email);    
    !REQ.location  || (empresa.location = REQ.location);    

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
     var REQ = req.params;

     query._user_id = req.params.userid ? mongoose.Types.ObjectId(REQ.userid) : false;
     query._id = req.params.empresaid ? new mongoose.Types.ObjectId(REQ.empresaid) : false;

      for(x in query)
          if(!query[x])
          {
            res.send(500,'invalid params');
            return;
          }

   if(!REQ.userid || !REQ.empresaid)
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
    var REQ = req.params;

    !REQ.name  || (data.name = REQ.name);    
    !REQ.nit  || (data.nit = REQ.nit);
    !REQ.tel  || (data.tel = REQ.tel);
    !REQ._user_id  || (data._user_id = mongoose.Types.ObjectId(REQ.user_id));
    !REQ.email  || (data.name = REQ.email);    
    !REQ.location  || (data.location = REQ.location);    


// Use the Empresa model to find a specific empresa
    Empresa.update({
      _user_id: mongoose.Types.ObjectId(REQ.userid),
      _id: mongoose.Types.ObjectId(REQ.empresaid)
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