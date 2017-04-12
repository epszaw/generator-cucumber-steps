const {defineSupportCode} = require('cucumber');

defineSupportCode(function ({Given, When, Then}) {
<% steps.forEach(function(step) { %>
  <%= step.keyword %>(/^<%- step.regexp %>$/, function(<%= step.parameters.join(', ') %>) {
    return true;
  });
<% }); %>
});
