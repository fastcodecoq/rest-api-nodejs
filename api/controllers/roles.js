

var ctrlRole = function (server) {

  // Load required packages
  var Role = require('../models/role');
  var mongoose = require('mongoose');

  function post(req, res) {
// Create a new instance of the Role model
    var role = new Role;

// Set the role properties that came from the POST data
    var REQ = req.params;    

    console.log(REQ, 'req')

    !REQ.name  || (role.name = REQ.name);        
    !REQ.userid  || (role._usuario = mongoose.Types.ObjectId(REQ.userid));
    !REQ.empresaid  || (role._empresa = mongoose.Types.ObjectId(REQ.empresaid));    
    !REQ.privileges  || (role.privileges = REQ.privileges);

   
    console.log(role);    

// Save the role and check for errors
    role.save(function (err) {
      if (err) {
        res.send(err);
        return;
      }
      res.json({message: 'Role added', data: role});
    });
  }


  function get(req, res) {

// Use the Role model to find a specific role
     var query = {};
     var REQ = req.params;


      !REQ.userid  || (query._usuario = mongoose.Types.ObjectId(REQ.userid));
      !REQ.empresaid  || (query._empresa = mongoose.Types.ObjectId(REQ.empresaid));  
      
      !REQ.roleid  || (query._id = mongoose.Types.ObjectId(REQ.roleid));      

// Use the Role model to find all role
    Role.find(query)
    .populate('_usuario')
    .exec(function (err, roles) {
      if (err) {
        res.send(err);
        return;
      }

      if(roles.length === 0)
      {
        res.send(200,{message:'Not records found'});        
        return;        
       }

      res.json({data:roles});
    });

  }



  function put(req, res) {

    var data = {};
    var REQ = req.params;

    !REQ.name  || (data.name = REQ.name);          
    !REQ.userid  || (data._usuario = mongoose.Types.ObjectId(REQ.userid));
    !REQ.empresaid  || (data._empresa = mongoose.Types.ObjectId(REQ.empresaid));    
    !REQ.privileges  || (data.privileges = REQ.privileges);    


   if(!REQ.roleid)
          {
            res.send(500,'invalid params');
            return;
          }

    var query = {};

      !REQ.empresaid || (query._empresa = mongoose.Types.ObjectId(REQ.empresaid));
      !REQ.userid || (query._usuario = mongoose.Types.ObjectId(REQ.userid));
      !REQ.roleid || (query._id = mongoose.Types.ObjectId(REQ.roleid));

// Use the Role model to find a specific role
    Role.update({

    }, data, function (err, num, raw) {
      if (err) {
        res.send(err);
      }
      res.json({message: num + ' updated'});
    });
  }

  function del(req, res) {
// Use the Role model to find a specific role and remove it
    Role.remove({_id: mongoose.Types.ObjectId(req.params.roleid)}, function (err) {
      if (err) {
        res.send(err);
      }
      res.json({message: 'Role removed'});
    });
  }

  console.log(global.apiBaseUri);

  server.get(global.apiBaseUri + '/empresa/:empresaid/role/:roleid', get);    
  server.get(global.apiBaseUri + '/role/:roleid', get);    
  server.get(global.apiBaseUri + '/role', get);    
  server.get(global.apiBaseUri + '/empresa/:empresaid/role', get);    
  server.post(global.apiBaseUri + '/empresa/:empresaid/usuario/:userid/role', post);
  server.get(global.apiBaseUri + '/usuario/:userid/empresa/:empresaid/role', get);    
  server.put(global.apiBaseUri + '/empresa/:empresaid/usuario/:userid/role/:roleid', put);
  server.put(global.apiBaseUri + '/role/:roleid', put);
  server.del(global.apiBaseUri + '/role/:roleid', del);

};

module.exports = ctrlRole;