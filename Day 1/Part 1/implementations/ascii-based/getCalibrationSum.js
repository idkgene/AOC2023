/*
Calibration Sum Calculator (ASCII-based implementation)

This implementation calculates calibration values from a text input using ASCII character codes.

Algorithm Overview:
1. Iterate through each line of input
2. Find first and last digit in each line
3. Combine digits into two-digit number (first * 10 + last)
4. Sum all numbers to get final calibration value

Visual representation of the process:

Input line: "1abc2"
           ↓
First digit (1) found
           ↓
Last digit (2) found
           ↓
Combine: 1 * 10 + 2 = 12
           ↓
Add to running sum

- Time Complexity: O(n) where n is input length
- Space Complexity: O(1) - constant extra space
*/
function getCalibrationSum(input) {
  let sum = 0
  let i = 0
  const len = input.length

  while (i < len) {
    let first = -1
    let last = -1

    while (i < len && input.charCodeAt(i) !== 10) {
      // 10 = '\n'
      const code = input.charCodeAt(i) - 48 // 48 = '0'
      
      // Check if character is digit (0-9)
      if (code >= 0 && code <= 9) {
        // If this is first digit in line, store it
        if (first === -1) first = code
        // Update last digit found always
        last = code
      }
      i++
    }

    // If we found at least one digit in the line
    if (first !== -1) {
      // Combine digits and add to sum
      // First * 10 creates tens place
      // Last adds ones place
      sum += first * 10 + last
    }

    // Skip over newline character
    i++
  }

  return sum
}

module.exports = getCalibrationSum
