import { filmTypes } from "./types";
import { Reducer } from "redux";

const initalState = {
    commentsFromDB: false
}

const filmReducer: Reducer = (state = initalState, action) => {
    switch (action.type) {
        case filmTypes.getCommentsFromDB:
            return { ...state, commentsFromDB: action.payload }
        default:
            return state
    }
}

export default filmReducer