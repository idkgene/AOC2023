const fs = require('fs')

const MAX_CUBES = {
  red: 12,
  green: 13,
  blue: 14,
}

function isGamePossible(game) {
  const rounds = game.split(': ')[1].split('; ')

  for (const round of rounds) {
    const cubes = round.split(', ')

    for (const cube of cubes) {
      const [count, color] = cube.split(' ')
      if (parseInt(count) > MAX_CUBES[color]) {
        return false
      }
    }
  }

  return true
}

function solution(input) {
  const games = input.trim().split('\n')
  let sum = 0

  for (const game of games) {
    const gameId = parseInt(game.split(':')[0].split(' ')[1])
    if (isGamePossible(game)) {
      sum += gameId
    }
  }
  return sum
}

if (require.main === module) {
  const input = fs.readFileSync('input.txt', 'utf8')
  console.log(solution(input))
}

module.exports = { solution }
