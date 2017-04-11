const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');
const ejs = require('ejs');
const fs = require('fs');
const path = require('path');
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
        message: 'Specify the path to the target .feature file (test.feature || path/to/test.feature):',
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

    const featureFile = fs.readFileSync(featurePath, 'utf-8');

    this.fs.copyTpl(
      this.templatePath('bootstrap.js'),
      this.destinationPath(`${stepsPath}/1.js`),
      {
        steps: this.parseFeature(featureFile).join('\n')
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
      const stepTemplate = fs.readFileSync(
        path.resolve(__dirname, 'templates/step.js'),
        'utf-8'
      );
      children.map(child => {
        const {type, steps} = child;
        if (type === 'Scenario' || type === 'ScenarioOutline') {
          parsedFeature = parsedFeature.concat(this.parseSteps(steps, stepTemplate, language));
        }
      });
      return parsedFeature;
    }
  }

  parseSteps(steps, template, language) {
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
              options = Object.assign(options, {
                keyword: key.charAt(0).toUpperCase() + key.slice(1, key.length),
                regexp: stepData.regexp,
                parameters: stepData.parameters
              });
            }
          }
        });
        parsedSteps = parsedSteps.concat(ejs.render(template, options));
      });
      return parsedSteps;
    }
  }

  parseStepString(stepString) {
    if (stepString) {
      let stepData = {
        parameters: []
      };
      const paramRegexp = /(["'])(?:(?=(\\?))\2.)*?\1/g;
      if (paramRegexp.test(stepString)) {
        let i = 1;
        stepData = Object.assign(stepData, {
          regexp: `${stepString.replace(paramRegexp, '"(.*)"')}`
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
