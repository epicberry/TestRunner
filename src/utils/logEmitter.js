/*jshint esversion: 6 */
const EventEmitter = require('events');

class LogEmitter extends EventEmitter {}

const logEmitter = new LogEmitter();
logEmitter.on('started', (testCaseID) => {
    setImmediate(() => {
        console.log(`Test Case ${testCaseID} Started!`);
    });
});

logEmitter.on('ended', (testCaseID, result) => {
    setImmediate(() => {
        console.log(`Test Case ${testCaseID} ended. Result - ${result}`);
    });
});

exports.raiseStartEvent = (testCaseID) => logEmitter.emit('started', testCaseID);
exports.raiseEndEvent = (testCaseID, result) => logEmitter.emit('ended', testCaseID, result);