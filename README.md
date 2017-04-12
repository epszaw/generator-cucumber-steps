# generator-cucumber-steps [![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Dependency Status][daviddm-image]][daviddm-url] [![Coverage percentage][coveralls-image]][coveralls-url]
> Fast steps-defs based on features generation :watermelon:

![demo](http://i.imgur.com/Wh078Pu.gif)

[This docs on Russian](https://github.com/lamartire/generator-cucumber-steps/blob/master/README_RU.md).

You are tired of creating a "steps file"? Me too, so I decided to simplify my problem.

## Installation

```bash
npm install -g yo
npm install -g generator-cucumber-steps
```

## Executing

```bash
yo cucumber-steps
```

Select path to the `feature`-file (without file extension) and location where will be generated a stepsDefs file. It's simple!

## Examples

```gherkin
Feature: title
  Scenario: title
    Given precondition with "1" and "2"
    When action
    And addition
    Then testable outcome equals "1"
```
If you have same feature with parameters, you'll recieve:

```javascript
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
```

## Some notes

Dictionary in new version of gherkin was changed. Be careful if you write your features with locale support!

For example, in Russian localization, key word `Если` now refer to `Given`. Use `Когда` or synonyms of `И`.

## License

MIT © [lamartire](lamartire@gmail.com)


[npm-image]: https://badge.fury.io/js/generator-cucumber-steps.svg
[npm-url]: https://npmjs.org/package/generator-cucumber-steps
[travis-image]: https://travis-ci.org/lamartire/generator-cucumber-steps.svg?branch=master
[travis-url]: https://travis-ci.org/lamartire/generator-cucumber-steps
[daviddm-image]: https://david-dm.org/lamartire/generator-cucumber-steps.svg?theme=shields.io
[daviddm-url]: https://david-dm.org/lamartire/generator-cucumber-steps
[coveralls-image]: https://coveralls.io/repos/lamartire/generator-cucumber-steps/badge.svg
[coveralls-url]: https://coveralls.io/r/lamartire/generator-cucumber-steps
