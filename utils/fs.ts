import fs from 'fs'

export const getLinesOfFile = (filePath: string): string[] => {
  return fs.readFileSync(filePath, 'utf-8').split(/\r?\n/)
}
