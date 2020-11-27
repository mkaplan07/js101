// https://www.888casino.com/blog/how-to-play-soft-17-in-blackjack
let rs = require('readline-sync');

const CARDS = [2, 3, 4, 5, 6, 7, 8, 9, 10, 'J', 'Q', 'K', 'A'];
let deck = {};

// Side effects: mutates non-local obj (deck)
function shuffle() {
  for (let idx = 0; idx < CARDS.length; idx += 1) {
    deck[CARDS[idx]] = 4;
  }
}

// Side effects: mutates non-local obj (deck)
// RETURNS
function genCard() {
  while (true) {
    let card = CARDS[Math.floor(Math.random() * CARDS.length)];
    if (deck[card] > 0) {
      deck[card] -= 1;
      return card;
    }
  }
}

// Side effects: reads
// RETURNS
function hitOrStay(msg) {
  let answer = rs.question(msg);
  while (!answer || !'HhSs'.includes(answer[0])) {
    answer = rs.question('hit or stay, pls.\n');
  }
  return answer[0].toLowerCase();
}

// Side effects: reads
// RETURNS
function playAgain(msg) {
  let answer = rs.question(msg);
  while (!answer || !'YyNn'.includes(answer[0])) {
    answer = rs.question('y or n, pls.\n');
  }
  return answer[0].toLowerCase();
}

// Side effects: mutates non-local obj (side.aces & .total)
function checkAces(side) {
  while (side.total > 21) {
    if (!side.aces) break;

    side.aces -= 1;
    side.total -= 10;
  }
}

// Side effects: calls fn w/ side effects (checkAces)
// RETURNS
function isBust(side) {
  if (side.total > 21) {
    checkAces(side);
  }

  return side.total > 21;
}

// Side effects: none
// RETURNS
function hard17(dealer) {
  let test = Object.assign({}, dealer);
  test.total += 5;

  return isBust(test);
}

// Side effects: mutates non-local obj (side.aces, .hand & .total), calls fn w/ side effects (genCard)
function deal(side) {
  let card = genCard();
  side.hand.push(card);
  if (Number(card)) {
    side.total += card;
  } else if ('JQK'.includes(card)) {
    side.total += 10;
  } else {
    side.aces += 1;
    side.total += 11;
  }
}

// Side effects: prints, calls fns w/ side effects (isBust, hitOrStay, deal)
function playHand(side) {
  while (true) {
    if (isBust(side)) break;

    console.log(`${side.name}'s hand: ${side.hand}`);
    console.log(`total: ${side.total}`);

    if (side.name === 'player' &&
      hitOrStay('=> hit or stay?\n') === 's') {
      console.log(`♣  ♦  ♥  ♠ ${side.name} stays at ${side.total}`);
      break;
    }

    if (side.name === 'dealer' &&
    (side.total > 17 || hard17(side))) {
      console.log(`♣  ♦  ♥  ♠ ${side.name} stays at ${side.total}`);
      break;
    }

    deal(side);
    console.log(`card: ${side.hand.slice(-1)}`);
  }
}

// Side effects: calls fn w/ side effects (playHand)
// RETURNS
function getWinner(player, dealer) {
  playHand(player);
  if (player.total > 21) {
    return `BUST AT ${player.total}!`;
  }

  playHand(dealer);
  if (dealer.total > 21) {
    return `DEALER BUSTS AT ${dealer.total}!`;
  }

  if (player.total > dealer.total) {
    return 'PLAYER WINS!';
  } else if (dealer.total > player.total) {
    return 'HOUSE WINS!';
  } else {
    return 'PUSH';
  }
}

// Side effects: prints, calls fns w/ side effects (shuffle, deal, getWinner, playAgain)
function play21() {
  let scores = { player: 0, house: 0 };
  while (true) {
    console.clear();
    let player = { name: 'player', aces: 0, hand: [], total: 0 };
    let dealer = { name: 'dealer', aces: 0, hand: [], total: 0 };

    shuffle();
    for (let idx = 0; idx < 2; idx += 1) {
      deal(player);
      deal(dealer);
    }

    console.log('dealer\'s "up" card:', dealer.hand[1]);

    let winner = getWinner(player, dealer);
    console.log(winner);

    if (['DEALER', 'PLAYER'].includes(winner.split(' ')[0])) {
      scores.player += 1;
    } else if (['BUST', 'HOUSE'].includes(winner.split(' ')[0])) {
      scores.house += 1;
    }

    console.log(`player ${scores.player}, house ${scores.house}`);
    if (playAgain('=> play again? y/n\n') === 'n') break;
  }
  console.log('Goodbye.');
}

play21();
