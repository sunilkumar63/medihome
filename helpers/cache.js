// var Memcached =  require('memcached');
// const redis = require('redis');
var cache = require('memory-cache');
var newCache = new cache.Cache();
console.log("Cache Memory Size ", cache.memsize());
// const client = redis.createClient();
// client.on('error', (err) => {
//     console.log("Redis Error " + err);
//   });
//   client.on('connect', (err) => {
//     console.log("Redis connected");
//   });
//   client.set('my test key', 'my test value', redis.print);

// var memcached = new Memcached();
// console.log("cache check")
// memcached.connect( '127.0.0.1:3001', function( err, conn ){
//     if( err ) {
//     console.log( conn.server,'error while memcached connection!!');
//     }else{memcached.set('foo', 'dass');
//         console.log("connected mem")
//       }
// })



module.exports.redisMiddleware = (duration=10) => {
    return  (req,res,next) => { next(); return;
    let key = "__medi_redis__" + req.originalUrl || req.url;
    client.get(key, function(err,data){        
        if(data){  
          console.log("cache hit")
            res.send(data);
           
        }else{  log("no cache")
            res.sendResponse = res.send;
            res.send = (body) => {  
                // client.setex('some key', 3600, 'some value');
                client.set(key, body, function(err){
                  console.log("cache saved")
                });
                res.sendResponse(body);
            }
            next();
        }
    });
  }
  };

  module.exports.mcacheMiddleware = (duration=10) => {
    return  (req,res,next) => { 
    let key = "__medi_cache__" + req.originalUrl || req.url;
    var data =  cache.get(key)
        if(data) {  
          console.log("cache hit")
            res.send(data);
        }else{ 
          //  log("no cache")
            res.sendResponse = res.send;
            res.send = (body) => {  
                cache.put(key, body)
                  // console.log("cache saved")
                res.sendResponse(body);
            }
            next();
        }
  }
  };