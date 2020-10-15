// Q1
// input: array, output: remove all els * 3
console.log('Q1');

let q1 = [1, 2, 3];
function removeAllElements(arr) {
  while (arr.length) {
    arr.pop();
  }
  return arr;
}
console.log(removeAllElements(q1));

// q1.length = 0;
// q1.splice(0, q1.length);

// Q5
console.log('Q5');

let isColor = color => ['blue', 'green'].includes(color);
console.log(`let isColor = color => ['blue', 'green'].includes(color);`)
