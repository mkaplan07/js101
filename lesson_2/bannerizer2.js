// input: string, output: string in a box, max limit

let rs = require('readline-sync');

function getStr() {
  return rs.question('Enter a string:\n');
}

function getMax(msg, str) {
  let max = rs.question(msg);
  if (max === '') {
    max = str.length;
  } else if (Number.isNaN(Number(max)) || Number(max) < 1) {
    max = getMax('Please enter a positive integer.\n', str);
  }
  return parseInt(max, 10);
}

function wrapper(str, max) {
  let arr = [];
  for (let i = 0; i < str.length; i += max) {
    arr.push(str.slice(i, i + max));
  }

  if (arr[arr.length - 1].length < max) {
    arr[arr.length - 1] += ' '.repeat(max - arr[arr.length - 1].length);
  }

  let outer = `+-${'-'.repeat(max + 2)}-+`;
  let inner = `|${' '.repeat(max + 4)}|`;

  console.log(`${outer}\n${inner}`);
  arr.forEach(el => console.log(`|  ${el}  |`));
  console.log(`${inner}\n${outer}`);
}

function boxer() {
  let str = getStr();
  let max = getMax('What\'s your limit?\n', str);

  if (str.length > max) {
    return wrapper(str, max);
  } else {
    let outer = `+-${'-'.repeat(str.length + 2)}-+`;
    let inner = `|${' '.repeat(str.length + 4)}|`;
    str = `|  ${str}  |`;
    console.log(`${outer}\n${inner}\n${str}\n${inner}\n${outer}`);
  }
}

boxer();
