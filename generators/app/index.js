const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');
const fs = require('fs');
const Gherkin = require('gherkin');
const directory = require('gherkin/lib/gherkin/gherkin-languages');

module.exports = class extends Generator {
  prompting() {
    this.log(yosay(
      'Welcome to the doozie ' + chalk.red('generator-cucumber-steps') + ' generator!'
    ));

    const prompts = [
      {
        type: 'input',
        name: 'featurePath',
        message: 'Specify the path to the target .feature file (test.feature || path/to/test):',
        default: null,
        required: true
      },
      {
        type: 'input',
        name: 'stepsPath',
        message: 'Specify the path to the directory where the steps file will be created:',
        default: '.'
      }
    ];

    return this.prompt(prompts)
      .then(props => {
        this.props = props;
      });
  }

  writing() {
    const {featurePath, stepsPath} = this.props;

    if (!featurePath) {
      throw new Error('Features path must not be empty!');
    }

    const featureFile = fs.readFileSync(
      /\.feature$/.test(featurePath) ? featurePath : `${featurePath}.feature`,
      'utf-8'
    );
    const parsedFeature = this.parseFeature(featureFile);
    let featureName = featurePath.split('/');
    featureName = featureName[featureName.length - 1];
    featureName = /\.feature$/.test(featureName) ? featureName : `${featureName}.feature`;
    featureName = featureName.slice(0, featureName.indexOf('.'));

    this.fs.copyTpl(
      this.templatePath('bootstrap.js'),
      this.destinationPath(`${stepsPath}/${featureName}.steps.js`),
      {
        steps: parsedFeature
      }
    );
  }

  parseFeature(featureFile) {
    if (featureFile) {
      let parsedFeature = [];
      const parser = new Gherkin.Parser();
      const feature = parser.parse(featureFile).feature;
      const {
        language,
        children
      } = feature;

      children.map(child => {
        const {type, steps} = child;
        if (type === 'Scenario' || type === 'ScenarioOutline') {
          parsedFeature = parsedFeature.concat(
            this.parseSteps(steps, language)
          );
        }
      });

      return parsedFeature;
    }
  }

  parseSteps(steps, language) {
    if (steps) {
      let parsedSteps = [];
      const currentDictionary = directory[language];

      steps.map(step => {
        const {keyword, text} = step;
        let options = {
          keyword: null,
          regexp: null,
          parameters: []
        };

        let stepData = this.parseStepString(text);

        Object.keys(currentDictionary).map(key => {
          if (currentDictionary[key] instanceof Array) {
            if (currentDictionary[key].includes(keyword)) {
              const keyword = key === 'and' ? 'when' : key;
              options = Object.assign(options, {
                keyword: keyword.charAt(0).toUpperCase() + keyword.slice(1, keyword.length),
                regexp: stepData.regexp,
                parameters: stepData.parameters
              });
            }
          }
        });
        parsedSteps = parsedSteps.concat(options);
      });

      return parsedSteps;
    }
  }

  parseStepString(stepString) {
    if (stepString) {
      const paramRegexp = /"(.*?(\W*).*?)"/gm;
      let stepData = {
        parameters: []
      };

      if (paramRegexp.test(stepString)) {
        const stepRegexp = stepString.replace(paramRegexp, '"(.*)"');
        let i = 1;
        stepData = Object.assign(stepData, {
          regexp: stepRegexp
        });
        while (i <= stepString.match(paramRegexp).length) {
          stepData = Object.assign(stepData, {
            parameters: stepData.parameters.concat(`param${i}`)
          });
          i++;
        }
      } else {
        stepData = Object.assign(stepData, {
          regexp: `${stepString}`
        });
      }

      return stepData;
    }
  }
};
