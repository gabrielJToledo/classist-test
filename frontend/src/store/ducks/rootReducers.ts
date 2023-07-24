import { combineReducers } from "redux";

import userReducer from './users'
import filmReducer from "./films";

export default combineReducers({
    userReducer,
    filmReducer
})