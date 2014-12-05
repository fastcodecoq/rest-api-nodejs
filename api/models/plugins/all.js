var fs = require('fs');
var files = fs.readdirSync('./');

	for (x in files)
		require(files[x]);
