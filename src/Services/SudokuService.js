var chunk = require('lodash.chunk')
const letters = 'abcdefghi'
function newCell(value,editable,i,j, hasConflict = false){
  return {
    val:value, 
    editable:editable,
    hasConflict:hasConflict, 
    indexv: getLetter(i,j), 
    indexh: j,
    i: i,
    j: j
  }
}

function getLetter(i,j){
  return letters[i]
}

function newGame(cells){
  return {cells, time : new Date(0,0,0,0,0,0,0)}
}

function isComplete(cells){
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) { 
      const cell = cells[i][j]
      if(cell.hasConflict || cell.val === null){
        return false
      }
    }
  }
  return true
}

function makeGame(board){
  let array = []
  for (let i = 0; i < 81; i++) {
    if (board[i] === '0')
      array.push(null)
    else
    array.push(parseInt(board[i]))
  }
  array = chunk(array,9)
  let finalGame = []
  for (let i = 0; i < 9; i++) {
    let bigcell = []
    for (let j = 0; j < 9; j++) { 
      bigcell.push(newCell(array[i][j],array[i][j] === null, i, j))
    }
    finalGame.push(bigcell)
  }

  return newGame(finalGame)
}

function setNewValue(cell,cells){
  cells[cell.i][cell.j].val = cell.val
}

function markAllWithoutConflict(cells) {
  for (var i = 0; i < 9; i++) {
    for (var j = 0; j < 9; j++) {
      cells[i][j].hasConflict = false
    }
  }
}

function checkConflicts(cell, cells){
  setNewValue(cell,cells)
  markAllWithoutConflict(cells)
  checkHorizontalLanes(cells)
  checkVerticalLanes(cells)
  checkSquares(cells)
  return cloneArray(cells)
}

function checkHorizontalLanes(cells){
  cells.forEach(lane => {
    lane.forEach(eFirst => {
      lane.forEach(eSecond => {
        if (eFirst.val !== null && eFirst.j !== eSecond.j && eFirst.val === eSecond.val){
          eSecond.hasConflict = true
          eFirst.hasConflict = true
        }
      })
    })
  })
}

function checkVerticalLanes(cells){
  for (let j = 0; j < cells.length; j++) {
    for (let i = 0; i < cells.length; i++) {
      const eFirst = cells[i][j]
      for (let k = 0; k < cells.length; k++) {
        const eSecond = cells[k][j]
        if (eFirst.val !== null && eFirst.i !== eSecond.i && eFirst.val === eSecond.val){
          eSecond.hasConflict = true
          eFirst.hasConflict = true
        }
      }
    }
  }
}

function checkSquares(cells){
  var c = cells
  var first = [c[0][0], c[0][1], c[0][2], c[1][0], c[1][1], c[1][2], c[2][0], c[2][1], c[2][2]]
  var second = [c[3][0], c[3][1], c[3][2], c[4][0], c[4][1], c[4][2], c[5][0], c[5][1], c[5][2]]
  var third = [c[6][0], c[6][1], c[6][2], c[7][0], c[7][1], c[7][2], c[8][0], c[8][1], c[8][2]]

  var four = [c[0][3], c[0][4], c[0][5], c[1][3], c[1][4], c[1][5], c[2][3], c[2][4], c[2][5]]
  var five = [c[3][3], c[3][4], c[3][5], c[4][3], c[4][4], c[4][5], c[5][3], c[5][4], c[5][5]]
  var six = [c[6][3], c[6][4], c[6][5], c[7][3], c[7][4], c[7][5], c[8][3], c[8][4], c[8][5]]

  var seven = [c[0][6], c[0][7], c[0][8], c[1][6], c[1][7], c[1][8], c[2][6], c[2][7], c[2][8]]
  var eight = [c[3][6], c[3][7], c[3][8], c[4][6], c[4][7], c[4][8], c[5][6], c[5][7], c[5][8]]
  var nine = [c[6][6], c[6][7], c[6][8], c[7][6], c[7][7], c[7][8], c[8][6], c[8][7], c[8][8]]
  let squares = [first,second,third, four, five, six, seven, eight, nine]

  squares.forEach(square => {
    square.forEach(eFirst => {
      square.forEach(eSecond => {
        if (eFirst.val !== null && eFirst.j !== eSecond.j && 
            eFirst.i !== eSecond.i && eFirst.val === eSecond.val){
          eSecond.hasConflict = true
          eFirst.hasConflict = true
        }
      })
    })
  })

}

function cloneArray(cells){
  let array = []
  cells.forEach(lane => {
    let laneArray = []
    lane.forEach(element => {
      laneArray.push(newCell(element.val, element.editable, element.i, element.j,element.hasConflict))
    });
    array.push(laneArray)
  });
  return array
}

function checkHorizontalLane(cell,cells){
  let result = [...cells]
  result[cell.i] = []
  for (let index = 0; index < 9; index++) {
    let actualCell = cells[cell.i][index]
    let hasConflict = false
    if (cell.j !== index && actualCell.val === cell.val)
      hasConflict = true   
    if (cell.j === index) actualCell = cell
    result[cell.i].push(newCell(actualCell.val,actualCell.editable, cell.i, index, hasConflict))
  }
  console.log("result => ",result)
  return result
}

var Sudoku = {
  newGame,
  newCell,
  checkConflicts,
  isComplete,
  makeGame,
  setNewValue
}

module.exports = Sudoku;
