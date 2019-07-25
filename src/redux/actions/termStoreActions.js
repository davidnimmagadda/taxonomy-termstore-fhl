import types from "./actionTypes";
import * as termStoreApi from "../../api/termStoreApi";
import * as apiCallActions from "./apiCallActions";

export function loadTermChildrenSuccess(term) {
  return { type: types.LOAD_TERM_CHILDREN_SUCCESS, term };
}

export function loadTermChildren(path) {
  return async function(dispatch) {
    try {
      dispatch(apiCallActions.apiCallTriggerred());
      const term = await termStoreApi.getNode(path);
      dispatch(loadTermChildrenSuccess(term));
    } catch (error) {
      throw error;
    } finally {
      dispatch(apiCallActions.apiCallReturned());
    }
  };
}
