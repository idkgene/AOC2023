function getCalibrationSum(input) {
  const numberMap = {
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

  let sum = 0
  let start = 0
  let end = input.length

  while (start < end) {
    let lineStart = start
    while (input[start] !== '\n' && start < end) {
      start++
    }

    let first = null
    let last = null

    for (let i = lineStart; i < start; i++) {
      if (input[i] >= '0' && input[i] <= '9') {
        if (first === null) first = input[i]
        last = input[i]
        continue
      }

      for (const [word, digit] of Object.entries(numberMap)) {
        if (input.slice(i, i + word.length) === word) {
          if (first === null) first = digit
          last = digit
        }
      }
    }

    if (first !== null) {
      sum += parseInt(first + last)
    }

    start++
  }

  return sum
}

module.exports = getCalibrationSum
