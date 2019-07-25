import { combineReducers } from "redux";
import activeApiCalls from "./apiCallReducer";
import termDetails from "./termDetailReducer";

const rootReducer = combineReducers({ activeApiCalls, termDetails });

export default rootReducer;
