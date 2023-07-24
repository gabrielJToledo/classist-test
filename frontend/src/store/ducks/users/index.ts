import { userTypes } from "./types";
import { Reducer } from "redux";

const initalState = {
    isAuthenticated: false,
    userInfo: null
}

const userReducer: Reducer = (state = initalState, action) => {
    switch (action.type) {
        case userTypes.isAuthenticated:
            return { ...state, isAuthenticated: action.payload }
        case userTypes.userInfoFromDB:
            return { ...state, userInfo: action.payload }
        default:
            return state
    }
}

export default userReducer