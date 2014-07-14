/**
 * Module dependencies.
 */

var express = require('express')
  , mongoose = require('mongoose')
  , UserModel = require('./models/user')
  , User = mongoose.model('User')
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
mongoose.connect('mongodb://localhost/game-maker');

// Routes

// index
app.get('/login', siteRoute.login);
app.post('/register', siteRoute.register);
app.get('/', function(req, res){
	res.render('index', {
        title: 'Employees Test'
    });
});

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback () {
	app.listen(process.env.PORT || 3000);
	console.log("current node!");
});

