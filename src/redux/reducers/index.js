import { combineReducers } from "redux";
import terms from "./termReducer";
import activeApiCalls from "./apiCallReducer";
import termDetails from "./termDetailReducer";

const rootReducer = combineReducers({ terms, activeApiCalls, termDetails });

export default rootReducer;
