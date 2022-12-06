import { getInputLines } from 'utils/fs'
import 'utils/extensions'

const [line] = getInputLines()
const chars = line.split('')

const msg: string[] = []
const reqLength = 14 // part 1: 4
chars.forEach((c, i) => {
  if (msg.length == reqLength) {
    if (msg.duplicates().length == 0) {
      console.log('answer: ', i)
      process.exit(0)
    }
    msg.shift()
  }
  msg.push(c)
})
