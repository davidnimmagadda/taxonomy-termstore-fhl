import { combineReducers } from "redux";
import activeApiCalls from "./apiCallReducer";
import termstore from "./termStoreReducer";
import currentItem from "./termReducer";

const rootReducer = combineReducers({ termstore, currentItem, activeApiCalls });

export default rootReducer;
