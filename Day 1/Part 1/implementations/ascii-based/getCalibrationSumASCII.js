const fs = require('fs')

function getCalibrationSumASCII(input) {
  let sum = 0
  let i = 0
  const len = input.length

  while (i < len) {
    let first = -1

    while (i < len && input.charCodeAt(i) !== 10) {
      // 10 is ASCII for '\n'
      const code = input.charCodeAt(i) - 48 // 48 is ASCII for '0'
      if (code >= 0 && code <= 9) {
        if (first === -1) first = code
        last = code
      }
      i++
    }

    if (first !== -1) {
      sum += first * 10 + last
    }

    i++
  }

  return sum
}

const input = fs.readFileSync('../../input/calibration-data.txt', 'utf8')
console.log(getCalibrationSumASCII(input))
