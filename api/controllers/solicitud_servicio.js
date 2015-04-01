

var ctrlSolicitud_servicio = function (server) {

  // Load required packages
  var Solicitud_servicio = require('../models/solicitud_servicio');
  var User = require('../models/usuario');
  var mongoose = require('mongoose');

  function post(req, res) {
// Create a new instance of the Solicitud_servicio model
    var solicitud_servicio = new Solicitud_servicio;

// Set the solicitud_servicio properties that came from the POST data
    var REQ = req.params;    

    console.log(REQ);

    
    !REQ.name  || (solicitud_servicio.name = REQ.name);          
    !REQ.type  || (solicitud_servicio.type = REQ.type);
    !REQ.empresa  || (solicitud_servicio._empresa = mongoose.Types.ObjectId(REQ.empresa));    
    !REQ.metadata  || (solicitud_servicio.metadata = REQ.metadata);       
    !REQ.readed  || (solicitud_servicio.accepted = REQ.readed);            
    !REQ.date  || (solicitud_servicio._date = REQ.date);             
    !REQ.vacantes  || (solicitud_servicio.vacantes = REQ.vacantes); 
    !REQ.status  || (solicitud_servicio.status = REQ.status);                
    !REQ.cargo  || (solicitud_servicio._cargo = mongoose.Types.ObjectId(REQ.cargo));   
    !REQ.modelo_competencia  || (solicitud_servicio._modelo_competencia = mongoose.Types.ObjectId(REQ.modelo_competencia));       
    !REQ.contacto  || (solicitud_servicio._contacto = mongoose.Types.ObjectId(REQ.contacto));   
    !REQ.responsable  || (solicitud_servicio._responsable = mongoose.Types.ObjectId(REQ.responsable));   
    !REQ.responsable_factura  || (solicitud_servicio._responsable_factura = mongoose.Types.ObjectId(REQ.responsable_factura));   
    !REQ.candidato_interno  || (solicitud_servicio._candidato_interno = REQ.candidato_interno);   
    !REQ.numero_orden_pedido  || (solicitud_servicio.numero_orden_pedido = REQ.numero_orden_pedido);   
    !REQ.tipo_evaluacion  || (solicitud_servicio.tipo_evaluacion = REQ.tipo_evaluacion);   
    !REQ.candidato  || (solicitud_servicio._candidato = mongoose.Types.ObjectId(REQ.candidato));   



   
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
    .lean()
    .populate('_empresa')
    .populate('_contacto')
    .populate('_candidato')
    .populate('_responsable')
    .populate('_responsable_factura')
    //.populate('_cargo')
    //.populate('_modelo_competencia')
    .exec(function (err, solicitud_servicios) {
      if (err) {
        res.send(err);
        return;
      }

      console.log(solicitud_servicios,' contacto');


      User
      .populate(solicitud_servicios, {path : '_contacto._usuario  _responsable._usuario _responsable_factura._usuario', model: User}, function(err, rs){

             if(solicitud_servicios.length === 0)
      {
        res.send(200,{message:'Not records found'});        
        return;        
       }

      res.json({data:rs});

      });


     
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
    !REQ.vacantes  || (data.vacantes = REQ.vacantes); 
    !REQ.status  || (data.status = REQ.status);                
    !REQ.cargo  || (data._cargo = mongoose.Types.ObjectId(REQ.cargo));   
    !REQ.contacto  || (data._contacto = mongoose.Types.ObjectId(REQ.contacto));   
    !REQ.responsable  || (data._responsable = mongoose.Types.ObjectId(REQ.responsable));   
    !REQ.modelo_competencia  || (data._modelo_competencia = mongoose.Types.ObjectId(REQ.modelo_competencia));   
    !REQ.responsable_factura  || (data._responsable_factura = mongoose.Types.ObjectId(REQ.responsable_factura));   
    !REQ.candidato_interno  || (data._candidato_interno = REQ.candidato_interno);   
    !REQ.numero_orden_pedido  || (data.numero_orden_pedido = REQ.numero_orden_pedido);   
    !REQ.tipo_evaluacion  || (data.tipo_evaluacion = REQ.tipo_evaluacion);   


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