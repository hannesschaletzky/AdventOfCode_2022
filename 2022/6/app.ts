import { getInputLines } from 'utils/fs'
import 'utils/extensions'

const [line] = getInputLines()
const chars = line.split('')

const last: string[] = []
const chunkLength = 14 // part 1: 4
chars.forEach((c, i) => {
  if (last.length == chunkLength) {
    if (last.duplicates().length == 0) {
      console.log('answer: ', i)
      process.exit(0)
    }
    last.shift()
  }
  last.push(c)
})
