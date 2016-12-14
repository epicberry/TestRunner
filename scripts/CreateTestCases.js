var http = require('http');

var sampleTestCases = [{
    "_id": "5839eee83cd5d894b1dd72d4",
    "testCaseId": "3000",
    "testCategory": "category3",
    "description": "Test Case Description",
    "browser": "Mozilla/5.0 (Windows NT 6.1; WOW64; rv:27.0) Gecko/20100101 Firefox/27.0",
    "testSteps": [
        {
            "type": "navigate",
            "url": "https://www.amazon.com",
            "selectBy": "css"
        },{
            "type": "input",
            "elementName": "[id=\"twotabsearchtextbox\"]",
            "value": "The Best",
            "selectBy": "css"
        },{
            "type": "click",
            "elementName": "[value=\"Go\"]",
            "selectBy": "css"
        },{
            "type": "sleep",
            "timeInMilliSecs": "2000"
        },{
            "type": "click",
            "elementName": "[id=\"result_0\"] a",
            "selectBy": "css"
        },{
            "type": "dbCall",
            "query": "select 1 from dual;",
            "outputVar": "$var1"
        },{
            "type": "mainframeCall",
            "cmds": "pwd\nls -l",
            "outputVar": "$var2"
        },{
            "type": "restCall",
            "endpoint": "https://localhost:1111/data/$var1",
            "outputVar": "$var3"
        },{
            "type": "input",
            "elementName": "[id=\"twotabsearchtextbox\"]",
            "value": " second search",
            "selectBy": "css"
        },{
            "type": "click",
            "elementName": "[value=\"Go\"]",
            "selectBy": "css"
        }
    ]
}];


//Uncomment for actual execution
//PrepareTests();

//Uncomment for sample test case creation
CreateFiles(sampleTestCases);

function PrepareTests() {
    var options = {
        host: '192.169.179.82',
        //host: 'localhost',
        port: 1111,
        path: '/data/all'
    };

    // console.log('Connecting to DB');
    // console.log(options);


    http.get(options, function (res) {
        var body = '';
        res.on('data', function (chunk) {
            //console.log(JSON.parse(chunk));
            //CreateFiles(JSON.parse(chunk));
            body += chunk;
        });
        res.on('end', function () {
            // console.log(JSON.parse(body));
            CreateFiles(JSON.parse(body));
        });
    }).on("error", function (e) {
        console.log("Got error: " + e.message);
    });
}

function CreateFiles(testCases) {
    testCases.forEach(function (testCase) {
        var strTestFlow = CreateProtractorString(testCase);

        var fs = require('fs');
        fs.writeFile("../TestFiles/" + testCase.testCaseId + ".js", strTestFlow, function (err) {
            if (err) {
                return console.log(err);
            }
        });
    });
}

function CreateProtractorString(testCase) {
    testFlow = [];
    endFlow = [];
    testFlow.push(`var logFile = require('../common/sendLogs.js');\nconst logEmitter = new LogEmitter(); \nlogEmitter.emit('started');\nvar retrievedProperties = {};\nretrievedProperties['var1'] = 1;\n`);
    testFlow.push(`describe('${testCase.description}' , function() {
\t it(' ${testCase.description}', function() {`);
    var count = 2;

    testCase.testSteps.forEach(function (testStep) {
        tabs = "\t".repeat(count);
        tabsPlus2 = "\t".repeat(count+2);
        tabsPlus3 = "\t".repeat(count+3);

        logEntry = `logFile.log("project1.${testCase.testCategory}.${testCase.testCaseId}", `;

        errorFtn = `, function(err){
${tabsPlus3}logEmitter.emit('ended', 'failure');
//${tabsPlus3}${logEntry}"failure"); 
//${tabsPlus3}console.log(err); 
${tabsPlus3}throw new Error('Error occurred'); 
${tabsPlus2}});
${tabs}}`;

        switch (testStep.type) {
            case 'navigate':
                testFlow.push(`\n${tabs} browser.get('${testStep.url}').then(function(){`);
                break;
            case 'input':
                testFlow.push(`\n${tabs} element(by.${testStep.selectBy} ('${testStep.elementName}')).sendKeys('${testStep.value}').then(function(){`);
                break;
            case 'click':
                testFlow.push(`\n${tabs} element(by.${testStep.selectBy}('${testStep.elementName}')).click().then(function(){`);
                break;
            case 'sleep':
                // testFlow.push(`\n${tabs} browser.sleep(${testStep.timeInMilliSecs});`);
                testFlow.push(`\n${tabs} browser.sleep(${testStep.timeInMilliSecs}).then(function(){`);
                break;
            // case 'dbCall':
            //     strTestFlow += "\n browser.sleep(" + testStep.timeInMilliSecs + "); ";
            //     break;
            default:
                console.log('In default');
        }
        endFlow.push(errorFtn);
        count++;
    });
    logEntry += `"passed");`;

    testFlow.push(`\n${tabs}${logEntry}\n${tabs} }); } ${endFlow.reverse().join('') });`);

    return testFlow.join('');
}