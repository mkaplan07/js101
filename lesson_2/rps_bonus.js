let rs = require('readline-sync');

const WINNERS = {
  rock: ['scissors', 'lizard'],
  paper: ['rock', 'spock'],
  scissors: ['paper', 'lizard'],
  lizard: ['paper', 'spock'],
  spock: ['rock', 'scissors']
};
const KEYS = Object.keys(WINNERS);
const SHORTHAND = ['r', 'p', 'sc', 'l', 'sp'];

// side-effect: reads
// AND returns
function getUserInput(msg) {
  let input = rs.question(msg).toLowerCase();
  if (!KEYS.includes(input) && !SHORTHAND.includes(input)) {
    input = getUserInput(`=> r, p, sc, l or sp pls:\n`);
  }
  if (SHORTHAND.includes(input)) {
    input = KEYS[SHORTHAND.indexOf(input)]; // for playGame()
  }
  return input;
}

// side-effect: calls fn that reads
// AND returns
function gameSetup() {
  let choices = {};
  choices.user = getUserInput(`Choose one: ${KEYS.join(', ')}\n`);
  choices.comp = KEYS[Math.floor(Math.random() * KEYS.length)];
  return choices;
}

// returns
function playGame(choices) {
  if (choices.user === choices.comp) {
    return 'tie';
  } else if (WINNERS[choices.user].includes(choices.comp)) {
    return 'user';
  } else {
    return 'computer';
  }
}

let userScore = 0;
let compScore = 0;

// side-effect: re-assigns non-local (scores)
function updateScores(result) {
  if (result === 'user') {
    userScore += 1;
  } else if (result === 'computer') {
    compScore += 1;
  }
}

// side-effects: calls fn that re-assigns non-local (scores) & prints
function displayResult(choices) {
  let result = playGame(choices);
  updateScores(result);
  let battle = `User: ${choices.user}, computer: ${choices.comp}.`;

  if (result === 'tie') {
    console.log(`${battle} It's a tie!`);
  } else if (result === 'user') {
    console.log(`${battle} User wins! User ${userScore}, computer ${compScore}.`);
  } else {
    console.log(`${battle} Computer wins! User ${userScore}, computer ${compScore}.`);
  }
}

// side-effects: reads, calls fn w/ side-effects, prints
function more(msg) {
  let input = rs.question(msg).toLowerCase();
  if (input === 'y' || input === 'yes') {
    // console.clear()
    runRPS();
  } else if (input === 'n' || input === 'no') {
    console.log('Goodbye.');
  } else {
    input = more('=> y or n, pls:\n');
  }
}

// side-effects: calls 3 fns w/ side-effects & prints
function runRPS() {
  let choices = gameSetup();
  displayResult(choices);
  if (userScore > 1 || compScore > 1) {
    let champ = userScore > 1 ? 'User' : 'Computer';
    console.log(`${champ} takes 2 of 3!`);
  } else {
    more('Play again? y or n:\n');
  }
}

console.log('Welcome to RPS. First to 2 wins.');
runRPS();
