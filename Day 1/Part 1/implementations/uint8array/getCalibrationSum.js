/*
Calibration Sum Calculator (Uint8Array Implementation)

Uses TypedArray (Uint8Array) for potentially faster byte-level access (mb faster memory allocation and deallocation).
*/
function getCalibrationSum(input) {
  // Convert string to bytes once
  const bytes = new TextEncoder().encode(input)
  let sum = 0
  let i = 0
  const len = bytes.length

  while (i < len) {
    let first = -1
    let last = -1

    // Process until newline byte (10)
    while (i < len && bytes[i] !== 10) {
      const code = bytes[i] - 48
      if (code >= 0 && code <= 9) {
        if (first === -1) first = code
        last = code
      }
      i++
    }

    // Add to sum if digits found
    if (first !== -1) {
      sum += first * 10 + last
    }

    i++
  }

  return sum
}

module.exports = getCalibrationSum
