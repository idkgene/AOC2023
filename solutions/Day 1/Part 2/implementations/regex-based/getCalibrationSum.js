const fs = require('fs')

function getCalibrationSum(input) {
  // This gives 2 more than the actual answer
  // Adding a capture group and (?=...) in here doesn't seem to help
  // Screw you Regex!
  const numberPattern = /\d|one|two|three|four|five|six|seven|eight|nine/g
  const wordToDigit = {
    one: '1',
    two: '2',
    three: '3',
    four: '4',
    five: '5',
    six: '6',
    seven: '7',
    eight: '8',
    nine: '9',
  }

  return input
    .split('\n')
    .map((line) => {
      // Regex is definitely overkill here (?)
      // Screw you Regex!
      const matches = Array.from(line.matchAll(numberPattern))
      if (!matches.length) return 0

      let first = matches[0][0]
      let last = matches[matches.length - 1][0]

      first = wordToDigit[first] || first
      last = wordToDigit[last] || last

      return parseInt(first + last)
    })
    .reduce((sum, num) => sum + num, 0)
}

module.exports = getCalibrationSum
