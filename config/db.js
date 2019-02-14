var mongoose = require('mongoose');
var env = require('../config/config');
var config = env.config();
var mongodbUri = config.database;
//mongodb options
var options = {
  socketTimeoutMS: 0,
  keepAlive: true,
  reconnectTries: 30,
  useCreateIndex: true,
  useNewUrlParser: true,
  useFindAndModify : false
};
mongoose.Promise = Promise
//connection to the database
mongoose.connect(mongodbUri, options).catch(err => { // we will not be here...
  console.error('App starting error:', err.stack);
  throw err;
  // process.exit(1);
});
mongoose.connection.on('connected', function () {  
  console.log('mongoose connected');
}); 
process.on('unhandledRejection', (reason, p) => {
  console.log( p);
  // application specific logging, throwing an error, or other logic here
});
module.exports = {
    connection : mongoose
}