/**
 * Module dependencies.
 */

var express = require('express')
  , mongoose = require('mongoose')
  , MongoStore = require('connect-mongo')(express)
  , siteRoute = require('./routes/site')
  , user = require('./routes/user')
  , http = require('http')
  , path = require('path')
  , flash = require('connect-flash')
  , ejs = require('ejs-locals')
  , setting = require('./setting');

var app = express();

app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  console.log(ejs);
  app.engine('html', ejs);
  //change ejs to html template
  app.set('view engine', 'html');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.cookieParser());
  app.use(flash());
  app.use(express.session({ 
	  secret: setting.cookieSecret, 
	  store: new MongoStore({ 
	  db: setting.db 
	  }) 
}));
  app.use(app.router);
  app.use(require('stylus').middleware(__dirname + '/public'));
  app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function(){
  app.use(express.errorHandler());
});
//db name is game-maker
mongoose.connect('mongodb://localhost/game-maker');

// Routes

// index
app.post('/login', siteRoute.login);
app.post('/register', siteRoute.register);
app.get('/', function(req, res){
	res.render('index', {
        title: 'Demo'
    });
});

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback () {
	app.listen(process.env.PORT || 3000);
	console.log("current node!");
});

