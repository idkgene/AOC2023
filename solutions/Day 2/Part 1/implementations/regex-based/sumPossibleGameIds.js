const fs = require('fs')
const path = require('path')

function sumPossibleGameIds(input) {
  const lines = input
    .trim()
    .split('\n')
    .filter((line) => line)
  const gameRegex = /Game (\d+):/
  const colorRegex = /(\d+) (red|green|blue)/g
  const maxCubes = { red: 12, green: 13, blue: 14 }

  return lines.reduce((sum, line) => {
    const gameMatch = line.match(gameRegex)
    if (!gameMatch) return sum

    const gameId = parseInt(gameMatch[1])
    let isPossible = true

    // Check each color count against maximum
    for (const match of line.matchAll(colorRegex)) {
      const count = parseInt(match[1])
      const color = match[2]
      if (count > maxCubes[color]) {
        isPossible = false
        break
      }
    }

    return sum + (isPossible ? gameId : 0)
  }, 0)
}

if (require.main === module) {
  try {
    const inputPath = path.join(__dirname, '../../input/game-data.txt')
    const input = fs.readFileSync(inputPath, 'utf8')
    console.log(sumPossibleGameIds(input))
  } catch (error) {
    console.error(error.message)
  }
}

module.exports = sumPossibleGameIds
