const {defineSupportCode} = require('cucumber');

defineSupportCode(function ({Given, When, Then}) {

  Given(/^precondition$/, function () {
    return true;
  });

  When(/^action$/, function () {
    return true;
  });

  And(/^addition$/, function () {
    return true;
  });

  Then(/^testable outcome$/, function () {
    return true;
  });

});
