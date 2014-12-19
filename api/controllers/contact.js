module.exports = exports = function(server){
  
    var Contact = require('../models/contact');
    var mongoose = require('mongoose');
     var Usuario = require('../models/usuario');
    var Empresa = require('../models/empresa');



    function getContacts(req, res){

              var REQ = req.params;

              if(!REQ.empresaid)
                  {
                    res.send(new Error('Invalid Params'));
                    return;
                  }
        
        Empresa.findOne({_id : mongoose.Types.ObjectId(REQ.empresaid)}, function(err, rs){

            if(err){
                  res.send(err);
                  return;
            }

            console.log(rs);

            var contacts = rs.contact;                      
                
            var promise = Usuario.find( { _id: { $in: contacts } } ).exec();
            promise.then(function(_rs){                                        
                          
                          res.json({'data': {contacts : _rs, business: rs}});
                          return;

                   });          


        });
   
    }



      function post(req, res) {
// Create a new instance of the Candidate model
    var contact = new Contact;

// Set the contact properties that came from the POST data
    var REQ = req.params;    

    console.log(REQ, 'req')

    !REQ._usuario  || (contact._usuario = mongoose.Types.ObjectId(REQ._usuario));
    !REQ._empresa  || (contact._empresa = mongoose.Types.ObjectId(REQ._empresa));
    !REQ.active || (contact.active = REQ.active);
    !REQ.metadata || (contact.metadata = REQ.metadata);
   
    console.log(contact);    

// Save the contact and check for errors
    contact.save(function (err) {
      if (err) {
        res.send(err);
        return;
      }
      res.json({message: 'Contact added', data: contact});
    });
  }




      function put(req, res) {
// Create a new instance of the Candidate model
    var contact = new Contact;

// Set the contact properties that came from the POST data
    var REQ = req.params;    

    console.log(REQ, 'req')

    var data = {};
    var query = {};

    !REQ._usuario  || (data._usuario = mongoose.Types.ObjectId(REQ._usuario));
    !REQ._empresa  || (data._empresa = mongoose.Types.ObjectId(REQ._empresa));
    !REQ.active || (data.active = REQ.active);
    !REQ.metadata || (data.metadata = REQ.metadata);

   
    console.log(contact);    


      if(!REQ.contactid)
      {
          res.send(500,'invalid params');
            return;
      }

        
        !REQ.contactid || (query._id = mongoose.Types.ObjectId(REQ.contactid));



// Update the contact and check for errors
    
     Contact.update(query, data, function (err, num, raw) {
      if (err) {
        res.send(err);
      }
      res.json({message: num + ' updated'});
    });

  }


    function del(req, res) {
// Use the Contact model to find a specific contact and remove it
    Contact.remove({_id: mongoose.Types.ObjectId(req.params.contactid)}, function (err) {
      if (err) {
        res.send(err);
      }
      res.json({message: 'Contact removed'});
    });
  }




    function get(req, res){

              var REQ = req.params;


        var query = {};


        !REQ.empresaid || (query._empresa = mongoose.Types.ObjectId(REQ.empresaid));
        !REQ.contactid || (query._id = mongoose.Types.ObjectId(REQ.contactid));

        
        Contact.find( query)
        .populate('_usuario _empresa')
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


         function putContact(req, res) {

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
        empresa.contact.push(mongoose.Types.ObjectId(REQ.userid));
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

  

  
  server.get(global.apiBaseUri + '/contacts/empresa/:empresaid', get);
  server.get(global.apiBaseUri + '/contacts/:contactid', get);
  server.put(global.apiBaseUri + '/contacts/:contactid', put);
  server.del(global.apiBaseUri + '/contacts/:contactid', del);
  server.get(global.apiBaseUri + '/contacts', get);
  server.post(global.apiBaseUri + '/contacts', post);

  
  server.get(global.apiBaseUri + '/contacts/get/empresa/:empresaid', getContacts);
  server.put(global.apiBaseUri + '/empresa/:empresaid/contacts/:userid', putContact);


}






