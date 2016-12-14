const EventEmitter = require('events');

class LogEmitter extends EventEmitter {}

const logEmitter = new LogEmitter();
logEmitter.on('started', () => {
    setImmediate(() => {
        console.log('Test Case Started!');
    });
});

logEmitter.on('ended', (result) => {
    setImmediate(() => {
        console.log(`Test Case Ended. Result - ${result}`);
    });
});