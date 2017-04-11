const {defineSupportCode} = require('cucumber');

defineSupportCode(function ({Given, When, Then}) {
<%= steps %>
});
