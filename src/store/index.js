import { createStore } from "redux";
import rootReducer from "../reducers/index";
let storeApp = createStore(rootReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
storeApp.subscribe(() =>
  console.log('Changing State Application -> ',storeApp.getState())
)
export default storeApp;