import 'utils/extensions'
import { lines } from 'utils/fs'

interface P {
  H: string
  T: string
  V: string // visisted
}

const size = 1000
const grid = new Array(size)
for (let i = 0; i < size; i++) {
  grid[i] = new Array(size)
  for (let j = 0; j < size; j++) {
    grid[i][j] = {
      H: '',
      T: '',
      V: ''
    }
  }
}

let x = 500
let y = 500
grid[x][y] = {
  H: 'H',
  T: 'T',
  V: '#'
}
console.log(grid[x][y])

lines.forEach((line) => {
  const [dir, amount] = line.split(' ')
  console.log(dir, amount)
})

// part 1
let ans = 0
console.log(ans)
