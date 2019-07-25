import { combineReducers } from "redux";
import termstore from "./termStoreReducer";
import activeApiCalls from "./apiCallReducer";

const rootReducer = combineReducers({
  termstore,
  activeApiCalls
});

export default rootReducer;
