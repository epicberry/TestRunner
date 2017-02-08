exports.config = {
  // seleniumAddress: 'https://param7:f0cfe8f5-812c-4ba3-8045-9d3785b25295@ondemand.saucelabs.com:443/wd/hub',
  // seleniumAddress: 'http://localhost:4444/wd/hub',
  seleniumAddress: 'https://paramsingh:12fe80ec-4460-40e1-b994-b85b44511f20@ondemand.saucelabs.com:443/wd/hub',
  specs: ['ui/*.js'],
  // specs: ['1000.js'],
  multiCapabilities: [{
    name: 'testName1',
    browserName: 'chrome',
    shardTestFiles: true,
    maxInstances: 8
  }
    // , {
    //   'browserName': 'chrome'
    // }
  ],
  onPrepare: function () {
    browser.ignoreSynchronization = true;
  }
};
