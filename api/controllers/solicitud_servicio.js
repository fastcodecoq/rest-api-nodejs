

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
    !REQ.responsible  || (solicitud_servicio._responsible = mongoose.Types.ObjectId(REQ.responsible));
    !REQ.empresaid  || (solicitud_servicio._empresa = mongoose.Types.ObjectId(REQ.empresaid));    
    !REQ.description  || (solicitud_servicio.description = REQ.description);    
    !REQ.rate  || (solicitud_servicio.rate = REQ.rate);    
    !REQ.start_date  || (solicitud_servicio.start_date = REQ.start_date);    
    !REQ.end_date  || (solicitud_servicio.end_date = REQ.end_date);    
    !REQ.status  || (solicitud_servicio.status = REQ.status);    
    !REQ.location  || (solicitud_servicio.location = REQ.location);    
    !REQ.empresaid  || (solicitud_servicio.contact = mongoose.Types.ObjectId(REQ.contact));    
    

    

   
    console.log(solicitud_servicio);    

// Save the solicitud_servicio and check for errors
    solicitud_servicio.save(function (err) {
      if (err) {
        res.send(err);
        return;
      }
      res.json({message: 'Solicitud_servicio added', data: solicitud_servicio});
    });
  }


  function get(req, res) {

// Use the Solicitud_servicio model to find a specific solicitud_servicio
     var query = {};
     var REQ = req.params;


      
   if(!REQ.empresaid)
          {
            res.send(500,'invalid params');
            return;
          }

      !REQ.empresaid  || (query._empresa = mongoose.Types.ObjectId(REQ.empresaid));  
      !REQ.solicitud_servicioid  || (query._id = mongoose.Types.ObjectId(REQ.solicitud_servicioid));



// Use the Solicitud_servicio model to find all solicitud_servicio
    Solicitud_servicio.find(query)
    .populate('_empresa _contacto')
    .exec(function (err, solicitud_servicios) {
      if (err) {
        res.send(err);
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
    !REQ.responsible  || (data._responsible = mongoose.Types.ObjectId(REQ.responsible));
    !REQ.empresaid  || (data._empresa = mongoose.Types.ObjectId(REQ.empresaid));    
    !REQ.description  || (data.description = REQ.description);    
    !REQ.rate  || (data.rate = REQ.rate);    
    !REQ.start_date  || (data.start_date = REQ.start_date);    
    !REQ.end_date  || (data.end_date = REQ.end_date);    
    !REQ.status  || (data.status = REQ.status);    
    !REQ.location  || (data.location = REQ.location);    
    !REQ.contact  || (data.contact = mongoose.Types.ObjectId(REQ.contact));  
    


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
  server.post(global.apiBaseUri + '/empresa/:empresaid/solicitud_servicio', post);
  server.put(global.apiBaseUri + '/solicitud_servicio/:solicitud_servicioid', put);
  server.del(global.apiBaseUri + '/solicitud_servicio/:solicitud_servicioid', del);
  server.del(global.apiBaseUri + '/solicitud_servicio/:solicitud_servicioid', get);



};

module.exports = ctrlSolicitud_servicio;