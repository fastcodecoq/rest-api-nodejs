// controller base


var notifi3r = function (server){

        var mailer = require('nodemailer');
        var mongoose = require('mongoose');
    			
       function post(req, res, next){
       	// code
            var REQ = req.params;

            if(!REQ.to || !REQ.message)
            {
               res.send(500,'invalid params');
               return;
            }
      
            var data = {
                 from : process.env.emailUser,
                 to : REQ.to,
                 subject : REQ.subject,
                 text : REQ.message
            };


          var transport = mailer.createTransport({
                                  service: 'gmail',
                                  auth: {
                                      user: process.env.emailUser,
                                      pass: process.env.emailPass
                                  }
                             });

          transport.sendMail(data, function(err, rs){
               console.log(err, rs);

              res.json({message:'notification sended', data:rs}); 

          })


     }

       function del(req, res, next){
       	// code
            var REQ = req.params;

       }

       function put(req, res, next){
       	// code
            var REQ = req.params;

       }

       function update(req, res, next){
       	// code
            var REQ = req.params;

       }


       server.post(global.apiBaseUri + '/notifi3r',post);


}


module.exports = notifi3r;