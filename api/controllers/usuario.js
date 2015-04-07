
var ctrldata = function (server) {

  // Load required packages
  var data = require('../models/data');
  var Credential = require('../models/credential');
  var mongoose = require('mongoose');


  function post(req, res) {


// Create a new instance of the data model
    var data = new data;    
    var REQ = req.params;    
    
// Set the data properties that came from the POST data
    !REQ.name  || (data.name = REQ.name);    
    !REQ.last_name || (data.last_name = REQ.last_name);
    !REQ._name  || (data._name = REQ._name);    
    !REQ._last_name || (data._last_name = REQ._last_name);
    !REQ.email || (data.email = REQ.email);  
    !REQ.avatar  || (data.avatar = REQ.avatar);    
    !REQ.tel || (data.tel = REQ.tel);  
    !REQ.location || (data.location = REQ.location);  
    !REQ.is_candidate || (data.is_candidate = REQ.is_candidate);  
    !REQ.candidate_data || (data.candidate_data = REQ.candidate_data);      
    !REQ.active || (data.active = REQ.active);  
    !REQ.cv || (data.cv = REQ.cv);
    !REQ.attached_cv  || (data.attached_cv = REQ.attached_cv);
    !REQ.active  || (data.active = REQ.active);    
    !REQ.metadata  || (data.metadata = REQ.metadata);    
    !REQ.type  || (data.type = REQ.type);    

    

// Save the data and check for errors
    data.save(function (err, data) {
     
      if (err) {
        res.send(err);
        return;
      }

       var credential = new Credential;

       credential._data = mongoose.Types.ObjectId(data._id);
       !REQ.password || (credential.password = REQ.password);

       credential.save(function(err){
          res.json({message: 'data added', data: data});
       });
      

    });
  }


  function get(req, res) {

// Use the data model to find a specific data
     var query = {};
     var REQ = req.params;     

     !REQ.userid || (query._id = mongoose.Types.ObjectId(REQ.userid))    
     !REQ.type || (query.type = REQ.type)    


// Use the data model to find all data
    data.find(query, function (err, data) {
      if (err) {
        res.send(err);
        return;        
      }

      if(data.length === 0)
       {
        res.send(200,{message:'Not records found'});        
        return;        
       }

      res.json({data:data});
    });

  }



  function put(req, res) {
// Use the data model to find a specific data
  
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


    data.update({
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


   // Use the data model to find a specific data and remove it
    data.remove({_id: mongoose.Types.ObjectId(REQ.userid)}, function (err) {
      if (err) {
        res.send(err);
        return;        
      }
      res.json({message: 'data removed'});
    });
  }

  console.log(global.apiBaseUri);

  server.get(global.apiBaseUri + '/data/:userid', get);
  server.get(global.apiBaseUri + '/data', get);
  server.post(global.apiBaseUri + '/data', post);
  server.put(global.apiBaseUri + '/data/:userid', put);
  server.del(global.apiBaseUri + '/data/:userid', del);

};

module.exports = ctrldata;