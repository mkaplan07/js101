// Q4
// input: munstersDescription, output: new str – all lowercase except str[0]
console.log('Q4');

let munstersDescription = 'the Munsters are CREEPY and Spooky.';

function changeCase(str) {
  str = str.toLowerCase();
  return str[0].toUpperCase() + str.slice(1);
}

console.log(changeCase(munstersDescription));
console.log(munstersDescription);

// Q6
console.log('Q6');

let ages = { Herman: 32, Lily: 30, Grandpa: 5843, Eddie: 10 };
Object.assign(ages, { Marilyn: 22, Spot: 237 });
console.log(ages);

// Q10
// output: new str – ends just before 'house'
console.log('Q10');

let advice = "Few things in life are as important as house training your pet dinosaur.";
console.log(advice.slice(0, advice.indexOf('house')));
console.log(advice);
