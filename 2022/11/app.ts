import 'utils/extensions'
import { file } from 'utils/fs'

interface Monkey {
  items: number[]
  operation: (item: number) => number
  testNum: number
  trueId: number
  falseId: number
  totalInspects: number
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
  let operation = (item: number) => {
    return item
  }

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
    falseId: falseId,
    totalInspects: 0
  }

  monkeys[id] = monkey
})

// rounds
for (let roundI = 0; roundI < 20; roundI++) {
  // monkeys
  Object.entries(monkeys).forEach(([key, monkey]) => {
    // items
    let item = monkey.items.shift()
    while (item != undefined) {
      monkeys[+key].totalInspects++
      let lvl = monkey.operation(item)
      lvl = Math.trunc(lvl / 3)
      if (lvl % monkey.testNum == 0) {
        monkeys[monkey.trueId].items.push(lvl)
      } else {
        monkeys[monkey.falseId].items.push(lvl)
      }
      item = monkey.items.shift()
    }
  })
}

let [first, second] = Object.values(monkeys)
  .map((monkey) => {
    return monkey.totalInspects
  })
  .sort((a, b) => b - a)
console.log(first, '*', second)
let sum = first * second
console.log('sum:', sum)
