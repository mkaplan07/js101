// input: loan amount (lam), APR (to mint), duration (to months)
// let mpay = lam * (mint / (1 - Math.pow((1 + mint), (-dur))));

// conversions: APR to monthly interest, duration to months

// output: mpay, formatted $375.00

// non-numeric inputs
// edge cases: no-interest loans, non-integer durations like 3.5 years --> 42m

let rs = require('readline-sync');

function get(msg, neg) {
  let val = rs.questionFloat(msg, {limitMessage: 'Try again...'});
  // .questionFloat() rejects Number.isNaN(parseFloat(x)), incl. x.trim() === ''

  while (negativo(val)) {
    val = get(neg);
  }
  return val;
}

function negativo(num) {
  // return Number(num) < 0 ||
  //        num.trim() === '' ||
  //        Number.isNaN(Number(num));
  return num < 0;
}

function prince(msg) {
  return get(msg, 'Enter something > 0\n');
}

function minter(msg) {
  let neg = 'Be positive, or zero.\n';
  let int = get(msg, neg);

  let ans = rs.question(`${int} is your APR? y/n\n`).slice(0).toLowerCase();
  while (ans !== 'y' && ans !== 'n') {
    // .slice(0) for ''
    ans = rs.question(`y or n\n`).slice(0).toLowerCase();
  }

  if (ans === 'n') {
    int = get('Pls enter your APR.\n', neg);
  }
  return int / 100 / 12; // 6% --> 0.06 --> 0.005
}

function munts(msg) {
  let neg = 'More than 0, pls.\n';
  let term = get(msg, neg);

  let ans = rs.question(`${Math.round(term)} months? y/n\n`).slice(0).toLowerCase();
  while (ans !== 'y' && ans !== 'n') {
    ans = rs.question(`y or n\n`).slice(0).toLowerCase();
  }

  if (ans === 'n') {
    term = get('Pls enter the # of months.\n', neg);
  }
  return Math.round(term);
}

function calc() {
  let lam = prince('Enter a loan amount:\n');
  let mint = minter('Enter your interest rate:\n');
  let dur = munts('Enter the term of your loan:\n'); // ensure it's monthly

  let mpay;
  if (mint === 0) {
    mpay = lam / dur; // mint div 0 is 0/0, which is NaN
  } else {
    mpay = lam * (mint / (1 - Math.pow((1 + mint), (-dur))));
  }

  console.log(`Loan amt: $${lam}, interest rate: ${mint * 12 * 100}%, term ${dur} months...`);
  console.log('Your monthly payment is', '$' + mpay.toFixed(2));
  more();
}

function more() {
  let ans = rs.question('Calc again? y/n\n').slice(0).toLowerCase();
  if (ans === 'y' || ans === '') {
    calc();
  } else {
    console.log('Goodbye.');
  }
}

calc();
