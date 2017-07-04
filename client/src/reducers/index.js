import { combineReducers } from 'redux'
import reload from './reload'
import authenticate from './authenticate';

const rootReducer = combineReducers({
  reload,
  authenticate
})

export default rootReducer