/*jshint esversion: 6 */
this.createTest = function (testCase) {
    testFlow = [];
    test.push(`var Client = require('ssh2').Client;`);
    test.push(`var conn = new Client();`);
    test.push(`conn.on('ready', function() {`);
    test.push(`console.log('Client :: ready');`);
    test.push(`conn.exec('uptime', function(err, stream) {`);
    test.push(`if (err) throw err;`);
    test.push(`stream.on('close', function(code, signal) {`);
    test.push(`console.log('Stream :: close :: code: ' + code + ', signal: ' + signal);`);
    test.push(`conn.end();`);
    test.push(`}).on('data', function(data) {`);
    test.push(`console.log('STDOUT: ' + data);`);
    test.push(`}).stderr.on('data', function(data) {`);
    test.push(`console.log('STDERR: ' + data);`);
    test.push(`});`);
    test.push(`});`);
    test.push(`}).connect({`);
    test.push(`host: '092168100100',`);
    test.push(`port: 22,`);
    test.push(`username: 'frylock',`);
    test.push(`password: 'asdadad'`);
    test.push(`});`);

    var fs = require('fs');
    fs.writeFile("src/testFiles/mainframes/" + testCase.testCaseID + ".js", testFlow.join('\n'), function (err) {
        if (err) {
            return console.log(err);
        }
    });
};


// var Client = require('ssh2').Client;
 
// var conn = new Client();
// conn.on('ready', function() {
//   console.log('Client :: ready');
//   conn.exec('uptime', function(err, stream) {
//     if (err) throw err;
//     stream.on('close', function(code, signal) {
//       console.log('Stream :: close :: code: ' + code + ', signal: ' + signal);
//       conn.end();
//     }).on('data', function(data) {
//       console.log('STDOUT: ' + data);
//     }).stderr.on('data', function(data) {
//       console.log('STDERR: ' + data);
//     });
//   });
// }).connect({
//   host: '192.168.100.100',
//   port: 22,
//   username: 'frylock',
//   privateKey: require('fs').readFileSync('/here/is/my/key')
// });