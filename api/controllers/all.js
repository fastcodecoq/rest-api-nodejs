module.exports = exports = function(server){
	  
	     require('./usuario.js')(server);	     
	     require('./empresa.js')(server);	     
	     require('./role.js')(server);	     

}