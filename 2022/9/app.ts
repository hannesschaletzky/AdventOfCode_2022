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

let head: Point = {
  x: start.x,
  y: start.y
}
let tail: Point = {
  x: start.x,
  y: start.y
}
const visited: Point[] = []
addTailToVisited()

function addTailToVisited() {
  let tailCopy = Object.assign({}, tail)
  for (let i = 0; i < visited.length; i++) {
    if (visited[i].x == tailCopy.x && visited[i].y == tailCopy.y) {
      return
    }
  }
  visited.push(tailCopy)
}

lines.forEach((line) => {
  const [direction, amountS] = line.split(' ')
  let amount = Number(amountS)

  for (amount; amount > 0; amount--) {
    MoveHeadOneStepInto(direction)
    if (headOutOfRange()) {
      appendTail(direction)
      addTailToVisited()
    }
  }
})

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
  // emptyHead()
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

console.log(visited.length)
