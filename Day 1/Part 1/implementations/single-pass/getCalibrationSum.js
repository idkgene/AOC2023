/*
Calibration Sum Calculator (Single-Pass Implementation)

Implementation that processes input in a single pass
while maintaining separate pointers for line boundaries.

Performance characteristics:
- Time Complexity: O(n) but with two passes per line
- Space Complexity: O(1)
*/
function getCalibrationSum(input) {
  let sum = 0
  let start = 0
  let end = input.length

  while (start < end) {
    let lineStart = start
    while (input[start] !== '\n' && start < end) start++

    let first = null
    let last = null

    // Forward scan for first digit
    for (let i = lineStart; i < start; i++) {
      const char = input[i]
      if (char >= '0' && char <= '9') {
        first = char
        break
      }
    }

    // Backward scan for last digit
    for (let i = start - 1; i >= lineStart; i--) {
      const char = input[i]
      if (char >= '0' && char <= '9') {
        last = char
        break
      }
    }

    // Convert chars to numbers and add to sum
    if (first !== null) {
      sum += (first.charCodeAt(0) - 48) * 10 + (last.charCodeAt(0) - 48)
    }

    start++
  }

  return sum
}

module.exports = getCalibrationSum
