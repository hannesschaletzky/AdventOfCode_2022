import axios from 'axios'
import fs from 'fs'
import { JSDOM } from 'jsdom'
import * as dotenv from 'dotenv'
dotenv.config()

const baseURI = 'https://adventofcode.com'
const cookie = process.env.AOC_SESSION_COOKIE
const _basePath = './_base'
const inputName = 'input.txt'
const inputTestName = 'input_test.txt'

// read year and day from argv
if (isNaN(+process.argv[2]) || isNaN(+process.argv[3])) {
  throw Error(
    'please specfiy year and day as parameters, e.g. "npm run setup 2022 7"'
  )
}
const year = Number(process.argv[2])
const day = Number(process.argv[3])
console.log('setting up: ', year, day)

const newPath = `./${day}`

console.log(newPath)

if (fs.existsSync(newPath)) {
  console.log('removing dir')
  fs.readdirSync(newPath).forEach((file) => {
    fs.rmSync(`${newPath}/${file}`)
  })
  fs.rmdirSync(newPath)
}
console.log('creating dir')
fs.mkdirSync(newPath)

fs.readdirSync(_basePath).forEach((file) => {
  fs.cpSync(`${_basePath}/${file}`, `${newPath}/${file}`)
})

// scrape content and save into files

// https://adventofcode.com/2022/day/7/input
const inputURL = `${baseURI}/${year}/day/${day}/input`
const taskURL = `${baseURI}/${year}/day/${day}`

axios
  .get(inputURL, {
    headers: {
      'Content-Type': 'text/plain',
      Cookie: `session=${cookie}`
    }
  })
  .then((res) => {
    console.log('received data with length: ', res.data.length)
    fs.writeFileSync(`${newPath}/${inputName}`, res.data)
  })
  .catch((err) => {
    console.log(err)
  })

axios
  .get(taskURL, {
    headers: {
      'Content-Type': 'text/plain',
      Cookie: `session=${cookie}`
    }
  })
  .then((res) => {
    const document = new JSDOM(res.data).window.document
    console.log(document.querySelector('code'))
  })
  .catch((err) => {
    console.log(err)
  })

// const options: OptionsOfTextResponseBody =
