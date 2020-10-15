// Q4
// input: str, output: t/f
// str.split('.'), if len !== 4, return false
// for each el, if !numCheck(el), return false
// numChecks !el.trim(), Number.isNaN(Number(el)), between 0 & 255 (incl.)
console.log('Q4');

let tests = ['0.11.12.255', '10.11.12', '10.11.12.13.14', '10.-1.12.13', '10.11.12.256',
  '10.ab.12.13', '10.11a.12.13', '10..12.13', '10. .12.13'];

// function elCheck(el) {
//   if (!el.trim() || Number.isNaN(Number(el))) {
//     return false;
//   }
//   return Number(el) >= 0 && Number(el) <= 255;
// }

function elCheck(el) {
  if (/^\d+$/.test(el)) {
    return Number(el) >= 0 && Number(el) <= 255;
  }
  return false;
}

function isIPAddress(str) {
  let ipElements = str.split('.');
  console.log(ipElements);
  if (ipElements.length !== 4) {
    return false;
  }

  for (let i = 0; i < ipElements.length; i += 1) {
    if (!elCheck(ipElements[i])) {
      return false;
    }
  }
  return true;
}

tests.forEach(el => console.log(isIPAddress(el)));
