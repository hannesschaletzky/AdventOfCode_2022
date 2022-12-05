// solutions
import { getInputLines } from 'utils/fs'

const lines = getInputLines()

let stacks: { [key: number]: string[] } = {}

// CREATE STACKS
let maxCrates = 0
lines.every((line) => {
  if (line.includes('1')) {
    return false
  }
  maxCrates++
  return true
})
console.log(`maxCrates: ${maxCrates}`)

const lineLength = lines[0].length
for (let i = 0; i <= lineLength; i += 4) {
  let arr: string[] = []
  for (let j = 0; j < maxCrates; j++) {
    const element = lines[j][i + 1]
    if (element.trim().length > 0) {
      arr.push(element)
    }
  }
  stacks[Object.entries(stacks).length + 1] = arr
}
console.log(stacks)

// SORT
lines.slice(maxCrates + 2).forEach((line) => {
  const split = line.split(' ')
  let amount = Number(split[1])
  const from = Number(split[3])
  const to = Number(split[5])

  // PART 1
  // while (amount > 0) {
  //   const item = stacks[from].shift()
  //   stacks[to].unshift(item!)
  //   amount--
  // }

  // PART 2
  const items = stacks[from].splice(0, amount)
  stacks[to].unshift(...items)
})
console.log(stacks)

// CONSTRUCT ANSWER
let answer = ''
Object.entries(stacks).forEach(([_, value]) => {
  answer = answer.concat(value.shift()!)
})
console.log(answer)
