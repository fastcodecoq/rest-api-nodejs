

var ctrlOrden_servicio = function (server) {

  // Load required packages
  var Orden_servicio = require('../models/orden_servicio');
  var mongoose = require('mongoose');

  function post(req, res) {
// Create a new instance of the Orden_servicio model
    var orden_servicio = new Orden_servicio;

// Set the orden_servicio properties that came from the POST data
    var REQ = req.params;    

    console.log(REQ, 'req')

    
    !REQ.name  || (orden_servicio.name = REQ.name);          
    !REQ.responsible  || (orden_servicio._responsible = mongoose.Types.ObjectId(REQ.responsible));
    !REQ.empresaid  || (orden_servicio._empresa = mongoose.Types.ObjectId(REQ.empresaid));    
    !REQ.description  || (orden_servicio.description = REQ.description);    
    !REQ.rate  || (orden_servicio.rate = REQ.rate);    
    !REQ.start_date  || (orden_servicio.start_date = REQ.start_date);    
    !REQ.end_date  || (orden_servicio.end_date = REQ.end_date);    
    !REQ.status  || (orden_servicio.status = REQ.status);    
    !REQ.location  || (orden_servicio.location = REQ.location);    
    !REQ.type || (orden_servicio.type = REQ.type);    
    !REQ.anticipos || (orden_servicio.anticipos = REQ.anticipos);    
    !REQ.metadata  || (orden_servicio.metadata = REQ.metadata);    
    !REQ.solicitud  || (orden_servicio._solicitud = mongoose.Types.ObjectId(REQ.solicitud));    
    !REQ.contact  || (orden_servicio.contact = mongoose.Types.ObjectId(REQ.contact));
  

    

   
    console.log(orden_servicio);    

// Save the orden_servicio and check for errors
    orden_servicio.save(function (err) {
      if (err) {
        res.send(new Error(err));
        return;
      }
      res.json({message: 'Orden_servicio added', data: orden_servicio});
    });
  }


  function get(req, res) {

// Use the Orden_servicio model to find a specific orden_servicio
     var query = {};
     var REQ = req.params;


      

      !REQ.empresaid  || (query._empresa = mongoose.Types.ObjectId(REQ.empresaid));  
      !REQ.orden_servicioid  || (query._id = mongoose.Types.ObjectId(REQ.orden_servicioid));



// Use the Orden_servicio model to find all orden_servicio
    Orden_servicio.find(query)
    .populate('_empresa _contacto _respon')
    .exec(function (err, orden_servicios) {
      if (err) {
        res.send(err);
        return;
      }

     if(orden_servicios.length === 0)
      {
        res.send(200,{message:'Not records found'});        
        return;        
       }

      res.json({data:orden_servicios});
    });


  }



  function put(req, res) {

    var data = {};
    var REQ = req.params;


   if(!REQ.orden_servicioid)
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
    !REQ.type || (data.type = REQ.type);    
    !REQ.metadata  || (data.metadata = REQ.metadata);    
    !REQ.contact  || (data.contact = mongoose.Types.ObjectId(REQ.contact));
    
    


    var query = {};

    !REQ.orden_servicioid  || (query._id = mongoose.Types.ObjectId(REQ.orden_servicioid));    
    !REQ.empresaid  || (query._empresa = mongoose.Types.ObjectId(REQ.empresaid));

    

// Use the Orden_servicio model to find a specific orden_servicio
    Orden_servicio.update(query, data, function (err, num, raw) {
      if (err) {
        res.send(err);
        return;
      }
      res.json({message: num + ' updated'});
    });
  }

  function del(req, res) {
// Use the Orden_servicio model to find a specific orden_servicio and remove it
    Orden_servicio.remove({ _id: mongoose.Types.ObjectId(req.params.orden_servicioid)}, function (err) {
      if (err) {
        res.send(err);
      }
      res.json({message: 'Orden_servicio removed'});
    });
  }

  console.log(global.apiBaseUri);

  server.get(global.apiBaseUri + '/empresa/:empresaid/orden_servicio/:orden_servicioid', get);    
  server.get(global.apiBaseUri + '/empresa/:empresaid/orden_servicio', get);    
  server.get(global.apiBaseUri + '/orden_servicio/:orden_servicioid', get);    
  server.get(global.apiBaseUri + '/orden_servicio', get);    
  server.post(global.apiBaseUri + '/empresa/:empresaid/orden_servicio', post);
  server.post(global.apiBaseUri + '/orden_servicio', post);
  server.put(global.apiBaseUri + '/orden_servicio/:orden_servicioid', put);
  server.del(global.apiBaseUri + '/orden_servicio/:orden_servicioid', del);
  server.get(global.apiBaseUri + '/orden_servicio/:orden_servicioid', get);



};

module.exports = ctrlOrden_servicio;