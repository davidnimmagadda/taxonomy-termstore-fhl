import { combineReducers } from "redux";
import terms from "./termReducer";
import activeApiCalls from "./apiCallReducer";

const rootReducer = combineReducers({ terms, activeApiCalls });

export default rootReducer;
