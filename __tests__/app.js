var path = require('path');
var assert = require('yeoman-assert');
var helpers = require('yeoman-test');
var fs = require('fs');

describe('Creates step file without paramaters', () => {
  beforeAll(() => {
    return helpers.run(path.join(__dirname, '../generators/app'))
      .withPrompts({
        featurePath: path.resolve(__dirname, 'features/withoutArguments.feature')
      });
  });

  it('creates step file', () => {
    assert.file([
      'withoutArguments.steps.js'
    ]);
  });

  // it('creates step file equals to expected file', () => {
  //   const withoutArgumentsSteps = fs.readFileSync(
  //     path.resolve(__dirname, 'features/withoutArguments.steps.js'),
  //     'utf-8'
  //   );
  //   assert.fileContent('withoutArguments.steps.js', withoutArgumentsSteps);
  // });
});

describe('Creates step file with paramaters', () => {
  beforeAll(() => {
    return helpers.run(path.join(__dirname, '../generators/app'))
      .withPrompts({
        featurePath: path.resolve(__dirname, 'features/withArguments.feature')
      });
  });

  it('creates step file', () => {
    assert.file([
      'withArguments.steps.js'
    ]);
  });

  // it('creates step file equals to expected file', () => {
  //   const withArgumentsSteps = fs.readFileSync(
  //     path.resolve(__dirname, 'features/withArguments.steps.js'),
  //     'utf-8'
  //   );
  //   assert.fileContent('withArguments.steps.js', withArgumentsSteps);
  // });
});
