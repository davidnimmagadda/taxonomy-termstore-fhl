import { combineReducers } from "redux";
import activeApiCalls from "./apiCallReducer";
import termstore from "./termStoreReducer";

const rootReducer = combineReducers({ termstore, activeApiCalls });

export default rootReducer;
