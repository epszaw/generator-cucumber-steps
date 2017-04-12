# generator-cucumber-steps [![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Dependency Status][daviddm-image]][daviddm-url] [![Coverage percentage][coveralls-image]][coveralls-url]
> Быстрая генерация step-defs файла на основе существующих фич :watermelon:

![demo](http://i.imgur.com/Wh078Pu.gif)

[Эта документация на английском](https://github.com/lamartire/generator-cucumber-steps/blob/master/README.md).

Вас утомило постоянно создавать файл с описанием шагов? Меня тоже, поэтому я решил упростить себе задачу.

## Установка

```bash
npm install -g yo
npm install -g generator-cucumber-steps
```

## Запуск

```bash
yo cucumber-steps
```

Выберите путь до `feature`-файла (можно без указания расширения файла) и место, где будет сгенерирован файл с объявлением шагов. Все просто!

## Examples

```gherkin
Feature: title
  Scenario: title
    Given precondition with "1" and "2"
    When action
    And addition
    Then testable outcome equals "1"
```
Если у вас есть подобная фича, на выходе вы получите:

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

## Заметки

Словарь в новой версии gherkin потерпел изменения. Будьте внимательны, если используете языковую поддержку в своих сценариях.

Например в русской локализации, ключевое слово `Если` теперь относиться к `Given`. Используйте `Когда` или синонимы `И`.



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
