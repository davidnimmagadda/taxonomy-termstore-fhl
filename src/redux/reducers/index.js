import { combineReducers } from "redux";
import termstoreChildren from "./termStoreReducer";
import activeApiCalls from "./apiCallReducer";

const rootReducer = combineReducers({
  termstoreChildren,
  activeApiCalls
});

export default rootReducer;
