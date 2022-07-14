import {ADD_TIME, GET_TIME} from "./Types"

const initialState = []

const TimeReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TIME:
      return [state, action.payload]
    case GET_TIME:
      return [state, action.payload]
  }
  return state
}

export default TimeReducer