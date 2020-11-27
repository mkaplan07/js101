let rs = require('readline-sync');

const EMPTY = ' ';
const USER = 'X';
const BOT = 'O';
let board = {}; // board object

// Side effects: mutates non-local obj
function setBoard() {
  for (let idx = 1; idx <= 9; idx += 1) {
    board[idx] = EMPTY;
  }
}

// Side effects: prints
function displayBoard(scores) {
  console.clear();

  console.log(`User "${USER}" ${scores.user} vs. Bot "${BOT}" ${scores.bot}`);

  console.log('');
  console.log('1    |2    |3    ');
  console.log(`  ${board[1]}  |  ${board[2]}  |  ${board[3]}  `);
  console.log('     |     |     ');
  console.log('-----+-----+-----');
  console.log('4    |5    |6    ');
  console.log(`  ${board[4]}  |  ${board[5]}  |  ${board[6]}  `);
  console.log('     |     |     ');
  console.log('-----+-----+-----');
  console.log('7    |8    |9    ');
  console.log(`  ${board[7]}  |  ${board[8]}  |  ${board[9]}  `);
  console.log('     |     |     ');
  console.log('');
}

// Side effects: none
// RETURNS
function findEmpty() {
  return Object.keys(board).filter(key => board[key] === EMPTY);
}

// Side effects: none
// RETURNS
function joinOr(arr, sep = ',', endOr = 'or') {
  if (arr.length < 2) {
    return arr.join();
  } else if (arr.length === 2) {
    return arr.join(` ${endOr} `); // if user starts, this never happens
  } else {
    let main = arr.slice(0, arr.length - 1);
    let last = arr.slice(-1);
    return main.join(`${sep} `) + ` ${endOr} ${last}`;
  }
}

// Side effects: mutates non-local obj, reads
function getUser(msg) {
  let em = findEmpty();
  let choice = rs.question(msg);

  // reject '', ' ', alphas, non 1-9 & 'X'/'O'
  while (!em.includes(choice)) {
    choice = rs.question(`Choose an empty square:\n${joinOr(em)}\n`);
  }

  board[choice] = USER;
}

const WINNERS = [[1, 2, 3], [4, 5, 6], [7, 8, 9],
                  [1, 4, 7], [2, 5, 8], [3, 6, 9],
                    [1, 5, 9], [3, 5, 7]];

// Side effects: none
// RETURNS
function chooseWisely(tgt) {
  for (let idx = 0; idx < WINNERS.length; idx += 1) {
    if ((WINNERS[idx].filter(sq => board[sq] === tgt).length === 2) &&
        (WINNERS[idx].filter(sq => board[sq] === EMPTY).length === 1)) {
      return WINNERS[idx].filter(sq => board[sq] === ' ')[0];
    }
  }
  return false;
}

// Side effects: mutates non-local obj
function getBot() {
  if (chooseWisely(BOT)) {
    board[chooseWisely(BOT)] = BOT;
  } else if (chooseWisely(USER)) {
    board[chooseWisely(USER)] = BOT;
  } else if (board[5] === EMPTY) {
    board[5] = BOT;
  } else {
    let em = findEmpty();
    let choice = em[Math.floor(Math.random() * em.length)];
    board[choice] = BOT;
  }
}

// Side effects: none
// RETURNS
function isWinner() {
  // if two winners, for example 789 & 147, returns 789
  for (let idx = 0; idx < WINNERS.length; idx += 1) {
    if (WINNERS[idx].every(sq => board[sq] === USER)) {
      return `User wins! ${WINNERS[idx].join(', ')}`;
    } else if (WINNERS[idx].every(sq => board[sq] === BOT)) {
      return `Bot wins! ${WINNERS[idx].join(', ')}`;
    }
  }
  return false;
}

// Side effects: none
// RETURNS
function isFull() {
  return !findEmpty().length ? 'The board is full.' : false;
}

// Side effects: none
// RETURNS
function endGame() {
  return (isWinner() || isFull());
}

// Side effects: reads
// RETURNS
function getFirst(msg) {
  let first = rs.question(msg).slice(0, 1);
  while (!first || !'UuBb'.includes(first)) {
    first = rs.question('user or bot, pls.\n').slice(0, 1);
  }
  return first.toLowerCase();
}

// Side effects: reads
// RETURNS
function playAgain(msg) {
  let answer = rs.question(msg);
  while (!answer || !'YyNn'.includes(answer)) {
    answer = rs.question('Y or N, pls.\n');
  }
  return answer.toLowerCase();
}

// Side effects: calls fns w/ side effects (set, display, getUser, getBot)
// RETURNS
function play(scores, first) {
  setBoard();
  let currentPlayer = (first === 'u');
  while (true) {
    displayBoard(scores);
    currentPlayer ? getUser('Which square?\n') : getBot();
    currentPlayer = !currentPlayer;
    if (endGame()) break;
  }
  return endGame();
}

// Side effects: prints, calls fns w/ side effects (getFirst, play, display, playAgain)
function ticTacToe() {
  console.clear();
  let scores = { user: 0, bot: 0 };
  while (true) {
    let first = getFirst('Who\'s first, user or bot?\n');
    let result = play(scores, first);
    let winner = result.split(' ')[0];
    if (winner === 'User') {
      scores.user += 1;
    } else if (winner === 'Bot') {
      scores.bot += 1;
    }
    displayBoard(scores);
    console.log(result);

    if (scores.user === 2 || scores.bot === 2) {
      console.log(`2 of 3 to ${winner}!`);
      playAgain('Another match?\n') === 'y' ? ticTacToe() : console.log('Goodbye.');
      break;
    } else if (playAgain('Play again? y or n\n') === 'n') {
      console.log('Goodbye.');
      break;
    }
  }
}

ticTacToe();

/*
if (playAgain('Another match?\n') === 'y') {
  ticTacToe();
  break; // *
} else {
  console.log('Goodbye.');
  break;
}
* w/o this break, if I 'y' another match then try to leave, the program
logs "Goodbye." then restarts the loop. The 1st time thru,
answering 'y' to "Another match?" doesn't break.
It's the call stack.
*/
