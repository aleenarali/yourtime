import {combineReducers} from 'redux'
import TimeReducer from "./TimeReducer"
import LocationReducer from "./LocationReducer"
import CoordinateReducer from "./CoordinateReducer"

const RootReducer = combineReducers({
    TimeReducer,
    LocationReducer,
    CoordinateReducer
})

export default RootReducer