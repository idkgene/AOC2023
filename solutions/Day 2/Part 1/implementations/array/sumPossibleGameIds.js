const fs = require('fs')
const path = require('path')

function sumPossibleGameIds(input) {
  const lines = input
    .trim()
    .split('\n')
    .filter((line) => line)
  const LIMITS = [12, 13, 14] // [red, green, blue]
  const COLOR_INDEX = { red: 0, green: 1, blue: 2 }

  return lines.reduce((sum, line) => {
    if (!line) return sum

    const gameMatch = line.match(/Game (\d+)/)
    if (!gameMatch) return sum
    const gameId = parseInt(gameMatch[1])

    const sets = line.split(':')[1].split(';')

    const isPossible = sets.every((set) => {
      const counts = [0, 0, 0]
      const cubes = set.match(/(\d+) (red|green|blue)/g) || []

      cubes.forEach((cube) => {
        const [count, color] = cube.trim().split(' ')
        counts[COLOR_INDEX[color]] = parseInt(count)
      })

      return counts.every((count, i) => count <= LIMITS[i])
    })

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
