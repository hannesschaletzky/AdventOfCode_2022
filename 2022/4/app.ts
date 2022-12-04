import { getInputLines } from 'utils/fs'

const lines = getInputLines()

interface Pair {
  from: number
  to: number
}

function getPairs(line: string): [Pair, Pair] {
  const splitted = line.split(',')
  const first = splitted[0].split('-')
  const second = splitted[1].split('-')
  const firstPair: Pair = { from: Number(first[0]), to: Number(first[1]) }
  const secondPair: Pair = { from: Number(second[0]), to: Number(second[1]) }
  return [firstPair, secondPair]
}

function createSeries(start: number, end: number): number[] {
  let numbers: number[] = []
  for (start; start <= end; start++) {
    numbers.push(start)
  }
  return numbers
}

// part 1
let sum1 = 0
lines.forEach((line) => {
  const [first, second] = getPairs(line)
  if (first.from >= second.from && first.to <= second.to) {
    sum1++
  } else if (second.from >= first.from && second.to <= first.to) {
    sum1++
  }
})
console.log(sum1)

// part 2
let sum2 = 0
lines.forEach((line) => {
  const [first, second] = getPairs(line)
  const firstSeries = createSeries(first.from, first.to)
  const secondSeries = createSeries(second.from, second.to)
  firstSeries.every((num) => {
    if (secondSeries.includes(num)) {
      sum2++
      return false
    }
    return true
  })
})
console.log(sum2)
