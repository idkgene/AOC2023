/*
Calibration Sum Calculator (Bitwise Operations Implementation)

This implementation uses bitwise operations.

- Time Complexity: O(n) where n is input length
- Space Complexity: O(1)
*/

function getCalibrationSum(input) {
  let sum = 0
  let i = 0
  const len = input.length

  while (i < len) {
    let first = -1
    let last = -1

    // XOR with 10 (newline) returns 0 only for newline characters
    while (i < len && input.charCodeAt(i) ^ 10) {
      const code = input.charCodeAt(i) - 48

      // Bitwise AND with 0xf0 checks if higher 4 bits are 0
      // Combined with code < 10 ensures digit range (0-9)
      if ((code & 0xf0) === 0 && code < 10) {
        if (first === -1) first = code
        last = code
      }
      i++
    }

    if (first !== -1) {
      // Calculate first * 10 using shifts:
      // (first << 3) = first * 8
      // (first << 1) = first * 2
      // Sum gives first * 10
      sum += (first << 3) + (first << 1) + last
    }

    i++
  }

  return sum
}

module.exports = getCalibrationSum
