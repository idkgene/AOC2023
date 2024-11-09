const fs = require('fs')

const GAME_ID_REGEX = /Game (\d+)/
const COLOR_REGEX = /(\d+) (red|green|blue)/g

const MAX_CUBES = new Uint16Array(3) // rgb
MAX_CUBES[0] = 12 // red
MAX_CUBES[1] = 13 // green
MAX_CUBES[2] = 14 // blue

const COLOR_INDEX = {
  red: 0,
  green: 1,
  blue: 2,
}

function isGamePossible(gameData) {
  let match
  COLOR_REGEX.lastIndex = 0

  while ((match = COLOR_REGEX.exec(gameData)) !== null) {
    const count = parseInt(match[1], 10)
    const colorIndex = COLOR_INDEX[match[2]]

    if (count > MAX_CUBES[colorIndex]) {
      return false
    }
  }

  return true
}

function solution(input) {
  let sum = 0

  const lines = input.trim().split('\n')

  for (const line of lines) {
    const gameid = parseInt(GAME_ID_REGEX.exec(line)[1], 10)
    if (!isGamePossible(line)) {
      sum += gameid
    }
  }

  return sum
}

if (require.main === module) {
  const input = fs.readFileSync('input.txt', 'utf8')
  console.log(solution(input))
}

module.exports = { solution }
