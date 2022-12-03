import fs from 'fs'

export const getLinesOfFile = (): string[] => {
  // determine which input file to use based on process.argv[2]
  let pathFragments = process.argv[1].split('/')
  pathFragments.pop()
  if (process.argv[2] == 'test') {
    pathFragments.push('input_test.txt')
  } else {
    pathFragments.push('input.txt')
  }
  const path = pathFragments.join('/')
  console.log(path)
  return fs.readFileSync(path, 'utf-8').split(/\r?\n/)
}
