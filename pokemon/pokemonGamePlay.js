const inquirer = require('inquirer');
const { Trainer, Charmander, Squirtle, Bulbasaur, Rattata, Battle } = require('./pokemon');

const playerTrainer= new Trainer();
let playerTrainerName='';
const allPokemon = [new Charmander(), new Squirtle(), new Bulbasaur(), new Rattata()]
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
    message: 'Which starting pokemon do you choose?',
    choices: ['Chamander', 'Squirtle', 'Bulbasaur'],
  }
];

const secondQuestions = [
  {
    message:"What do You Want to Do?",
    type: "list",
    name:"question",
    choices:["Add a Trainer","Fight a selected Pokemon","Fight a random Random Pokemon", "Show All Pokemon", "Level Up!", "Attack!", "Quit"]
}
];

function playGame() {
  inquirer
    .prompt(firstQuestions)
    .then((firstAnswers) => {
      playerTrainerName = firstAnswers.name
      console.log(`Welcome ${playerTrainerName} to a Pokemon battler!`)
      if (firstAnswers.pokemon==='Chamander') playerTrainer.catch(new Charmander())
      if (firstAnswers.pokemon==='Squirtle') playerTrainer.catch(new Squirtle())
      if (firstAnswers.pokemon==='Bulbasaur') playerTrainer.catch(new Bulbasaur())

      return inquirer.prompt(secondQuestions);
    })

    .then (answers => {
      menuFunc(answers.question)})
        
}

function menuFunc(answers) {
  switch (answers) {
    case "Fight a selected Pokemon":
        selectPokemon();
        break
      default:
        console.log('Thanks for playing!');
      }
};

function selectPokemon (){
  const playersBelt = playerTrainer.belt.map((pokeball)=>  pokeball.inside)
  inquirer
    .prompt([{
              message:"Which Pokemon do you want to fight?",
            type: "list",
            name:"oppPokemon",
            choices:['Charmander', 'Bulbasaur', 'Squirtle', 'Rattata']
            },
            {
              message:"Choose a pokemon from your belt",
            type: "list",
            name:"yourPokemon",
            choices:playersBelt
            } ]
            )
    .then((answers)=> {
      if (answers.yourPokemon === '...empty'){
        console.log("You cannot select an empty PokeBall")
        return selectPokemon ()
      }
      const yourPokemon= allPokemon.filter((pokemon)=> pokemon.name === answers.yourPokemon)[0];
      const oppPokemon =  allPokemon.filter((pokemon)=> pokemon.name === answers.oppPokemon)[0];
      const newBattle = new Battle(playerTrainerName, yourPokemon, oppPokemon.name, oppPokemon)
       battle(newBattle)
    });
};

function battle (newBattle){


  if (newBattle.hasBattleEnded) {
    return inquirer.prompt(secondQuestions)
        .then (answers => {
          menuFunc(answers.question)});
  }


    inquirer
      .prompt({
        message:"What is your move",
      type: "list",
      name:"move",
      choices:['Attack', 'Run away']
      })
      .then(({move}) => {
              if (move === 'Attack') {
                newBattle.fight();
                newBattle.fight();
                console.log(`${newBattle.pokemon1.name} has ${newBattle.pokemon1.hitPoints} hitpoints left`)
                battle(newBattle)
              } else {
                console.log('You ran away!')
                return inquirer.prompt(secondQuestions)
                        .then (answers => {
                          menuFunc(answers.question)});
              }
          })
}

playGame();

// while (newBattle.hasBattleEnded === false){
//   //blah blah blah
// }
// menuFunc()