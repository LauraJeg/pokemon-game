const inquirer = require('inquirer');

const firstQuestions = [
  {
    type: 'input',
    name: 'name',
    message: 'What is your name?',
    default: 'Ash',
  },
  {
    type: 'list',
    name: 'pokemon',
    message: 'Which pokemon do you choose?',
    choices: ['Pikachu', 'Magikarp'],
  },
  // etc...
];

const secondQuestions = [
  //... see examples to how to format questions
];

function playGame() {
  inquirer
    .prompt(firstQuestions)
    .then(function (firstAnswers) {
      // do stuff with the answers to the firstQuestions, e.g. create trainers and catch pokemon
      console.log(firstAnswers);
      return inquirer.prompt(secondQuestions);
    })
    .then(function (secondAnswers) {
      // do stuff with the answers to the secondQuestions, e.g. choose moves to use / fight / run away / select pokemon to fight with
    });
}

playGame();