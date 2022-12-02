import fs from 'fs'

const filePath = `${__dirname}/input.txt`

fs.readFileSync(filePath, 'utf-8')
  .split(/\r?\n/)
  .forEach((line: string) => {
    console.log(line)
  })
