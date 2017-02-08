/*jshint esversion: 6 */
const logEmitter = require('../../utils/logEmitter.js');
logEmitter.raiseStartEvent('3000');
var retrievedProperties = {};

describe('Test Case Description' , function() {
    beforeEach(function(){
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 60000;
    });

    it('Test Case Description', function() {
        browser.get('https://www.amazon.com').then(function(){
            element(by.css ('[id="twotabsearchtextbox"]')).sendKeys('The Best').then(function(){
                element(by.css('[value="Go"]')).click().then(function(){
                    browser.sleep(2000).then(function(){
                        element(by.css('[id="result_0"] a')).click().then(function(){
                            element(by.css ('[id="twotabsearchtextbox"]')).sendKeys(' second search').then(function(){
                                element(by.css('[value="Go"]')).click().then(function(){
                                    logEmitter.raiseEndEvent('3000', 'passed');
                                });
                            });
                        });
                    });
                });
            });
        });
    });
});