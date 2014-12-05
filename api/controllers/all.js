module.exports = exports = function(server){
	  
	var fs = require('fs');
	var files = fs.readdirSync('./');

		for (x in files)
		 if(!files[x].match('gitignore|base'))
   		     require(files[x])(server);



}