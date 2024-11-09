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
  const lines = input.split('\n')

  for (const line of lines) {
    let first = null
    let last = null

    for (let i = 0; i < line.length; i++) {
      if (line[i] >= '0' && line[i] <= '9') {
        if (first === null) first = line[i]
        last = line[i]
      } else {
        for (const [word, digit] of Object.entries(numberMap)) {
          if (line.slice(i, i + word.length) === word) {
            if (first === null) first = digit
            last = digit
          }
        }
      }
    }

    if (first !== null) {
      sum += parseInt(first + last)
    }
  }

  return sum
}

module.exports = getCalibrationSum
