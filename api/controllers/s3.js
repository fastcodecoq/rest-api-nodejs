var uploaderCtrl = function (server){



       var s3 = require('s3');
       var client = s3.createClient({
                                      maxAsyncS3: 20,     
                                      s3RetryCount: 3,    
                                      s3RetryDelay: 1000, 
                                      multipartUploadThreshold: 20971520, 
                                      multipartUploadSize: 15728640, 
                                      s3Options: {
                                        accessKeyId: process.env.s3Key,
                                        secretAccessKey: process.env.s3Secret,

                                        } 
                                    });

       function get(req, res){}

       function post(req, res){
           //code

            var REQ = req.params;
            var FILE = req.files;
            

            console.log('File: ', FILE);            

            res.json({});

        }

       function del(req, res){
        // code
            var REQ = req.params;

       }

       function put(req, res){
        // code
            var REQ = req.params;

       }



       server.get(global.apiBaseUri + '/api/uploader',get);
       server.post(global.apiBaseUri + '/api/uploader',post);
       server.put(global.apiBaseUri + '/api/uploader/:fileid',put);
       server.del(global.apiBaseUri + '/api/uploader/:fileid',del);

              console.log('/api/s3');

} 


module.exports = uploaderCtrl;




// controller base
