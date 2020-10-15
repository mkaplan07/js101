// rs = require('readline-sync')
// Ask for Number(num) * 2
// Ask for the operation --> switch (op), case '+': return a + b
// console.log(function());

let rs = require('readline-sync'); // require() searches the node_modules folder
let msg = require('./calculator_msg.json'); // loads the configuration file as an object

function langer(text) {
  let lang = rs.question(text);
  msg = (lang === 'fr') ? msg.fr : msg.en;
}

function numbo(text) {
  let num = rs.question(text);
  // rs.question(), keepWhitespace false by default
  while (!num || Number.isNaN(Number(num))) {
    // checks for '' || NaN – any non-numeric str
    // Number('') evals to 0, Number('non-numeric') NaN

    num = rs.question(msg['invalid num']);
  }
  return Number(num); // for concatenation '+'
}

let reqs = ['+', '-', '*', '/'];
function opper(text) {
  let op = rs.question(text);
  while (reqs.indexOf(op) === -1) { // W-t:Refactoring uses !includes
    op = rs.question(msg['invalid op']);
  }
  return op;
}

function switcher(op, a, b) {
  switch (op) {
    case '+': return a + b;
    case '-': return a - b;
    case '*': return a * b;
    case '/': return a / b;
    default: return 'is this necessary?';
  }
}

function more(text) {
  let ans = rs.question(text);
  let y = ans[0].toLowerCase();
  return y === msg.y ? mather() : console.log('goodbye');
}

function mather() {
  let a = numbo(msg.num1);
  let b = numbo(msg.num2);
  let op = opper(msg.op);
  console.log(switcher(op, a, b));
  more(msg.more);
}
langer(msg.lang); // only runs once
mather();

// function prompter(msg) {
//   console.log(`=> ${msg}`);
// }

// prompter('What\'s the first number?');
// let num1 = rs.question(); // query is optional
// console.log(num1);
