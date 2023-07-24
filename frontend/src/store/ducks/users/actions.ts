import { action } from "typesafe-actions";
import { userTypes } from "./types";

export const isAuthenticated = (payload: any) => action(userTypes.isAuthenticated, payload)
export const userInfoFromDB = (payload: any) => action(userTypes.userInfoFromDB, payload)