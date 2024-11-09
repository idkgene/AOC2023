const fs = require('fs')
const { performance } = require('perf_hooks')
const { solution } = require('./solution.js')

class Benchmark {
  constructor() {
    this.iterations = 10000
    this.warmupIterations = 100
    this.results = []
  }

  warmup(input) {
    console.log('\nWarming up...')
    for (let i = 0; i < this.warmupIterations; i++) {
      solution(input)
    }
  }

  async run() {
    const input = fs.readFileSync('input.txt', 'utf8')

    // First run to show the actual result
    console.log('Solution result:', solution(input))

    this.warmup(input)

    console.log(`\n${this.iterations} iterations...`)

    for (let i = 0; i < this.iterations; i++) {
      const start = performance.now()
      solution(input)
      const end = performance.now()
      this.results.push(end - start)

      if (i % (this.iterations / 10) === 0) {
        process.stdout.write('.')
      }
    }

    const stats = this.calculateStats()
    this.printResults(stats)
  }

  calculateStats() {
    if (this.results.length === 0) {
      return {
        min: 0,
        max: 0,
        mean: 0,
        median: 0,
        p95: 0,
        p99: 0,
      }
    }

    const sorted = [...this.results].sort((a, b) => a - b)
    return {
      min: sorted[0],
      max: sorted[sorted.length - 1],
      mean: sorted.reduce((a, b) => a + b, 0) / sorted.length,
      median: sorted[Math.floor(sorted.length / 2)],
      p95: sorted[Math.floor(sorted.length * 0.95)],
      p99: sorted[Math.floor(sorted.length * 0.99)],
    }
  }

  printResults(stats) {
    console.log('\n\nBenchmark Results:')
    console.log('===================')
    console.log(`
Sample size: ${this.iterations} iterations
Min:     ${stats.min.toFixed(4)} ms
Max:     ${stats.max.toFixed(4)} ms
Mean:    ${stats.mean.toFixed(4)} ms
Median:  ${stats.median.toFixed(4)} ms
P95:     ${stats.p95.toFixed(4)} ms
P99:     ${stats.p99.toFixed(4)} ms
        `)

    // Memory usage
    const memory = process.memoryUsage()
    console.log('Memory Usage:')
    console.log('===============')
    console.log(`
Heap Total: ${(memory.heapTotal / 1024 / 1024).toFixed(2)} MB
Heap Used:  ${(memory.heapUsed / 1024 / 1024).toFixed(2)} MB
RSS:        ${(memory.rss / 1024 / 1024).toFixed(2)} MB
        `)
  }
}

// Run benchmark
const benchmark = new Benchmark()
benchmark.run().catch(console.error)
