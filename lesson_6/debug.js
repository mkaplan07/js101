/*
let counter = 1;

while (counter <= 5) {
  console.log(counter);
  counter += 1;
}
*/

/*
function adder(num1, num2) {
  return num1 + num2;
}

let a = 1;
let b = 2;

let sum = adder(a, b);
*/

function square(num) {
  return num * num;
}

let myArr = [1, 2, 3, 4, 5];
let squares = myArr.map(num => square(num));
console.log(squares);


// https://github.com/anseki/readline-sync#basic_options
/*
let rs = require('readline-sync');

function getInt(msg) {
  let int = rs.questionInt(msg,
    {limitMessage: 'Integer, pls.'});
  console.log(int, typeof int);
  return int;
}
getInt('Enter number:\n');
*/
