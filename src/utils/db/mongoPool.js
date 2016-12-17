var MongoClient = require('mongodb').MongoClient;
var dbUrl = require("../../../config.js").MongoDBURL;

var option = {
  db:{
    numberOfRetries : 5
  },
  server: {
    auto_reconnect: true,
    poolSize : 40,
    socketOptions: {
        connectTimeoutMS: 500
    }
  },
  replSet: {},
  mongos: {}
};

function mongoPool(){}

var p_db;

function initPool(cb){
  MongoClient.connect(url, option, function(err, db) {
    if (err) throw err;

    p_db = db;
    if(cb && typeof(cb) == 'function')
        cb(p_db);
  });
  return mongoPool;
}

mongoPool.initPool = initPool;

function getInstance(cb){
  if(!p_db){
    initPool(cb);
  }
  else{
    if(cb && typeof(cb) == 'function')
      cb(p_db);
  }
}
mongoPool.getInstance = getInstance;

module.exports = mongoPool;