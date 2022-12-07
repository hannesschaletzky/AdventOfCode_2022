import axios from 'axios'
import fs from 'fs'
import readline from 'readline'
import { JSDOM } from 'jsdom'
import * as dotenv from 'dotenv'
dotenv.config()

// fs module will start from root (where package.json is located)
const cookie = process.env.AOC_SESSION_COOKIE
const baseURI = 'https://adventofcode.com'
const _basePath = './_base'
let newPath = ''
const inputName = 'input.txt'
const inputTestName = 'input_test.txt'
const taskName = 'task.md'
const tasksPath = '../.vscode/tasks.json'

// read year and day from argv
if (isNaN(+process.argv[2]) || isNaN(+process.argv[3])) {
  throw Error(
    'please specfiy year and day as parameters, e.g. "npm run setup 2022 7"'
  )
}
const year = Number(process.argv[2])
const day = Number(process.argv[3])
newPath = `./${day}`
console.log('setting up: ', year, day)

console.log(`-----------\n set tasks.json default day to: ${day}\n-----------`)
let file = JSON.parse(fs.readFileSync(tasksPath, 'utf8'))
file.inputs.every((input: any, i: number) => {
  if (input.id == 'day') {
    file.inputs[i].default = day.toString()
    fs.writeFileSync(tasksPath, JSON.stringify(file))
    return false
  }
  return true
})

console.log(`-----------\n create directory ${newPath}\n-----------`)
if (fs.existsSync(newPath)) {
  console.log('removing old')
  fs.readdirSync(newPath).forEach((file) => {
    fs.rmSync(`${newPath}/${file}`)
  })
  fs.rmdirSync(newPath)
}
console.log('creating new')
fs.mkdirSync(newPath)

fs.readdirSync(_basePath).forEach((file) => {
  console.log('copy file: ', file)
  fs.cpSync(`${_basePath}/${file}`, `${newPath}/${file}`)
})

// https://adventofcode.com/2022/day/7/input
const taskURL = `${baseURI}/${year}/day/${day}`
const inputURL = `${taskURL}/input`
scrapeAndSaveFiles()

async function scrapeAndSaveFiles() {
  console.log(`-----------\nfetching & saving files\n-----------`)
  // input
  console.log('from: ', inputURL)
  const inputData = await getResponseData(inputURL)
  const inputPath = `${newPath}/${inputName}`
  fs.writeFileSync(inputPath, inputData)
  console.log('saved to: ', inputPath)

  // task
  console.log('\nfrom: ', taskURL)
  const taskData = await getResponseData(taskURL)
  const document = new JSDOM(taskData).window.document
  const taskText = document.querySelector('article')?.textContent
  const taskPath = `${newPath}/${taskName}`
  fs.writeFileSync(taskPath, taskText!)
  console.log('saved to: ', taskPath)

  // example / test input
  const inputTestPath = `${newPath}/${inputTestName}`
  const blocks = document.querySelectorAll('pre')
  console.log('-----------\nchoose correct test input')

  for (let i = 0; i < blocks.length; i++) {
    const block = blocks[i]
    const answer = await askBlock(
      '-> Type "y" to approve ✅, press enter ❌ to skip \n',
      block
    )
    if (answer == 'y') {
      fs.writeFileSync(inputTestPath, block.textContent!)
      console.log('saved to: ', inputTestPath)
      break
    }
  }

  console.log('\n\n\n🥳 setup done!\n')
  process.exit(0)
}

function askBlock(question: string, block: HTMLPreElement) {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  })
  return new Promise((resolve) => {
    console.log('-----------')
    console.log(block.previousElementSibling?.textContent, '\n')
    console.log(block.textContent)
    rl.question(question, (ans: string) => {
      rl.close()
      resolve(ans)
    })
  })
}

function getResponseData(url: string): Promise<string> {
  return new Promise<string>((resolve, reject) => {
    axios
      .get(url, {
        headers: {
          'Content-Type': 'text/plain',
          Cookie: `session=${cookie}`
        }
      })
      .then((res) => {
        console.log('received data')
        resolve(res.data)
      })
      .catch((err) => {
        console.log(err)
        reject(err)
      })
  })
}
