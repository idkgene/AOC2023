const fs = require('fs')

const MAX_CUBES = new Map([
  ['red', 12],
  ['green', 13],
  ['blue', 14],
])

function isGamePossible(game) {
  const colorMatches = game.matchAll(/(\d+)\s+(red|green|blue)/g)

  for (const [_, count, color] of colorMatches) {
    if (parseInt(count) > MAX_CUBES.get(color)) {
      return false
    }
  }

  return true
}

function solution(input) {
  const gamePattern = /Game (\d+):(.*?)(?=Game|$)/gs
  let sum = 0

  for (const [match, id, gameData] of input.matchAll(gamePattern)) {
    if (isGamePossible(gameData)) {
      sum += parseInt(id)
    }
  }

  return sum
}

if (require.main === module) {
  const input = fs.readFileSync('input.txt', 'utf8')
  console.log(solution(input))
}

module.exports = { solution }
