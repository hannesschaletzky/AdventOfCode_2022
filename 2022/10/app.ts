import 'utils/extensions'
import { lines } from 'utils/fs'

// https://github.com/joeleisner/advent-of-code-2022/blob/main/days/10-cathode-ray-tube/mod.ts

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
    const task: Task = {
      finishedAtCycle: cycle + 2,
      calculation: number
    }
    queue.push(task)
    cycle++
    checkSignalStrength()
    cycle++
    checkSignalStrength()
    execCalculations()
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
      if (cycle == 220) {
        console.log(sum)
        process.exit(0)
      }
    }
  }
})

// 1 + 15 - 11 + 6 - 3 + 5 - 1 - 8 + 13 + 4 = 21

// 16380 -> wrong
