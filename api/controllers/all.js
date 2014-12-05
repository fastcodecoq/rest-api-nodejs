module.exports = exports = function(server){
	  
	     require('./usuario.js')(server);	     
	     require('./empresa.js')(server);	     
	     require('./roles.js')(server);	     
	     require('./candidate.js')(server);	     
	     require('./orden_servicio.js')(server);	     

}