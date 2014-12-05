var fs = require('fs');
var files = fs.readdirSync('./models/plugins');

	for (x in files)
		 if(!files[x].match('gitignore|base|config|zip|json'))		
		    require(files[x]);
