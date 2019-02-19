var express  = require('express');
var app = express();
const fs = require('fs');
let cors  = require('cors');
var path  = require('path');
var http  = require('http');
var reload = require('reload');
// var morgan = require('morgan');
var engine = require('ejs-locals');
var flash = require('connect-flash');
var responseTime = require('response-time');
var expressUpload = require('express-fileupload');
var bodyParser = require('body-parser');
var cookieSession = require('cookie-session')
var session = require('express-session');
var MemoryStore = session.MemoryStore;
var cookieParser = require('cookie-parser');
let connection = require('./config/db').connection;

//OPTIMISATION
var cluster = require('cluster');
var numCPU = require('os').cpus().length;
console.log("total cpu  ",numCPU)

app.engine('ejs', engine);
app.set('view engine' , 'ejs');
var public_dir = path.join(__dirname, './public')
app.use(express.static(public_dir));
app.use(flash());
app.use(cors());
app.use(cookieParser());
app.use(expressUpload());
app.set('port', process.env.PORT || 3001);
app.set('strict routing', true);
app.use( bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieSession({
    name : 'app.sid',
    secret: 'medihome',
    resave: true,
    // store: new MemoryStore(),
    saveUninitialized: true
})); 

app.use(responseTime())
// app.use(morgan('tiny'))
app.use(function(req,res,next){
    // SET SESSION MESSAGES
    var message = {success :  [], error : []} 
    message.success = req.flash('success');
    message.error = req.flash('error');
   next();
})

let ctrl_home = require('./controllers/home.js');
let ctrl_pres = require('./controllers/pres.js');
let ctrl_order = require('./controllers/order.js');
let ctrl_email = require('./controllers/email.js');
let ctrl_admin = require('./controllers/admin.js');
let banner_admin = require('./controllers/banner.js');
app.use('/', ctrl_home);
app.use('/', ctrl_pres);
app.use('/', ctrl_order);
app.use('/', ctrl_email);
app.use('/', ctrl_admin);
app.use('/', banner_admin);


//production mode
if(process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'client/build')));
  app.get('*', (req, res) => {
      res.sendFile(path.join(__dirname+'/client/build/index.html'));
  })
}

app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

// if (cluster.isMaster) {
//     console.log(`Master ${process.pid} is running`);
//     for (let i = 0; i < numCPU; i++) {
//         cluster.fork()
//     }
//     cluster.on('exit', (worker, code, signal) => {
//         console.log(`Worker ${worker.process.pid} died.`);
//     });
// } else {
        console.log(`Worker ${process.pid} started`);
        app.get('/cluster', (req, res) => {
            let worker = cluster.worker.id;
            res.send(`Running on worker with id ==> ${worker}`);
        });
        var server = http.createServer(app)
        reload(app);
        server.listen(app.get('port') , function(){
            console.log('Running on port ' +app.get('port'));
        }) 
// } 
global.log = function(data) {
    console.log(data);
}
let presc_path =  path.join(__dirname,'client/src/images/presc/');
let banner_path =  public_dir+"/media/banner/"
!fs.existsSync(presc_path) && fs.mkdirSync(presc_path);
!fs.existsSync(banner_path) && fs.mkdirSync(banner_path);

global.presc_image_path = presc_path
global.banner_image_path = banner_path
module.exports = app;
