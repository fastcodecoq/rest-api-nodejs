// Load required packages
var Empresa = require('../models/empresa');

var ctrlEmpresa = function (server) {

  function post(req, res) {
// Create a new instance of the Empresa model
    var empresa = new Empresa();

// Set the empresa properties that came from the POST data
    empresa.name = req.body.name;
    empresa.nit = req.body.nit;
    empresa.tel = req.body.tel;
    empresa.owner = req.body.owner;
    empresa._user_id = req.user._id;
    empresa.email = req.body.email;

// Save the empresa and check for errors
    empresa.save(function (err) {
      if (err) {
        res.send(err);
      }
      res.json({message: 'Empresa added', data: empresa});
    });
  }


  function get(req, res) {
// Use the Empresa model to find a specific empresa
    if (req.id) {
      Empresa.find({userId: req.user._id, id: req.params.empresa_id},
        function (err, empresa) {
          if (err) {
            res.send(err);
          }
          res.json(empresa);
        });
    }
// Use the Empresa model to find all empresa
    Empresa.find({userId: req.user._id}, function (err, empresas) {
      if (err) {
        res.send(err);
      }
      res.json(empresas);
    });
  }

  function put(req, res) {
// Use the Empresa model to find a specific empresa
    Empresa.update({
      userId: req.user._id,
      _id: req.params.empresa_id
    }, {
      name: req.body.name,
      nit: req.body.nit,
      tel: req.body.tel,
      owner: req.body.owner,
      email: req.body.email
    }, function (err, num, raw) {
      if (err) {
        res.send(err);
      }
      res.json({message: num + ' updated'});
    });
  }

  function del(req, res) {
// Use the Empresa model to find a specific empresa and remove it
    Empresa.remove({userId: req.user._id, _id: req.params.empresa_id}, function (err) {
      if (err) {
        res.send(err);
      }
      res.json({message: 'Empresa removed'});
    });
  }

  server.get('api/empresas', get);
  server.post('api/empresas', post);
  server.put('api/empresas', put);
  server.del('api/empresas', del);
};

module.exports = ctrlEmpresa;