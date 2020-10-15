// Q2
console.log('Q2');

let numbers = [1, 2, 3];
let numbersCopy = [...numbers].sort((a, b) => b - a);

console.log('numbersCopy:', numbersCopy);
console.log('copyReverse:', copyReverse(numbers));
console.log('numbers:', numbers);

// other options: numbers.slice(), numbers.concat(), Object.assign([], numbers)

function copyReverse(arr) {
  let copy = [];
  arr.forEach(el => copy.unshift(el));
  return copy;
}

// Q4
console.log('Q4');

let famousWords = 'seven years ago...';
console.log('Four score and '.concat(famousWords));

let firstWords = 'Four score and ';
console.log(famousWords.padStart(firstWords.length + famousWords.length, firstWords));

// Q6
// output: return a flattened array
console.log('Q6');

let flintstones = ["Fred", "Wilma", ["Barney", "Betty"], ["Bambam", "Pebbles"]];

let flatstones = flintstones.reduce((acc, el) => acc.concat(el), []);
console.log('flatstones:', flatstones);
console.log('flintstones:', flintstones);

// let flatstones = [].concat(...flintstones); --> FYI, only flattens 1 level

// Q7
console.log('Q7');

let stones = { Fred: 0, Wilma: 1, Barney: 2, Betty: 3, Bambam: 4, Pebbles: 5 };
console.log(Object.entries(stones).filter(pair => pair[0] === 'Barney').shift());

// Object.entries(stones).filter() looks for the 'Barney' pair
// as .filter() returns an array, we get a nested array: [['Barney', 2]]
// hence .shift()

// Q9
console.log('Q9');

let str = 'Harbinger of Haggis';
let padding = Math.floor((40 - str.length) / 2);

function centerTitle(title) {
  return title.padStart(padding + title.length);
  // padStart has an optional 2nd argument, padString. ' ' is the default.
}
console.log(centerTitle(str));

// Q10
// output: # of 't's
console.log('Q10');

let statement1 = "The Flintstones Rock!";
let statement2 = "Easy come, easy go.";

function findChar(str) {
  return str.split('').filter(char => char === 't').length;
}
console.log('statement1:', findChar(statement1));
console.log('statement2:', findChar(statement2));
// can't use statement2.match(/t/g).length because null has no length
