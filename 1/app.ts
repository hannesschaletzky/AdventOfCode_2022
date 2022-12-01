import fs from 'fs'

const sums: number[] = []
let sum = 0

fs.readFileSync(`${__dirname}/input.txt`, 'utf-8')
  .split(/\r?\n/)
  .forEach((line: string) => {
    if (line.length == 0) {
      sums.push(sum)
      sum = 0
    } else {
      sum += Number(line)
    }
  })

sums.sort((a: number, b: number) => b - a)
console.log(sums)
console.log(sums[0])
console.log(sums[0] + sums[1] + sums[2])
