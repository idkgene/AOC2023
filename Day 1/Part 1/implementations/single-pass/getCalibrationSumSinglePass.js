const fs = require('fs')

function getCalibrationSumSinglePass(input) {
  let sum = 0
  let start = 0
  let end = input.length

  while (start < end) {
    let lineStart = start
    while (input[start] !== '\n' && start < end) start++

    let first = null
    let last = null

    for (let i = lineStart; i < start; i++) {
      const char = input[i]
      if (char >= '0' && char <= '9') {
        first = char
        break
      }
    }

    for (let i = start - 1; i >= lineStart; i--) {
      const char = input[i]
      if (char >= '0' && char <= '9') {
        last = char
        break
      }
    }

    if (first !== null) {
      sum += (first.charCodeAt(0) - 48) * 10 + (last.charCodeAt(0) - 48)
    }

    start++
  }

  return sum
}

const input = fs.readFileSync('../../input/calibration-data.txt', 'utf8')
console.log(getCalibrationSumSinglePass(input))
