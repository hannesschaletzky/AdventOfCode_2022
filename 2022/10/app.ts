import 'utils/extensions'
import { lines } from 'utils/fs'

interface Task {
  cycles: number
  calculation: number
}
let queue: Task[] = []
let x = 1
let sum = 0
let cycles = 0
for (let i = 0; i < lines.length; i++) {
  const line = lines[i]
  const split = line.split(' ')
  const operation = split[0]
  const number = Number(split[1])
  cycles++

  console.log(cycles, i, operation, number, 'x:', x)

  // see signal strength
  if (cycles == 20 || cycles % 40 == 20) {
    const result = x * cycles
    console.log('result:', result, '\n\n\n\n\n')
    sum += result
  }

  // add task to queue
  if (operation == 'addx') {
    cycles++
    const task: Task = {
      cycles: 2,
      calculation: number
    }
    queue.push(task)
  }

  // reduce queued tasks by one cycle
  queue = queue.map((task) => {
    task.cycles--
    return task
  })

  // extract finished tasks
  const finishedTasks: Task[] = []
  for (let j = queue.length - 1; j >= 0; j--) {
    if (queue[j].cycles == 0) {
      finishedTasks.push(...queue.splice(j, 1))
    }
  }

  // include calculation of finished tasks
  finishedTasks.forEach((task) => {
    console.log('exec:', task.calculation)
    x += task.calculation
  })
}

// 1 + 15 - 11 + 6 - 3 + 5 - 1 - 8 + 13 + 4 = 21
console.log(sum)
