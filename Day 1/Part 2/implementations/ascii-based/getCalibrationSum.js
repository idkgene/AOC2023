function getCalibrationSum(input) {
  const numberMap = {
    one: 1,
    two: 2,
    three: 3,
    four: 4,
    five: 5,
    six: 6,
    seven: 7,
    eight: 8,
    nine: 9,
  }

  let sum = 0
  let i = 0
  const len = input.length

  while (i < len) {
    let first = -1
    let last = -1

    while (i < len && input.charCodeAt(i) !== 10) {
      const code = input.charCodeAt(i) - 48
      if (code >= 0 && code <= 9) {
        if (first === -1) first = code
        last = code
      } else {
        for (const [word, num] of Object.entries(numberMap)) {
          if (input.slice(i, i + word.length) === word) {
            if (first === -1) first = num
            last = num
          }
        }
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

module.exports = getCalibrationSum
