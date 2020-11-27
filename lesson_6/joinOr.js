// input: 1) array, 2) sep = ',', 3) endor = 'or'
// output: string --> ['ab', 'can', 'def'] // 'ab, can or def'

// if len < 2, return arr.join()
// if len === 2, return arr.join(` ${endor} `);
// if len > 2, return arr.join(`${sep} `) + ` ${endor} ${last}`)

function joinOr(arr, sep = ',', endOr = 'or') {
  if (arr.length < 2) {
    return arr.join();
  } else if (arr.length === 2) {
    return arr.join(` ${endOr} `);
  } else {
    let last = arr.pop();
    return arr.join(`${sep} `) + ` ${endOr} ${last}`;
  }
}

console.log(joinOr([])); // ''
console.log(joinOr(['ab'])); // 'ab'
console.log(joinOr(['ab', 'can'])); // 'ab or can'
console.log(joinOr(['ab', 'can'], ';')); // 'ab or can'
console.log(joinOr(['ab', 'can', 'def'], ';')); // 'ab; can or def'
console.log(joinOr(['ab', 'can'], undefined, 'and')); // 'ab and can'
console.log(joinOr(['ab', 'can', 'def'])); // 'ab, can or def'
