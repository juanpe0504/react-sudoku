import { NEW_GAME, ADD_SECOND, CHANGE_VALUE } from "../constants/action-types"
import Sudoku from '../Services/SudokuService'
import InitialBoards from '../Services/InitialBoards'
const initialState = {
  actualGame : [],
  time : new Date(0,0,0,0,0,0,0),
  isComplete : null
}

function buildGame(actualGame, time, isComplete){
  return {actualGame, time, isComplete}
}

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case NEW_GAME:
      let game = Sudoku.makeGame(InitialBoards.randomBoard(action.difficulty))
      return buildGame(game.cells, game.time, false)//{actualGame: {cells: game.cells}, time : game.time } 
    case ADD_SECOND:
      let newtime = new Date(state.time)
      if (!state.isComplete) newtime.setSeconds(state.time.getSeconds() + 1)
      return buildGame(state.actualGame, newtime, state.isComplete)//{actualGame: state.actualGame, time : newtime } 
    case CHANGE_VALUE:
      let gameWithNewValue = Sudoku.checkConflicts(action.cell, state.actualGame)
      console.log("gameWithNewValue => ", printArray(gameWithNewValue))
      return buildGame(gameWithNewValue, state.time, Sudoku.isComplete(gameWithNewValue))
    default:
      return state;
  }
}

function printArray(array){
  let print = ''
  array.forEach(lane => {
    lane.forEach(element => {
      print += (element.val)
    });
  });
  return print
}

export default rootReducer