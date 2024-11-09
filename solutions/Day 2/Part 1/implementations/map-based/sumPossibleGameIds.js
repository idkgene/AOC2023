const fs = require('fs')
const path = require('path')

function sumPossibleGameIds(input) {
  const lines = input
    .trim()
    .split('\n')
    .filter((line) => line)
  const limits = new Map([
    ['red', 12],
    ['green', 13],
    ['blue', 14],
  ])

  return lines.reduce((sum, line) => {
    const gameMatch = line.match(/Game (\d+)/)
    if (!gameMatch) return sum

    const gameId = parseInt(gameMatch[1])
    const sets = line.split(':')[1].trim()

    const possible = sets.split(';').every((set) => {
      let isSetPossible = true
      const cubes = set.match(/(\d+) (red|green|blue)/g) || []

      cubes.forEach((cube) => {
        const [count, color] = cube.trim().split(' ')
        if (parseInt(count) > limits.get(color)) {
          isSetPossible = false
        }
      })
      return isSetPossible
    })

    return sum + (possible ? gameId : 0)
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
