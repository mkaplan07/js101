// Q1
// input: str, output: log str 5 times, indented i spaces
console.log('Q1');

function printWithIndents(str) {
  for (let i = 0; i < 5; i += 1) {
    console.log(' '.repeat(i) + str);
  }
}

console.log(printWithIndents('The Flintstones Rock!'));

// Q2
// input: str, output: new str w/ cases reversed
console.log('Q2');

let munstersDescription = "The Munsters are creepy and spooky.";

let newDescription = munstersDescription.split('').map(el => {
  if (el === el.toUpperCase()) {
    return el.toLowerCase();
  } else {
    return el.toUpperCase();
  }
}).join('');
console.log('using map:', newDescription);

function caseSwap(str) {
  let arr = str.split('');
  arr.forEach((el, idx, arr) => {
    if (el === el.toUpperCase()) {
      arr[idx] = el.toLowerCase();
    } else {
      arr[idx] = el.toUpperCase();
    }
  });
  return arr.join('');
}
console.log('using forEach:', caseSwap(munstersDescription));

// Q3
console.log('Q3');

function findFactors(num) {
  let divisor = num;
  let factors = [];

  while (divisor > 0) {
    if (num % divisor === 0) {
      factors.push(divisor);
    }
    divisor -= 1;
  }
  return factors;
}

console.log('6:', findFactors(6));
console.log('0:', findFactors(0));

// Q8
console.log('Q8');

let munsters = {
  Herman: { age: 32, gender: 'male' },
  Lily: { age: 30, gender: 'female' }
}

function updateVals(obj) {
  Object.values(obj).forEach(val => {
    val.age += 10;
    val.gender = 'other';
  });
}

function updateKeys(obj) {
  Object.keys(obj).forEach(k => obj[k] = 'muensters.');
}

console.log('munsters:', munsters.Herman, munsters.Lily);
updateVals(munsters);
console.log('change vals:', munsters.Herman, munsters.Lily);
updateKeys(munsters);
console.log('change keys:', munsters.Herman, munsters.Lily);
