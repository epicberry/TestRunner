/*jshint esversion: 6 */
require("./mongoPool.js").initPool();
var mongoPool = require("./mongoPool.js");
mongoPool.getInstance(function (db){
    //query your mongoDB
    db.collection('basicDetails').find().toArray(function(err, result){
        if(err) throw err;

        console.log(result);
    });
});