import 'utils/extensions'
import { file } from 'utils/fs'

interface Monkey {
  items: number[]
  operation: (item: number) => void
  testNum: number
  trueId: number
  falseId: number
}

const monkeys: {
  [key: number]: Monkey
} = {}

// parse input
const blocks = file.split(/\r?\n\n/)
blocks.forEach((block) => {
  const [idL, itemsL, opL, testL, trueL, falseL] = block
    .split(/\r?\n/)
    .map((line) => line.trim())

  const id = Number(idL.replace(/[^0-9]/g, ''))

  const items = itemsL
    .replace('Starting items: ', '')
    .split(', ')
    .map((item) => {
      return Number(item)
    })

  const [operator, num] = opL.replace('Operation: new = old ', '').split(' ')
  let operation = (item: number) => {}

  switch (operator) {
    case '*':
      operation = (item: number) => {
        if (num == 'old') {
          return item * item
        }
        return item * Number(num)
      }
      break
    case '+':
      operation = (item: number) => {
        if (num == 'old') {
          return item + item
        }
        return item + Number(num)
      }
      break
    default:
      break
  }

  const testNum = Number(testL.replace(/[^0-9]/g, ''))

  const trueId = Number(trueL.replace(/[^0-9]/g, ''))
  const falseId = Number(falseL.replace(/[^0-9]/g, ''))

  // console.log(id, items, operator, operation(2), testNum, trueId, falseId)

  const monkey: Monkey = {
    items: items,
    operation: operation,
    testNum: testNum,
    trueId: trueId,
    falseId: falseId
  }

  monkeys[id] = monkey
})

console.log(monkeys)

let sum = 0
console.log(sum)
