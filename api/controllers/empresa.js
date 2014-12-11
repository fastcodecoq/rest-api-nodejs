

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
    !REQ.avatar  || (empresa.avatar = REQ.avatar);    
    !REQ.userid  || (empresa._usuario = mongoose.Types.ObjectId(REQ.userid));
    !REQ.email  || (empresa.email = REQ.email);    
    !REQ.location  || (empresa.location = REQ.location);    


    if(REQ.contact)
       for(x in REQ.contact)
          empresa.contact.push(mongoose.Types.ObjectId(REQ.contact))

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

     
      !REQ.userid  || (query._usuario = mongoose.Types.ObjectId(REQ.userid));
      !REQ.empresaid  || (query._id = mongoose.Types.ObjectId(REQ.empresaid));  


          console.log(query);


// Use the Empresa model to find all empresa
    Empresa.find(query)
    .populate('_usuario _contact')
    .exec(function (err, empresas) {
      if (err) {
        res.send(err);
        return;
      }

      if(empresas.length === 0)
      {
        res.send(new Error('Not records found'));
        return;        
       }

      res.json({data:empresas}); 
    });

  }



  function put(req, res) {

    var data = {};
    var REQ = req.params;


    if(!REQ.empresaid)
          {
            res.send(500,'invalid params');
            return;
       }

    !REQ.name  || (data.name = REQ.name);    
    !REQ.nit  || (data.nit = REQ.nit);
    !REQ.tel  || (data.tel = REQ.tel);
    !REQ.avatar  || (data.avatar = REQ.avatar);
    !REQ.userid  || (data._usuario = mongoose.Types.ObjectId(REQ.userid));
    !REQ.email  || (data.email = REQ.email);    
    !REQ.location  || (data.location = REQ.location);  
    

    if(REQ.contact)
       {

        data.contact = new Array();

        for(x in REQ.contact)
                 data.contact.push(mongoose.Types.ObjectId(REQ.contact));

       }


    // making the query for update

    var query = {};

    
    !REQ.userid || (query._usuario = mongoose.Types.ObjectId(REQ.userid));
    !REQ.empresaid || (query._id = mongoose.Types.ObjectId(REQ.empresaid));
  

  
    Empresa.update(query, data, function (err, num, raw) {
      if (err) {
        res.send(err);
        return;
        
      }
      res.json({message: num + ' updated'});
    });
        

// Use the Empresa model to find a specific empresa
   
  }


  function putContact(req, res) {

    var data = {};
    var REQ = req.params;


    if(!REQ.empresaid || !REQ.userid)
          {
            res.send(500,'invalid params');
            return;
          }


        data.contact = new Array();




    // making the query for update

    var query = {};

    
    !REQ.userid || (query._usuario = mongoose.Types.ObjectId(REQ.userid));
    !REQ.empresaid || (query._id = mongoose.Types.ObjectId(REQ.empresaid));
  

  
    Empresa.find(query, function (err, empresa) {
      
      if (err) {
        res.send(500,err);
        return;
        
      }
        
        empresa.contact.push(mongoose.Types,ObjectId(REQ.userid));
        empresa.save(function(err){
           if (err) {
            res.send(500,err);
            return;
            
            } 

            res.json({message: ' Contact added'});
        });

    });
        

// Use the Empresa model to find a specific empresa
   
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

  server.get(global.apiBaseUri + '/empresa/:empresaid', get);
  server.get(global.apiBaseUri + '/empresa', get);
  server.get(global.apiBaseUri + '/usuario/:userid/empresa', get);
  server.get(global.apiBaseUri + '/usuario/:userid/empresa/:empresaid', get);    
  server.post(global.apiBaseUri + '/usuario/:userid/empresa', post);
  server.put(global.apiBaseUri + '/empresa/:empresaid/contact/:userid', putContact);
  server.post(global.apiBaseUri + '/empresa/usuario/:userid', post);
  server.post(global.apiBaseUri + '/empresa', post);
  server.put(global.apiBaseUri + '/empresa/:empresaid', put);
  server.put(global.apiBaseUri + '/usuario/:userid/empresa/:empresaid', put);
  server.del(global.apiBaseUri + '/usuario/:userid/empresa/:empresaid', del);
  server.del(global.apiBaseUri + '/empresa/:empresaid', del);
};

module.exports = ctrlEmpresa;