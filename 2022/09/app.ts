import 'utils/extensions'
import { lines } from 'utils/fs'

interface Point {
  x: number
  y: number
}

let start: Point = {
  x: 500,
  y: 500
}
let head = Object.assign({}, start)
let tail = Object.assign({}, start)

const visitedSet = new Set<string>()
addTailToVisited() // add inital overlap of head and tail

lines.forEach((line) => {
  const [direction, _] = line.split(' ')
  let amount = Number(_)

  for (amount; amount > 0; amount--) {
    MoveHeadOneStepInto(direction)
    if (headOutOfRange()) {
      appendTail(direction)
      addTailToVisited()
    }
  }
})

function addTailToVisited() {
  visitedSet.add(`${tail.x}, ${tail.y}`)
}

function appendTail(direction: string) {
  // tail is appended in opposite direction of head movement
  if (direction == 'L') {
    tail.x = head.x + 1
    tail.y = head.y
  } else if (direction == 'U') {
    tail.x = head.x
    tail.y = head.y + 1
  } else if (direction == 'R') {
    tail.x = head.x - 1
    tail.y = head.y
  } else if (direction == 'D') {
    tail.x = head.x
    tail.y = head.y - 1
  }
}

function headOutOfRange() {
  const distanceX = Math.abs(head.x - tail.x)
  const distanceY = Math.abs(head.y - tail.y)
  if (distanceX > 1 || distanceY > 1) {
    return true
  }
  return false
}

function MoveHeadOneStepInto(direction: string) {
  if (direction == 'L') {
    head.x--
  } else if (direction == 'U') {
    head.y--
  } else if (direction == 'R') {
    head.x++
  } else if (direction == 'D') {
    head.y++
  }
}

console.log(visitedSet.size)
