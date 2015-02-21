var express = require('express');
var app = express();
var http = require('http').Server(app);
var path = require('path');
var mongoose = require('mongoose');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var errorHandler = require('errorhandler');
var methodOverride = require('method-override');
var session = require('client-sessions');
var busboy = require('connect-multiparty');
var io = require('socket.io')(http);
var fs = require('fs');

//load project modules & configs);
var config = require('./app/config');
var allowCrossDomain = function(req, res, next) {
  res.header("Access-Control-Allow-Origin", req.headers.origin);
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Credentials", "true");
  res.header("Access-Control-Allow-Methods", "GET,PUT,DELETE,POST,OPTIONS,PATCH");
  next();
};
mongoose.connect(config.url);

var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error'));

db.on('open', function () {
  runServer();
});

var runServer = function() {
  app.use(morgan('dev'));
  app.use(express.static(__dirname + '/frontend'));
  app.set('port', process.env.PORT || 8080);
  app.use(allowCrossDomain);
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({
   extended: true
  }));
  app.use(methodOverride());
  if ('development' == app.get('env')) {
    app.use(errorHandler());
  }

  app.use(session({
    cookieName: 'session',
    secret: config.app_secret,
    duration: 30 * 60 * 1000,
    activeDuration: 5 * 60 * 1000,
  }));

  app.get('/', express.static(path.join(__dirname, '/frontend')));
  require('./app/routes')(app);

  io.on('connection', function(socket){
    console.log('a user connected');
    socket.on('chat', function(msg){
      io.emit('chat', msg);
    });

    socket.on('recording', function(stream) {
      io.emit('play', {buffer:stream});
    });

    // fs.readFile('./app/404-background.mp4', function(err, buffer){
    //   io.emit('video', { buffer: buffer });
    // });
    socket.on('disconnect', function(){
      console.log('user disconnected');
    });
  });



  //app listen port 8080
  http.listen(8080);
};


