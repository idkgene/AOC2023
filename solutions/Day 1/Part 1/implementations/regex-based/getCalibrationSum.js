/*
Calibration Sum Calculator (Regex-based Implementation)

Uses regular expressions and functional programming approach.
*/
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

module.exports = getCalibrationSum
