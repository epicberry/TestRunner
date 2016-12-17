/*jshint esversion: 6 */
var http = require('http'),
    config = require('../../config');

PrepareTestFiles();

function PrepareTestFiles() {
    const getTestCases = require('../utils/testCasesData.js');
    var testCases = getTestCases();

    testCases.forEach(function (testCase) {
        var testAdapter = require('../lib/adapters/testAdapter.js');
        testAdapter.createTest(testCase);

        // var strTestFlow = CreateProtractorStringWithoutThen(testCase);
    });
}

// function CreateProtractorStringWithoutThen(testCase) {
//     testFlow = [];
//     endFlow = [];
//     testFlow.push(`/*jshint esversion: 6 */\nconst logEmitter = require('../utils/logEmitter.js'); \nlogEmitter.raiseStartEvent('${testCase.testCaseId}');\nvar retrievedProperties = {};\n`);
//     testFlow.push(`describe('${testCase.description}' , function() {
// \t it('${testCase.description}', function() {`);
//     var count = 1;

//     testCase.testSteps.forEach(function (testStep) {
//         passEntry = `logEmitter.raiseEndEvent('${testCase.testCaseId}', 'passed');`;

//         errorFtn = `, function(err){
// logEmitter.raiseEndEvent('${testCase.testCaseId}', 'failure');
// throw new Error('Error occurred'); 
// });
// }`;

//         switch (testStep.type) {
//             case 'navigate':
//                 testFlow.push(`\nbrowser.get('${testStep.url}');`);
//                 endFlow.push(errorFtn);
//                 break;
//             case 'input':
//                 testFlow.push(`\nelement(by.${testStep.selectBy} ('${testStep.elementName}')).sendKeys('${testStep.value}');`);
//                 endFlow.push(errorFtn);
//                 break;
//             case 'click':
//                 testFlow.push(`\nelement(by.${testStep.selectBy}('${testStep.elementName}')).click();`);
//                 endFlow.push(errorFtn);
//                 break;
//             case 'sleep':
//                 testFlow.push(`\nbrowser.sleep(${testStep.timeInMilliSecs});`);
//                 endFlow.push(errorFtn);
//                 break;
//             // case 'dbCall':
//             //     strTestFlow += "\n browser.sleep(" + testStep.timeInMilliSecs + "); ";
//             //     break;
//             default:
//                 console.log('In default');
//         }
//         count++;
//     });

//     testFlow.push(`\n${passEntry}\n`);
//     testFlow.push("});".repeat(2));

//     return testFlow.join('');
// }

// function CreateProtractorString(testCase) {
//     testFlow = [];
//     endFlow = [];
//     testFlow.push(`/*jshint esversion: 6 */\nconst logEmitter = require('../utils/logEmitter.js'); \nlogEmitter.raiseStartEvent('${testCase.testCaseId}');\nvar retrievedProperties = {};\n`);
//     testFlow.push(`describe('${testCase.description}' , function() {
// \t it('${testCase.description}', function() {`);
//     var count = 1;

//     testCase.testSteps.forEach(function (testStep) {
//         passEntry = `logEmitter.raiseEndEvent('${testCase.testCaseId}', 'passed');`;

//         errorFtn = `, function(err){
// logEmitter.raiseEndEvent('${testCase.testCaseId}', 'failure');
// throw new Error('Error occurred'); 
// });
// }`;

//         switch (testStep.type) {
//             case 'navigate':
//                 testFlow.push(`\nbrowser.get('${testStep.url}').then(function(){`);
//                 endFlow.push(errorFtn);
//                 break;
//             case 'input':
//                 testFlow.push(`\nelement(by.${testStep.selectBy} ('${testStep.elementName}')).sendKeys('${testStep.value}').then(function(){`);
//                 endFlow.push(errorFtn);
//                 break;
//             case 'click':
//                 testFlow.push(`\nelement(by.${testStep.selectBy}('${testStep.elementName}')).click().then(function(){`);
//                 endFlow.push(errorFtn);
//                 break;
//             case 'sleep':
//                 testFlow.push(`\nbrowser.sleep(${testStep.timeInMilliSecs}).then(function(){`);
//                 endFlow.push(errorFtn);
//                 break;
//             // case 'dbCall':
//             //     strTestFlow += "\n browser.sleep(" + testStep.timeInMilliSecs + "); ";
//             //     break;
//             default:
//                 console.log('In default');
//         }
//         count++;
//     });

//     testFlow.push(`\n${passEntry}\n`);
//     testFlow.push("});".repeat(count - 2));

//     return testFlow.join('');
// }


// function CreateProtractorString(testCase) {
//     testFlow = [];
//     endFlow = [];
//     testFlow.push(`var logFile = require('../common/sendLogs.js');\nconst logEmitter = new LogEmitter(); \nlogEmitter.emit('started');\nvar retrievedProperties = {};\nretrievedProperties['var1'] = 1;\n`);
//     testFlow.push(`describe('${testCase.description}' , function() {
// \t it(' ${testCase.description}', function() {`);
//     var count = 2;

//     testCase.testSteps.forEach(function (testStep) {
//         tabs = "\t".repeat(count);
//         tabsPlus2 = "\t".repeat(count + 2);
//         tabsPlus3 = "\t".repeat(count + 3);

//         logEntry = `logFile.log("project1.${testCase.testCategory}.${testCase.testCaseId}", `;

//         errorFtn = `, function(err){
// ${tabsPlus3}logEmitter.emit('ended', 'failure');
// //${tabsPlus3}${logEntry}"failure"); 
// //${tabsPlus3}console.log(err); 
// ${tabsPlus3}throw new Error('Error occurred'); 
// ${tabsPlus2}});
// ${tabs}}`;

//         switch (testStep.type) {
//             case 'navigate':
//                 testFlow.push(`\n${tabs} browser.get('${testStep.url}').then(function(){`);
//                 break;
//             case 'input':
//                 testFlow.push(`\n${tabs} element(by.${testStep.selectBy} ('${testStep.elementName}')).sendKeys('${testStep.value}').then(function(){`);
//                 break;
//             case 'click':
//                 testFlow.push(`\n${tabs} element(by.${testStep.selectBy}('${testStep.elementName}')).click().then(function(){`);
//                 break;
//             case 'sleep':
//                 // testFlow.push(`\n${tabs} browser.sleep(${testStep.timeInMilliSecs});`);
//                 testFlow.push(`\n${tabs} browser.sleep(${testStep.timeInMilliSecs}).then(function(){`);
//                 break;
//             // case 'dbCall':
//             //     strTestFlow += "\n browser.sleep(" + testStep.timeInMilliSecs + "); ";
//             //     break;
//             default:
//                 console.log('In default');
//         }
//         endFlow.push(errorFtn);
//         count++;
//     });
//     logEntry += `"passed");`;

//     testFlow.push(`\n${tabs}${logEntry}\n${tabs} }); } ${endFlow.reverse().join('')});`);

//     return testFlow.join('');
// }