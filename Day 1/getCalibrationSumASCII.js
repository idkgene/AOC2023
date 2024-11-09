function getCalibrationSumASCII(input) {
  let sum = 0;
  let i = 0;
  const len = input.length;

  while (i < len) {
    let first = -1;
    let fast = -1;

    while (i < len && input.charCodeAt(i) !== 10) { // 10 is ASCII for '\n'
      const code = input.charCodeAt(i) - 48 // 48 is ASCII for '0'
        if (code >= 0 && code <= 9) {
          if (first === -1) first = code;
          last = code;
        }
        i++;
    }

    if (first !== -1) {
      sum += (first * 10 + last)
    }

     i++;
  }

  return sum
}

const input = `1abc2
pqr3stu8vwx
a1b2c3d4e5f
treb7uchet`;

console.log(getCalibrationSumASCII(input)); // 142
