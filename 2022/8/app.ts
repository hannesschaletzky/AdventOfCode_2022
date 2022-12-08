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

// top to bottom
for (let i = 0; i < lines.length; i++) {
  // ignore first & last item
  if (i == 0 || i == lines.length - 1) {
    continue
  }
  // left to right
  const line = lines[i].split('')
  for (let j = 0; j < line.length; j++) {
    // ignore first & last item
    if (j == 0 || j == line.length - 1) {
      continue
    }
    const tree = line[j]
  }
}
