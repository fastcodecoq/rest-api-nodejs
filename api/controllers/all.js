module.exports = exports = function(server){
	  
	var fs = require('fs');
	var files = fs.readdirSync('./');

	console.log(files)

		for (x in files)
		 if(!files[x].match('gitignore|base|config|zip|json'))				 
   		     require(files[x])(server);



}