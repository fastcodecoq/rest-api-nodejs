module.exports = exports = function(server){
  
    var Event = require('../models/event');
    var mongoose = require('mongoose');
    var Usuario = require('../models/usuario');
    var Empresa = require('../models/empresa');





      function post(req, res) {
// Create a new instance of the Candidate model
    var _event = new Event;

// Set the _event properties that came from the POST data
    var REQ = req.params;    

    console.log(REQ, 'req')


    !REQ._usuario  || (_event._usuario = mongoose.Types.ObjectId(REQ._usuario));
    !REQ.orden_servicio  || (_event._orden_servicio = mongoose.Types.ObjectId(REQ.orden_servicio));
    !REQ.name || (_event.name = REQ.name);
    !REQ.description || (_event.description = REQ.description);
    !REQ.entity || (_event.entity = REQ.entity);
    !REQ.entity_name || (_event.entity_name = REQ.entity_name);
    !REQ.link || (_event.link = REQ.link);
    !REQ.metadata || (_event.metadata = REQ.metadata);
   
    console.log(_event);    

// Save the _event and check for errors
    _event.save(function (err) {
      if (err) {
        res.send(err);
        return;
      }
      res.json({message: 'Event added', data: _event});
    });
  }




      function put(req, res) {
// Create a new instance of the Candidate model
    var _event = new Event;

// Set the _event properties that came from the POST data
    var REQ = req.params;    

    console.log(REQ, 'req')

    var data = {};
    var query = {};

    !REQ._usuario  || (data._usuario = mongoose.Types.ObjectId(REQ._usuario));
    !REQ._empresa  || (data._empresa = mongoose.Types.ObjectId(REQ._empresa));
    !REQ.active || (data.active = REQ.active);
    !REQ.metadata || (data.metadata = REQ.metadata);

   
    console.log(_event);    


      if(!REQ.eventid)
      {
          res.send(500,'invalid params');
            return;
      }

        
        !REQ.eventid || (query._id = mongoose.Types.ObjectId(REQ.eventid));



// Update the _event and check for errors
    
     Event.update(query, data, function (err, num, raw) {
      if (err) {
        res.send(err);
      }
      res.json({message: num + ' updated'});
    });

  }


    function del(req, res) {
// Use the Event model to find a specific _event and remove it
    Event.remove({_id: mongoose.Types.ObjectId(req.params.eventid)}, function (err) {
      if (err) {
        res.send(err);
      }
      res.json({message: 'Event removed'});
    });
  }




    function get(req, res){

              var REQ = req.params;


        var query = {};


        !REQ.ordenid || (query._orden_servicio = mongoose.Types.ObjectId(REQ.ordenid));
        !REQ.eventid || (query._id = mongoose.Types.ObjectId(REQ.eventid));

        
        Event.find(query)
        .exec(function(err, rs){


              if(err){
                  res.send(err);
                  return;
            }

            console.log(rs);

                       res.json({'data': rs});
                          return;


        });
   
    }




  

  
  server.get(global.apiBaseUri + '/event/:eventid', get);
  server.get(global.apiBaseUri + '/event/orden_servicio/:ordenid', get);
  server.put(global.apiBaseUri + '/event/:eventid', put);
  server.del(global.apiBaseUri + '/event/:eventid', del);
  server.get(global.apiBaseUri + '/event', get);
  server.post(global.apiBaseUri + '/event', post);



}






