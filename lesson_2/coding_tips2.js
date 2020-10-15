let rs = require('readline-sync');

console.log('Enter your name');
let name = rs.question();

while (name === '') {
  console.log('Try again...');
  name = rs.question();
}

console.log(`Hi, ${name}!`);
