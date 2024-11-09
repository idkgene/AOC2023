/*
Calibration Sum Calculator (Iterative Implementation)

A straightforward implementation using string splitting and iteration.

Algorithm Overview:
1. Split input into lines
2. For each line, find first and last digit
3. Combine digits and add to sum
*/
function getCalibrationSum(input) {
  let sum = 0
  // Split creates new array - big memory for large inputs
  const lines = input.split('\n')

  for (const line of lines) {
    let first = null
    let last = null

    for (let i = 0; i < line.length; i++) {
      // Character comparison for digit check
      if (line[i] >= '0' && line[i] <= '9') {
        if (first === null) first = line[i]
        last = line[i]
      }
    }

    // Convert string digits to number and add to sum
    if (first !== null) {
      sum += parseInt(first + last)
    }
  }

  return sum
}

module.exports = getCalibrationSum
