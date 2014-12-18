

var ctrlSolicitud_servicio = function (server) {

  // Load required packages
  var Solicitud_servicio = require('../models/solicitud_servicio');
  var mongoose = require('mongoose');

  function post(req, res) {
// Create a new instance of the Solicitud_servicio model
    var solicitud_servicio = new Solicitud_servicio;

// Set the solicitud_servicio properties that came from the POST data
    var REQ = req.params;    


    
    !REQ.name  || (solicitud_servicio.name = REQ.name);          
    !REQ.type  || (solicitud_servicio.type = REQ.type);
    !REQ.empresaid  || (solicitud_servicio._empresa = mongoose.Types.ObjectId(REQ.empresaid));    
    !REQ.description  || (solicitud_servicio.description = REQ.description);    
    !REQ.accepted  || (solicitud_servicio.accepted = REQ.accepted);    
    !REQ.readed  || (solicitud_servicio.accepted = REQ.readed);            
    !REQ.date  || (solicitud_servicio._date = REQ.date);            
    !REQ.location  || (solicitud_servicio.location = REQ.location);   
    !REQ._perfil  || (solicitud_servicio._perfil = mongoose.Types.ObjectId(REQ._perfil));   


   
    console.log(solicitud_servicio);    

// Save the solicitud_servicio and check for errors
    solicitud_servicio.save(function (err) {
      if (err) {
        res.send(new Error(err));
        return;
      }
      res.json({message: 'Solicitud_servicio added', data: solicitud_servicio});
    });
  }


  function get(req, res) {

// Use the Solicitud_servicio model to find a specific solicitud_servicio
     var query = {};
     var REQ = req.params;




      !REQ.empresaid  || (query._empresa = mongoose.Types.ObjectId(REQ.empresaid));  
      !REQ.solicitud_servicioid  || (query._id = mongoose.Types.ObjectId(REQ.solicitud_servicioid));



// Use the Solicitud_servicio model to find all solicitud_servicio
    Solicitud_servicio.find(query)
    .populate('_empresa')
    .exec(function (err, solicitud_servicios) {
      if (err) {
        res.send(err);
        return;
      }


      if(solicitud_servicios.length === 0)
      {
        res.send(200,{message:'Not records found'});        
        return;        
       }

      res.json({data:solicitud_servicios});
    });


  }



  function put(req, res) {

    var data = {};
    var REQ = req.params;


   if(!REQ.solicitud_servicioid)
          {
            res.send(500,'invalid params');
            return;
          } 

        
    !REQ.name  || (data.name = REQ.name);          
    !REQ.type  || (data.type = REQ.type);
    !REQ.empresaid  || (data._empresa = mongoose.Types.ObjectId(REQ.empresaid));    
    !REQ.description  || (data.description = REQ.description);    
    !REQ.accepted  || (data.accepted = REQ.accepted);    
    !REQ.readed  || (data.accepted = REQ.readed);            
    !REQ.location  || (data.location = REQ.location);            
    !REQ.date  || (data._date = REQ.date);            
    !REQ._perfil  || (data._perfil = mongoose.Types.ObjectId(REQ._perfil));   

    


    var query = {};

    !REQ.solicitud_servicioid  || (query._id = mongoose.Types.ObjectId(REQ.solicitud_servicioid));    
    !REQ.empresaid  || (query._empresa = mongoose.Types.ObjectId(REQ.empresaid));

    

// Use the Solicitud_servicio model to find a specific solicitud_servicio
    Solicitud_servicio.update(query, data, function (err, num, raw) {
      if (err) {
        res.send(err);
        return;
      }
      res.json({message: num + ' updated'});
    });
  }

  function del(req, res) {
// Use the Solicitud_servicio model to find a specific solicitud_servicio and remove it
    Solicitud_servicio.remove({ _id: mongoose.Types.ObjectId(req.params.solicitud_servicioid)}, function (err) {
      if (err) {
        res.send(err);
      }
      res.json({message: 'Solicitud_servicio removed'});
    });
  }

  console.log(global.apiBaseUri);

  server.get(global.apiBaseUri + '/empresa/:empresaid/solicitud_servicio/:solicitud_servicioid', get);    
  server.get(global.apiBaseUri + '/empresa/:empresaid/solicitud_servicio', get);    
  server.get(global.apiBaseUri + '/solicitud_servicio', get);    
  server.post(global.apiBaseUri + '/solicitud_servicio', post);
  server.put(global.apiBaseUri + '/solicitud_servicio/:solicitud_servicioid', put);
  server.del(global.apiBaseUri + '/solicitud_servicio/:solicitud_servicioid', del);
  server.get(global.apiBaseUri + '/solicitud_servicio/:solicitud_servicioid', get);



};

module.exports = ctrlSolicitud_servicio;