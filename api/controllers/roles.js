

var ctrlRole = function (server) {

  // Load required packages
  var Role = require('../models/role');
  var mongoose = require('mongoose');

  function post(req, res) {
// Create a new instance of the Role model
    var role = new Role;

// Set the role properties that came from the POST data
    var REQ = req.params;
    

    !REQ.name  || (data.name = REQ.name);        
    !REQ.userid  || (data._user_id = mongoose.Types.ObjectId(REQ.empresaid));
    !REQ.empresaid  || (data._empresa_id = mongoose.Types.ObjectId(REQ.empresaid));    
    !REQ.privileges  || (data.privileges = REQ.privileges);

   
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


      !REQ.userid  || (query._user_id = mongoose.Types.ObjectId(REQ.empresaid));
      !REQ.empresaid  || (query._empresa_id = mongoose.Types.ObjectId(REQ.empresaid));  
      
   if(!REQ.empresaid)
          {
            res.send(500,'invalid params');
            return;
          }

      !REQ.roleid  || (query._id = mongoose.Types.ObjectId(REQ.roleid));      

// Use the Role model to find all role
    Role.find(query, function (err, roles) {
      if (err) {
        res.send(err);
        return;
      }
      res.json({data:roles});
    });

  }



  function put(req, res) {

    var data = {};
    var REQ = req.params;

    !REQ.name  || (data.name = REQ.name);          
    !REQ.userid  || (data._user_id = mongoose.Types.ObjectId(REQ.empresaid));
    !REQ.empresaid  || (data._empresa_id = mongoose.Types.ObjectId(REQ.empresaid));    
    !REQ.privileges  || (data.privileges = REQ.privileges);    


   if(!REQ.empresaid || !REQ.userid)
          {
            res.send(500,'invalid params');
            return;
          }

// Use the Role model to find a specific role
    Role.update({
      _empresa_id : mongoose.Types.ObjectId(REQ.empresaid),
      _user_id: mongoose.Types.ObjectId(REQ.userid),
      _id: mongoose.Types.ObjectId(REQ.roleid)
    }, data, function (err, num, raw) {
      if (err) {
        res.send(err);
      }
      res.json({message: num + ' updated'});
    });
  }

  function del(req, res) {
// Use the Role model to find a specific role and remove it
    Role.remove({userId: mongoose.Types.ObjectId(req.params.userid), _id: mongoose.Types.ObjectId(req.params.roleid)}, function (err) {
      if (err) {
        res.send(err);
      }
      res.json({message: 'Role removed'});
    });
  }

  console.log(global.apiBaseUri);

  server.get(global.apiBaseUri + '/empresa/:empresaid/role/:roleid', get);    
  server.get(global.apiBaseUri + '/empresa/:empresaid/role', get);    
  server.post(global.apiBaseUri + '/empresa/:empresaid/usuario/:userid', post);
  server.get(global.apiBaseUri + '/usuario/:userid/empresa/:empresaid/role', get);    
  server.put(global.apiBaseUri + '/empresa/:empresaid/usuario/:userid/role/:roleid', put);
  server.del(global.apiBaseUri + '/usuario/:userid/role/:roleid/role', del);

};

module.exports = ctrlRole;