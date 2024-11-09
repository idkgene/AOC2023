const fs = require('fs')

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

const input = fs.readFileSync('../../input/calibration-data.txt', 'utf8')
console.log(getCalibrationSum(input))
