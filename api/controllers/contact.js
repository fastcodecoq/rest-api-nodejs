module.exports = exports = function(server){
	
    var Contact = require('../models/contact');
    var mongoose = require('mongoose');


      function post(req, res) {
// Create a new instance of the Candidate model
    var contact = new Contact;

// Set the contact properties that came from the POST data
    var REQ = req.params;    

    console.log(REQ, 'req')

    !REQ._usuario  || (contact._usuario = mongoose.Types.ObjectId(REQ._usuario));
    !REQ._empresa  || (contact._empresa = mongoose.Types.ObjectId(REQ._empresa));

   
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

                       res.json({'data': {contacts : rs}});
                          return;


 			  });
   
    }


  

  
  server.get(global.apiBaseUri + '/contacts/empresa/:empresaid', get);
  server.get(global.apiBaseUri + '/contacts/:contactid', get);
  server.post(global.apiBaseUri + '/contacts', post);


}



