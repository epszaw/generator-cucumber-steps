const {defineSupportCode} = require('cucumber');

defineSupportCode(function ({Given, When, Then}) {

  Given(/^precondition with "(.*)" and "(.*)"$/, function (param1, param2) {
    return true;
  });

  When(/^action$/, function () {
    return true;
  });

  And(/^addition$/, function () {
    return true;
  });

  Then(/^testable outcome equals "(.*)"$/, function (param1) {
    return true;
  });

});
