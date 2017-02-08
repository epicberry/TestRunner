/*jshint esversion: 6 */
const EventEmitter = require('events');
const ELKLogger = require('../Logging/logger.js');

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
        ELKLogger.log('project1.cat1.tc1', 'passed');
    });
});

exports.raiseStartEvent = (testCaseID) => logEmitter.emit('started', testCaseID);
exports.raiseEndEvent = (testCaseID, result) => logEmitter.emit('ended', testCaseID, result);