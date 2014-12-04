var restify = require('restify');
var mongoose = require('mongoose');
var awsConf = undefined;


var server = restify.createServer({  
  name: 'Login',
});



server.use(restify.urlEncodedBodyParser({
  mapParams: true
}));


server.use(restify.queryParser());
server.use(restify.gzipResponse());

  
//soporte de crossdomain
server.pre(require('./utils/cross.domain'));

mongoose.connection.on('open', function(ref){
   
        console.log('Conectado a Mongo');
        
     

});

mongoose.connection.on('error', function(err){
  console.log('no se pudo realizar la conexión con mongo');
  console.log(err);
  return console.log(err.message);
});

var dbUrl = 'mongodb://' + process.env.dbUser + ":" + process.env.dbPass + "@" + process.env.dbUrl + "/" + process.env.dbName;

try {
  //nos conectamos a la base de datos  

  mongoose.connect( dbUrl );
  console.log('Iniciando conexión en: ' + dbUrl + ', esperando...');



} catch (err) {

  console.log('Conexión fallida a: ' + dbUrl);

}



// usamos todos los cores disponibles en la máquina
// para un mejor rendimiento del app




