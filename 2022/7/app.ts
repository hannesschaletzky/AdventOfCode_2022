import 'utils/extensions'
import { getInputLines } from 'utils/fs'

const lines = getInputLines()

interface Dir {
  name: string
  subDirs: string[]
  size: number
  totalSize: number
}

// part 1
let ans1 = 0

let lsIndices: number[] = []
lines.forEach((line, i) => {
  if (line == '$ ls') {
    lsIndices.push(i)
  }
})

// create dirs
let allDirs: Dir[] = []
lsIndices.forEach((i) => {
  let dir: Dir = {
    name: '',
    subDirs: [],
    size: 0,
    totalSize: 0
  }

  // read name
  dir.name = lines[i - 1].replace('$ cd ', '')

  // read subdirs and files
  for (let j = i + 1; j < lines.length; j++) {
    const line = lines[j]
    if (line.includes('$')) {
      break
    }
    const [fileSize, dirName] = line.split(' ')
    isNaN(+fileSize) ? dir.subDirs.push(dirName) : (dir.size += +fileSize)
  }
  allDirs.push(dir)
})
console.log(allDirs)

allDirs.forEach((dir, i) => {
  console.log('calc for ', dir.name)
  const sum = calcSize(dir)
  allDirs[i].totalSize = sum

  if (sum <= 100000) {
    ans1 += sum
  }
})

// calc size
function calcSize(inputDir: Dir): number {
  console.log('checking ', inputDir.name)
  if (inputDir.subDirs.length == 0) {
    console.log('return', inputDir.name, inputDir.size)
    return inputDir.size
  }
  let sumSubDirs = 0
  console.log('inputDir.subDirs', inputDir.subDirs)
  for (let i = 0; i < inputDir.subDirs.length; i++) {
    const subDir = inputDir.subDirs[i]
    console.log('subdir: ', subDir)
    const dir = allDirs.find((dir) => dir.name == subDir)
    console.log('found: ', dir!.name)
    // console.log('DIR: ', dir!)
    sumSubDirs += calcSize(dir!)
    console.log('sum ', sumSubDirs)
  }
  return sumSubDirs + inputDir.size
}

console.log('')
console.log('')
console.log(allDirs)
console.log(ans1)

// part 2
let ans2 = 0
console.log(ans2)
