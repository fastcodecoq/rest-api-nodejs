module.exports = exports = function(server){
	
    var Usuario = require('../models/usuario');
    var Empresa = require('../models/empresa');
    var mongoose = require('mongoose');

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
 			  	  var _contacts = [];

            var x = 0;

 			  	  for(x = 0; x < contacts.length; x++){

                console.log('Contact' ,contacts[x])
                
 			  	  	     Usuario.findOne({_id : mongoose.Types.ObjectId(contacts[x])}, function(err,rs){

 			  	  	     	  if(err){
 			  	        	    res.send(err);
 			  	  	            return;
 			  	               } 			 

 			  	  	     		_contacts.push(rs);

                      console.log(x)

                      if(x === (contacts.length - 1)){
                          res.json({data:_contacts});
                          return;
                      }

 			  	  	     });

 			  	  }

 			  })
   
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

  
  server.get(global.apiBaseUri + '/contacts/empresa/:empresaid', getContacts);
  server.put(global.apiBaseUri + '/empresa/:empresaid/contact/:userid', putContact);


}



