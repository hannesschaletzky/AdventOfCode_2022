// solutions
import { getInputLines, getInputFile } from 'utils/fs'

// const lines = getInputLines()
const file = getInputFile()

const [stacksInput, movesInput] = file.split('\n\n')

// CREATE STACKS
let stacks: { [key: number]: string[] } = {}
let stacksLines = stacksInput.split('\n')
stacksLines.pop() // pop labels
console.log(`maximum crates: ${stacksLines.length}`)

// from left to right
for (let i = 0; i <= stacksLines[0].length; i += 4) {
  let arr: string[] = []
  // from top to bottom
  for (let j = 0; j < stacksLines.length; j++) {
    const c = stacksLines[j][i + 1] // c always at 2nd position in block
    if (c.trim().length > 0) {
      arr.push(c)
    }
  }
  stacks[Object.entries(stacks).length + 1] = arr
}
console.log(stacks)

// SORT
let moveLines = movesInput.split('\n')
moveLines.forEach((line) => {
  const split = line.split(' ')
  const amount = Number(split[1])
  const from = Number(split[3])
  const to = Number(split[5])

  let items = stacks[from].splice(0, amount)
  items.reverse() // comment out for part 2
  stacks[to].unshift(...items)
})
console.log(stacks)

// CONSTRUCT ANSWER
let answer = ''
Object.entries(stacks).forEach(([_, value]) => {
  answer = answer.concat(value.shift()!)
})
console.log(answer)
