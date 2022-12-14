// solutions: https://www.reddit.com/r/adventofcode/comments/zb865p/2022_day_3_solutions/
import { getInputLines } from 'utils/fs'

const lines = getInputLines()

let lowerAlphabet = [...Array(26).keys()].map((i) =>
  String.fromCharCode(i + 97)
)
let capitalAlphabet = [...Array(26).keys()].map((i) =>
  String.fromCharCode(i + 65)
)
let joinedAlphabet = lowerAlphabet.concat(capitalAlphabet)

// part 1
let sum1 = 0
lines.forEach((line) => {
  const middle = line.length / 2
  const first = [...line.substring(0, middle)]
  const second = line.substring(middle)

  first.every((c) => {
    if (second.includes(c)) {
      sum1 += joinedAlphabet.indexOf(c) + 1
      return false
    }
    return true
  })
})
console.log(sum1)

// part 2
let sum2 = 0
for (let i = 0; i < lines.length; i += 3) {
  const first = [...lines[i]]
  const second = lines[i + 1]
  const third = lines[i + 2]

  first.every((c) => {
    if (second.includes(c) && third.includes(c)) {
      sum2 += joinedAlphabet.indexOf(c) + 1
      return false
    }
    return true
  })
}
console.log(sum2)
