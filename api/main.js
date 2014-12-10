var restify = require('restify');
var mongoose = require('mongoose');
var awsConf = undefined;
var config = require('./config.json')


var server = restify.createServer({  
  name: 'Login',
});

var io = require('socket.io').listen(server);

server.pre(function(req, res, next) {

     console.log(req.headers)


     if(!req.headers.authorization)       
       {
          res.send(401,{message: 'Unauthorized'});
          return;
       }
      

    if(req.headers.authorization != 'Bearer ' + config[config.env].token)
        {
          res.send(401,{message: 'Unauthorized'});
          return;
        }


     next();

});

server.use(restify.bodyParser());
server.use(restify.gzipResponse());
server.use(restify.authorizationParser());
  
//soporte de crossdomain
//server.pre(require('./utils/cross.domain'));

mongoose.connection.on('open', function(ref){
   
        console.log('Conectado a Mongo');
        global.apiBaseUri = config[config.env].apiBaseUri;
        
        //init all controllers
        require('./controllers/all')(server);
     
        server.listen(8080);
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





