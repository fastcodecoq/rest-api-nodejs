module.exports = exports = function(server){
  
    var Cargo = require('../models/cargo');
    var mongoose = require('mongoose');
    var Empresa = require('../models/empresa');






      function post(req, res) {
// Create a new instance of the Cargo model
    var cargo = new Cargo;

// Set the cargo properties that came from the POST data
    var REQ = req.params;    

    console.log(REQ, 'req')

    !REQ.empresa  || (cargo._empresa = mongoose.Types.ObjectId(REQ.sempresa));
    !REQ.active || (cargo.active = REQ.active);
    !REQ.perfil || (cargo.perfil = REQ.perfil);
    !REQ.name || (cargo.name = REQ.name);
    !REQ.metadata || (cargo.metadata = REQ.metadata);
   
    console.log(cargo);    

// Save the cargo and check for errors
    cargo.save(function (err) {
      if (err) {
        res.send(err);
        return;
      }
      res.json({message: 'Cargo added', data: cargo});
    });
  }




      function put(req, res) {
// Create a new instance of the Cargo model
    var cargo = new Cargo;

// Set the cargo properties that came from the POST data
    var REQ = req.params;    

    console.log(REQ, 'req')

    var data = {};
    var query = {};

    !REQ.empresa  || (data._empresa = mongoose.Types.ObjectId(REQ.sempresa));
    !REQ.active || (data.active = REQ.active);
    !REQ.perfil || (data.perfil = REQ.perfil);
    !REQ.name || (data.name = REQ.name);
    !REQ.metadata || (data.metadata = REQ.metadata);

   
    console.log(cargo);    


      if(!REQ.cargoid)
      {
          res.send(500,'invalid params');
            return;
      }

        
        !REQ.cargoid || (query._id = mongoose.Types.ObjectId(REQ.cargoid));



// Update the cargo and check for errors
    
     Cargo.update(query, data, function (err, num, raw) {
      if (err) {
        res.send(err);
      }
      res.json({message: num + ' updated'});
    });

  }


    function del(req, res) {
// Use the Cargo model to find a specific cargo and remove it
    Cargo.remove({_id: mongoose.Types.ObjectId(req.params.cargoid)}, function (err) {
      if (err) {
        res.send(err);
      }
      res.json({message: 'Cargo removed'});
    });
  }




    function get(req, res){

              var REQ = req.params;


        var query = {};


        !REQ.empresaid || (query._empresa = mongoose.Types.ObjectId(REQ.empresaid));
        !REQ.cargoid || (query._id = mongoose.Types.ObjectId(REQ.cargoid));

        
        Cargo.find( query)
        .populate('_empresa')
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


         function putCargo(req, res) {

    var data = {};
    var REQ = req.params;


    if(!REQ.empresaid || !REQ.userid)
          {
            res.send(500,'invalid params');
            return;
          }





    // making the query for update

    var query = {};

  
    !REQ.empresaid || (query._id = mongoose.Types.ObjectId(REQ.empresaid));
  

    console.log(query);
  
    Empresa.findOne(query, function (err, empresa) {
      
      if (err) {
        res.send(500,err);
        return;
        
      }
      
        console.log(empresa);
        empresa.cargo.push(mongoose.Types.ObjectId(REQ.userid));
        empresa.save(function(err){
           if (err) {
            res.send(500,err);
            return;
            
            } 

            res.json({message: ' Cargo added'});
        });

    });
        

// Use the Empresa model to find a specific empresa
   
  }

  

  
  server.get(global.apiBaseUri + '/cargo/empresa/:empresaid', get);
  server.get(global.apiBaseUri + '/cargo/:cargoid', get);
  server.put(global.apiBaseUri + '/cargo/:cargoid', put);
  server.del(global.apiBaseUri + '/cargo/:cargoid', del);
  server.get(global.apiBaseUri + '/cargo', get);
  server.post(global.apiBaseUri + '/cargo', post);

  
  //server.get(global.apiBaseUri + '/cargos/get/empresa/:empresaid', getCargos);
  server.put(global.apiBaseUri + '/empresa/:empresaid/cargos/:userid', putCargo);


}






