import {ADD_COORDINATE} from "./Types"

const initialState = []

const CoordinateReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_COORDINATE:
      return [...state, action.payload]
  }
  return state
}

export default CoordinateReducer