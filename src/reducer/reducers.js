import { combineReducers } from '@reduxjs/toolkit'
import DataReducer from './dataReducer'

// Define your reducers here
const rootReducer = combineReducers({
  // counter: counterSlice,
  dataReducer: DataReducer
})

export default rootReducer
