function getCalibrationSumIterative(input) {
  let sum = 0;
  const lines = input.split("\n"); // Creating an array still? Ehh

  for (const line of lines) {
    let first = null;
    let last = null;

    for (let i = 0; i < line.length; i++) {
      if (line[i] >= '0' && line[i] <= '9') {
        if (first === null) first = line[i];
        last = line[i];
      }
    }

    if (first !== null) {
      sum += parseInt(first + last);
    }
  }

  return sum;
}

const input = `1abc2
pqr3stu8vwx
a1b2c3d4e5f
treb7uchet`;

console.log(getCalibrationSumIterative(input)); // 142
