import {ADD_LOCATION, GET_LOCATION} from "./Types"

const initialState = []

const LocationReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_LOCATION:
      return [...state, action.payload]
    case GET_LOCATION:
      return [state, action.payload]
  }
  return state
}

export default LocationReducer