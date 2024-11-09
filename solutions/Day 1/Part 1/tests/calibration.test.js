const fs = require('fs')
const { performance } = require('perf_hooks')
const path = require('path')

const inputPath = path.join(__dirname, '..', 'input', 'calibration-data.txt')
const input = fs.readFileSync(inputPath, 'utf8')

const CORRECT_ANSWER = 53921
const ITERATIONS = 1000
const WARMUP_ITERATIONS = 100

const implementations = [
  {
    name: 'ASCII-based',
    fn: require('../implementations/ascii-based/getCalibrationSum'),
    description: 'Direct ASCII character code manipulation approach',
  },
  {
    name: 'Bitwise',
    fn: require('../implementations/bitwise/getCalibrationSum'),
    description: 'Bitwise operations approach',
  },
  {
    name: 'Iterative',
    fn: require('../implementations/iterative/getCalibrationSum'),
    description: 'Classic iterative string parsing',
  },
  {
    name: 'Regex-based',
    fn: require('../implementations/regex-based/getCalibrationSum'),
    description: 'Regular expression based solution',
  },
  {
    name: 'Single-pass',
    fn: require('../implementations/single-pass/getCalibrationSum'),
    description: 'Single pass through input with minimal operations',
  },
  {
    name: 'UInt8Array',
    fn: require('../implementations/uint8array/getCalibrationSum'),
    description: 'TypedArray (Uint8Array) approach',
  },
]

const TEST_CASES = [
  {
    input: '1abc2\npqr3stu8vwx\na1b2c3d4e5f\ntreb7uchet',
    expected: 142,
    description: 'Example from problem statement',
  },
]

function getMemoryUsage() {
  const used = process.memoryUsage()
  return {
    heapUsed: Math.round((used.heapUsed / 1024 / 1024) * 100) / 100,
    heapTotal: Math.round((used.heapTotal / 1024 / 1024) * 100) / 100,
    external: Math.round((used.external / 1024 / 1024) * 100) / 100,
  }
}

function calculateStats(times) {
  times.sort((a, b) => a - b)
  const mean = times.reduce((a, b) => a + b) / times.length
  const median = times[Math.floor(times.length / 2)]
  const min = times[0]
  const max = times[times.length - 1]
  const stdDev = Math.sqrt(
    times.reduce((acc, val) => acc + Math.pow(val - mean, 2), 0) / times.length,
  )

  return { mean, median, min, max, stdDev }
}

function runDetailedBenchmark(implementation) {
  console.log(`\nTesting ${implementation.name}...`)

  console.log('\nRunning correctness tests:')

  const mainResult = implementation.fn(input)
  const mainTestPassed = mainResult === CORRECT_ANSWER
  console.log(`Main input test: ${mainTestPassed ? '✅' : '❌'}`)
  if (!mainTestPassed) {
    console.log(`Expected ${CORRECT_ANSWER}, got ${mainResult}`)
  }

  TEST_CASES.forEach((test) => {
    const result = implementation.fn(test.input)
    const passed = result === test.expected
    console.log(`${test.description}: ${passed ? '✅' : '❌'}`)
    if (!passed) {
      console.log(`Expected ${test.expected}, got ${result}`)
    }
  })

  console.log('\nRunning performance benchmark:')

  for (let i = 0; i < WARMUP_ITERATIONS; i++) {
    implementation.fn(input)
  }

  const times = []
  const memoryBefore = getMemoryUsage()

  for (let i = 0; i < ITERATIONS; i++) {
    const start = performance.now()
    implementation.fn(input)
    const end = performance.now()
    times.push(end - start)
  }

  const memoryAfter = getMemoryUsage()
  const stats = calculateStats(times)

  return {
    name: implementation.name,
    description: implementation.description,
    performance: stats,
    memory: {
      before: memoryBefore,
      after: memoryAfter,
      delta: {
        heapUsed: memoryAfter.heapUsed - memoryBefore.heapUsed,
        heapTotal: memoryAfter.heapTotal - memoryBefore.heapTotal,
        external: memoryAfter.external - memoryBefore.external,
      },
    },
  }
}

console.log('\nPERFORMANCE ANALYSIS REPORT')
console.log('============================')
console.log(`Input size: ${(input.length / 1024).toFixed(2)} KB`)
console.log(`Benchmark iterations: ${ITERATIONS}`)
console.log(`Warmup iterations: ${WARMUP_ITERATIONS}\n`)

const results = implementations.map((impl) => runDetailedBenchmark(impl))

results.sort((a, b) => a.performance.mean - b.performance.mean)

// Print detailed results
console.log('\nRANKINGS AND DETAILED METRICS')
console.log('==============================')

results.forEach((result, index) => {
  const p = result.performance
  const m = result.memory

  console.log(`\n${index + 1}. ${result.name}`)
  console.log('-------------------')
  console.log(`Description: ${result.description}`)

  console.log('\nPerformance Metrics:')
  console.log(`  Mean:     ${p.mean.toFixed(4)} ms`)
  console.log(`  Median:   ${p.median.toFixed(4)} ms`)
  console.log(`  Min:      ${p.min.toFixed(4)} ms`)
  console.log(`  Max:      ${p.max.toFixed(4)} ms`)
  console.log(`  Std Dev:  ${p.stdDev.toFixed(4)} ms`)

  console.log('\nMemory Usage:')
  console.log(`  Heap Used:  ${m.delta.heapUsed.toFixed(2)} MB change`)
  console.log(`  Heap Total: ${m.delta.heapTotal.toFixed(2)} MB change`)
  console.log(`  External:   ${m.delta.external.toFixed(2)} MB change`)
})

const winner = results[0]
console.log('\nCOMPARATIVE ANALYSIS')
console.log('=====================')
results.slice(1).forEach((result) => {
  const slowdown = (result.performance.mean / winner.performance.mean - 1) * 100
  console.log(
    `${result.name} is ${slowdown.toFixed(1)}% slower than ${winner.name}`,
  )
})

console.log('\nSUMMARY')
console.log('=========')
console.log(`• Fastest implementation: ${winner.name}`)
console.log(
  `• Average execution time: ${winner.performance.mean.toFixed(4)} ms`,
)
console.log(
  `• Memory efficiency winner: ${
    results.reduce((prev, curr) =>
      prev.memory.delta.heapUsed < curr.memory.delta.heapUsed ? prev : curr,
    ).name
  }`,
)
console.log(
  `• Most consistent: ${
    results.reduce((prev, curr) =>
      prev.performance.stdDev / prev.performance.mean <
      curr.performance.stdDev / curr.performance.mean
        ? prev
        : curr,
    ).name
  }`,
)

// Timestamp
console.log(`\nReport generated: ${new Date().toISOString()}`)
