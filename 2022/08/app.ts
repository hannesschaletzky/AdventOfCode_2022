import 'utils/extensions'
import { getInputLines } from 'utils/fs'

// remove outside
// for (let i = 0; i < lines.length; i++) {
//   const line = lines[i].split('')
//   line.pop()
//   line.shift()
//   lines[i] = line.join('')
// }
// console.log(total)

const lines = getInputLines()
lines.pop() // last line is only linebreak -> remove

// part 1
let total = 0

total += lines.length * 2 // left & right
total += lines[0].length * 2 // top & bottom
total -= 4
console.log(total)

/*
  30373
  25812
  65332
  33549
  35390
*/
let totalScores: number[] = []

// top to bottom
for (let i = 0; i < lines.length; i++) {
  // ignore first & last item
  if (i == 0 || i == lines.length - 1) {
    continue
  }
  // left to right
  const line = lines[i]
  for (let j = 0; j < line.length; j++) {
    // ignore first & last item
    if (j == 0 || j == line.length - 1) {
      continue
    }
    const tree = line[j]
    let visible = false
    let totalScore = 1
    let score = 0

    // look left
    for (let iLeft = j - 1; iLeft >= 0; iLeft--) {
      const compTree = line[iLeft]
      score++
      if (compTree >= tree) {
        break
      }
      if (iLeft == 0) {
        visible = true
      }
    }
    // if (visible) {
    //   total++
    //   continue
    // }
    totalScore *= score
    score = 0

    // look top
    for (let iTop = i - 1; iTop >= 0; iTop--) {
      const compTree = lines[iTop][j]
      score++
      if (compTree >= tree) {
        break
      }
      if (iTop == 0) {
        visible = true
      }
    }
    // if (visible) {
    //   total++
    //   continue
    // }
    totalScore *= score
    score = 0

    // look right
    for (let iRight = j + 1; iRight < line.length; iRight++) {
      const compTree = line[iRight]
      score++
      if (compTree >= tree) {
        break
      }
      if (iRight == line.length - 1) {
        visible = true
      }
    }
    // if (visible) {
    //   total++
    //   continue
    // }
    totalScore *= score
    score = 0

    // look bottom
    for (let iBottom = i + 1; iBottom < lines.length; iBottom++) {
      const compTree = lines[iBottom][j]
      score++
      if (compTree >= tree) {
        break
      }
      if (iBottom == lines.length - 1) {
        visible = true
      }
    }
    // if (visible) {
    //   total++
    //   continue
    // }
    totalScore *= score
    totalScores.push(totalScore)
  }
}

console.log(totalScores)
totalScores = totalScores.sort((a, b) => b - a)
console.log(totalScores)
console.log(totalScores[0])
console.log(total)
