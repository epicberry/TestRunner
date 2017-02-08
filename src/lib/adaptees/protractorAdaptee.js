/*jshint esversion: 6 */
var config = require('../../../config.js');

this.createTest = function (testCase) {
    testFlow = [];
    endFlow = [];
    testFlow.push(`/*jshint esversion: 6 */`);
    testFlow.push(`const logEmitter = require('../../utils/logEmitter.js');`);
    testFlow.push(`logEmitter.raiseStartEvent('${testCase.testCaseID}');`);
    testFlow.push(`var retrievedProperties = {};`);
    //testFlow.push(`require("../../utils/db/mongoPool.js").initPool();`);
    //testFlow.push(`var mongoPool = require("../../utils/db/mongoPool.js");`);
    testFlow.push(``);

    testFlow.push(`describe('${testCase.description}' , function() {
    it('${testCase.description}', function() {`);
    var count = 1;
    var startedUsingThen = false;
    var needThen = false;

    testCase.testSteps.forEach(function (testStep) {
        passEntry = `logEmitter.raiseEndEvent('${testCase.testCaseID}', 'passed');`;

        errorFtn = `, function(err){
logEmitter.raiseEndEvent('${testCase.testCaseID}', 'failure');
throw new Error('Error occurred'); 
});
}`;

        switch (testStep.type) {
            case 'navigate':
                testFlow.push(`browser.get('${testStep.url}')`);
                break;
            case 'input':
                testFlow.push(`element(by.${testStep.selectBy} ('${testStep.elementName}')).sendKeys('${testStep.value}')`);
                break;
            case 'click':
                testFlow.push(`element(by.${testStep.selectBy}('${testStep.elementName}')).click()`);
                break;
            case 'sleep':
                testFlow.push(`browser.sleep(${testStep.timeInMilliSecs})`);
                break;
            case 'dbCall':
                testFlow.push(`mongoPool.getInstance(function(db){
                    db.collection('basicDetails).find().toArray(function(err, result){
                        if(err) throw err;
                        console.log(result);
                    });
                })`);
                startedUsingThen = true;
                needThen = false;
                break;
            default:
                throw (`Test Step type ${testStep.type} not found`);
        }
        if (startedUsingThen && needThen) {
            testFlow.push(`.then(function(){`);
            count++;
        }
        else {
            testFlow.push(`;`);
        }
        needThen = true;
        endFlow.push(errorFtn);
    });

    testFlow.push(`${passEntry}\n`);
    testFlow.push("});".repeat(count + 1));

    var fs = require('fs');
    fs.writeFile("src/testFiles/ui/" + testCase.testCaseID + ".js", testFlow.join('\n'), function (err) {
        if (err) {
            return console.log(err);
        }
    });
};