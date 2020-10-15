// inputs: user rs.question, computer arr[Math.floor(Math.random() * 3)]
// output: tie or winner
// 1) compare inputs for tie
// 2) (comp idx > user idx) comp, else user

let rs = require('readline-sync');

const USER_CHOICES = ['rock', 'paper', 'scissors'];
const COMP_CHOICES = ['paper', 'scissors', 'rock'];

function getUserInput(msg) {
  let input = rs.question(msg).toLowerCase();
  if (!USER_CHOICES.includes(input)) {
    input = getUserInput('=> rock, paper, or scissors, pls:\n');
  }
  return input;
}

let userScore = 0;
let compScore = 0;

function compareChoices() {
  let user = getUserInput(`Choose one: ${USER_CHOICES.join(', ')}\n`);
  let comp = COMP_CHOICES[Math.floor(Math.random() * COMP_CHOICES.length)];
  let choices = `User: ${user}, computer: ${comp}.`;

  if (user === comp) {
    console.log(`${choices} It's a tie!`);
  } else if (COMP_CHOICES.indexOf(comp) === USER_CHOICES.indexOf(user)) {
    compScore += 1;
    console.log(`${choices} Computer wins! User ${userScore}, computer ${compScore}.`);
  } else {
    userScore += 1;
    console.log(`${choices} User wins! User ${userScore}, computer ${compScore}.`);
  }
}

function more(msg) {
  let input = rs.question(msg).toLowerCase();
  if (input === 'y' || input === 'yes') {
    // console.clear();
    runRPS();
  } else if (input === 'n' || input === 'no') {
    console.log('Goodbye.');
  } else {
    input = more('=> y or n, pls:\n');
  }
}

function runRPS() {
  compareChoices();
  if (userScore < 2 && compScore < 2) {
    more('Play again? y or n:\n');
  } else {
    let champ = (userScore === 2) ? 'User' : 'Computer';
    console.log(`${champ} takes 2 of 3.`);
  }
}

console.log('Welcome to RPS. First to 2 wins.');
runRPS();
