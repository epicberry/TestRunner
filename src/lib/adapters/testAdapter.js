/*jshint esversion: 6 */

function testAdapter(testCase) {
    var testAdaptee;
    switch (testCase.testType) {
        case 'ui':
            testAdaptee = require('../adaptees/protractorAdaptee');
            break;
        case 'rest':
            testAdaptee = require('../adaptees/restAdaptee');
            break;
        case 'mainframe':
            testAdaptee = require('../adaptees/mainframeAdaptee');
            break;
        case 'mobile':
            testAdaptee = require('../adaptees/mobileAdaptee');
            break;
        default:
            console.log('In Default');
    }

    this.createTest = function createTest() {
        testAdaptee.createTest(testCase);
    };
}

this.createTest = function (testCase) {
    var adapter = new testAdapter(testCase);
    adapter.createTest();
};