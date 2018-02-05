import { CHANGE_VALUE, NEW_GAME, ADD_SECOND } from "../constants/action-types"
export const ChangeValue = (cell) => ({ 
  type: CHANGE_VALUE, 
  cell 
})
export const NewGame = (difficulty) => ({ 
  type: NEW_GAME, 
  difficulty
})
export const AddSecond = () => ({ 
  type: ADD_SECOND 
})

