import fs from 'fs'

const you = {
  rock: 'X',
  paper: 'Y',
  scissors: 'Z'
}

const opp = {
  rock: 'A',
  paper: 'B',
  scissors: 'C'
}

function draw(sOpp: string, sYou: string): boolean {
  if (
    (sOpp == opp.paper && sYou == you.paper) ||
    (sOpp == opp.rock && sYou == you.rock) ||
    (sOpp == opp.scissors && sYou == you.scissors)
  ) {
    return true
  }
  return false
}

function youWin(sOpp: string, sYou: string): boolean {
  if (
    (sOpp == opp.paper && sYou == you.scissors) ||
    (sOpp == opp.rock && sYou == you.paper) ||
    (sOpp == opp.scissors && sYou == you.rock)
  ) {
    return true
  }
  return false
}

function getResultPoints(opponent: string, you: string): number {
  if (draw(opponent, you)) {
    return 3
  } else if (youWin(opponent, you)) {
    return 6
  } else {
    return 0
  }
}

function getSelectionPoints(type: string): number {
  switch (type) {
    case 'X':
      return 1
    case 'Y':
      return 2
    case 'Z':
      return 3
    default:
      return 0
  }
}

function getYourMove(type: 'win' | 'draw' | 'lose', sOpp: string): string {
  if (type == 'win') {
    if (sOpp == opp.paper) {
      return you.scissors
    } else if (sOpp == opp.rock) {
      return you.paper
    } else if (sOpp == opp.scissors) {
      return you.rock
    }
  } else if (type == 'draw') {
    if (sOpp == opp.paper) {
      return you.paper
    } else if (sOpp == opp.rock) {
      return you.rock
    } else if (sOpp == opp.scissors) {
      return you.scissors
    }
  } else if (type == 'lose') {
    if (sOpp == opp.paper) {
      return you.rock
    } else if (sOpp == opp.rock) {
      return you.scissors
    } else if (sOpp == opp.scissors) {
      return you.paper
    }
  }
  return ''
}

let sum = 0
fs.readFileSync(`${__dirname}/input.txt`, 'utf-8')
  .split(/\r?\n/)
  .forEach((line: string) => {
    const oppMove = line[0]
    let yourMove = line[2]

    // part two begin
    if (yourMove == 'X') {
      yourMove = getYourMove('lose', oppMove)
    } else if (yourMove == 'Y') {
      yourMove = getYourMove('draw', oppMove)
    } else if (yourMove == 'Z') {
      yourMove = getYourMove('win', oppMove)
    }
    // part two end

    sum += getResultPoints(oppMove, yourMove)
    sum += getSelectionPoints(yourMove)
  })
console.log(sum)
