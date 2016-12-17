/*jshint esversion: 6 */
var config = require('../../config');

module.exports = () => {
    if (config.execEnv == 'test') {
        return [{
            "_id": "5839eee83cd5d894b1dd72d4",
            "testCaseID": "3000",
            "testCategory": "category3",
            "description": "Test Case Description",
            "testType": "ui",
            "browser": "Mozilla/5.0 (Windows NT 6.1; WOW64; rv:27.0) Gecko/20100101 Firefox/27.0",
            "testSteps": [
                {
                    "type": "navigate",
                    "url": "https://www.amazon.com",
                    "selectBy": "css"
                }, {
                    "type": "input",
                    "elementName": "[id=\"twotabsearchtextbox\"]",
                    "value": "The Best",
                    "selectBy": "css"
                }, {
                    "type": "click",
                    "elementName": "[value=\"Go\"]",
                    "selectBy": "css"
                }, {
                    "type": "sleep",
                    "timeInMilliSecs": "2000"
                }, {
                    "type": "click",
                    "elementName": "[id=\"result_0\"] a",
                    "selectBy": "css"
                // }, {
                //     "type": "dbCall",
                //     "query": "select 1 from dual;",
                //     "outputVar": "$var1"
                // }, {
                //     "type": "mainframeCall",
                //     "cmds": "pwd\nls -l",
                //     "outputVar": "$var2"
                // }, {
                //     "type": "restCall",
                //     "endpoint": "https://localhost:1111/data/$var1",
                //     "outputVar": "$var3"
                }, {
                    "type": "input",
                    "elementName": "[id=\"twotabsearchtextbox\"]",
                    "value": " second search",
                    "selectBy": "css"
                }, {
                    "type": "click",
                    "elementName": "[value=\"Go\"]",
                    "selectBy": "css"
                }
            ]
        }];
    }
    else if (config.execEnv == 'dev') {
        var options = {
            host: '192.169.179.82',
            //host: 'localhost',
            port: 1111,
            path: '/data/all'
        };

        http.get(options, function (res) {
            var body = '';
            res.on('data', function (chunk) {
                body += chunk;
            });
            res.on('end', function () {
                return JSON.parse(body);
            });
        }).on("error", function (e) {
            console.log("Got error: " + e.message);
        });
    }
};