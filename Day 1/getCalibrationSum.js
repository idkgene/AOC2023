function getCalibrationSum(input) {
  return input
    .split('\n')
    .map((line) => {
      // Regex is definitely overkill here (?)
      // Screw you Regex!
      const digits = line.match(/\d/g)
      if (!digits) return 0
      // Multiple string operations?
      return parseInt(digits[0] + digits[digits.length - 1])
    })
    .reduce((sum, num) => sum + num, 0)
}

const input = `1abc2
pqr3stu8vwx
a1b2c3d4e5f
treb7uchet`;

console.log(getCalibrationSum(input)); // 142
