import { action } from "typesafe-actions";
import { filmTypes } from "./types";

export const getCommentsFromDB = (payload: any) => action(filmTypes.getCommentsFromDB, payload)