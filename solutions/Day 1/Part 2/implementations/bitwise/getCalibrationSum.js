function getCalibrationSum(input) {
  const numbers = {
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

    while (i < len && input.charCodeAt(i) ^ 10) {
      const code = input.charCodeAt(i) - 48

      if ((code & 0xf0) === 0 && code < 10) {
        if (first === -1) first = code
        last = code
      } else {
        for (const [word, value] of Object.entries(numbers)) {
          if (i + word.length <= len) {
            let match = true
            for (let j = 0; j < word.length; j++) {
              if (input.charCodeAt(i + j) !== word.charCodeAt(j)) {
                match = false
                break
              }
            }
            if (match) {
              if (first === -1) first = value
              last = value
            }
          }
        }
      }
      i++
    }

    if (first !== -1) {
      sum += (first << 3) + (first << 1) + last
    }

    i++
  }

  return sum
}

module.exports = getCalibrationSum
