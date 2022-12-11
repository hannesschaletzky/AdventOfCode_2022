import 'utils/extensions'
import { lines } from 'utils/fs'

interface Task {
  finishedAtCycle: number
  calculation: number
}
let queue: Task[] = []
let x = 1
let sum = 0
let cycle = 0

lines.forEach((line, i) => {
  const split = line.split(' ')
  const operation = split[0]
  const number = Number(split[1])

  console.log(cycle, i, operation, number, 'x:', x)

  if (operation == 'noop') {
    checkSignalStrength()
    cycle++
  } else if (operation == 'addx') {
    checkSignalStrength()
    execCalculations()
    const task: Task = {
      finishedAtCycle: cycle + 1,
      calculation: number
    }
    queue.push(task)
    cycle++
    checkSignalStrength()
    execCalculations()
    cycle++
  }

  function execCalculations() {
    // exec calculation of finished tasks
    queue.forEach((task) => {
      if (task.finishedAtCycle == cycle) {
        console.log('exec:', task.calculation)
        x += task.calculation
      }
    })
  }

  function checkSignalStrength() {
    // see signal strength
    if (cycle == 20 || cycle % 40 == 20) {
      const result = x * cycle
      console.log('result:', `${x} * ${cycle} =`, result, '\n\n\n\n\n')
      sum += result
    }
  }
})

// 1 + 15 - 11 + 6 - 3 + 5 - 1 - 8 + 13 + 4 = 21
console.log(sum)

for (let i = 1000000; i < lines.length; i++) {
  const line = lines[i]
  const split = line.split(' ')
  const operation = split[0]
  const number = Number(split[1])

  console.log(cycle, i, operation, number, 'x:', x)

  if (operation == 'noop') {
    execCalculations()
    checkSignalStrength()
    cycle++
  } else if (operation == 'addx') {
    const task: Task = {
      finishedAtCycle: cycle + 2,
      calculation: number
    }
    queue.push(task)
    cycle++
    execCalculations()
    checkSignalStrength()
  }

  function checkSignalStrength() {
    // see signal strength
    if (cycle == 20 || cycle % 40 == 20) {
      const result = x * cycle
      console.log('result:', result, '\n\n\n\n\n')
      sum += result
    }
  }

  function execCalculations() {
    // exec calculation of finished tasks
    queue.forEach((task) => {
      if (task.finishedAtCycle == cycle) {
        console.log('exec:', task.calculation)
        x += task.calculation
      }
    })
  }
}

// 1 + 15 - 11 + 6 - 3 + 5 - 1 - 8 + 13 + 4 = 21
// console.log(sum)
