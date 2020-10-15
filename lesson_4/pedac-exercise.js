// input: row (integer > 1), output: sum of row's integers

// *  about   *
// sequence of consecutive, even numbers split into subarrays of lengths +1
// [[2], [4, 6], [8, 10, 12]]
// input: integer representing a row, RETURN the sum of that row's els
// 1) determine subarray[0], 2) populate subarray, 3) return sum

// *  questions *
// emptiness: => input 0 or negative?
// boundaries: "...the first row containing one integer..."
// repetition: n/a
// numbers: e/o – "even"; zero, negative (see 'boundaries')
// data type: => will input always be an integer? Yes.
// LOG or RETURN? return

// *  answers *
// *  data structure & algorithm  *
// 1) find subarray[0] (or the last el of previous sub):
//  if input === 4, let last = (3 + 2 + 1) * 2
// 2) populate subarray & 3) return sum:
//  while (i < input) { sum += (last += 2)}

function sumIntegers(row) {
  let elsSoFar = 0;
  for (let i = 1; i < row; i += 1) {
    elsSoFar += i;
  }

  let lastEl = elsSoFar * 2;
  let sum = 0;
  for (let j = 0; j < row; j += 1) {
    sum += (lastEl += 2);
  }

  return sum;
}

let tests = [4, 3, 2, 1, 0];
console.log('my solution:');
tests.forEach(el => console.log(sumIntegers(el)));

// more like the solution...
function sumIntegersSol(row) {
  let outer = [];
  let currentEl = 0;

  let i = 0;
  for (let i = 0; i < row; i += 1) {
    outer[i] = [];
    for (let j = row - (i + 1); j < row; j += 1) {
      outer[i].push(currentEl += 2);
    }
  }

  if (row) { // else TypeError – no outer[-1]
    return outer[row - 1].reduce((sum, el) => sum + el);
  } else {
    return 0;
  }
}
console.log('de los videos:');
tests.forEach(el => console.log(sumIntegersSol(el)));
