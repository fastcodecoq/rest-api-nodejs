// controller base


var ctrlName = function (server){
    			
       function get(req, res, next){
       	// code
       }

       function del(req, res, next){
       	// code
       }

       function put(req, res, next){
       	// code
       }

       function update(req, res, next){
       	// code
       }


       server.get(global.apiBaseUri + 'api/ctrlName',get);
       server.post(global.apiBaseUri + 'api/ctrlName',put);
       server.put(global.apiBaseUri + 'api/ctrlName',put);
       server.del(global.apiBaseUri + 'api/ctrlName',del);

}


module.exports = ctrlName;