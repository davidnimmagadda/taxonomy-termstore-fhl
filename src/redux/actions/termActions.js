import types from "./actionTypes";

export function loadTermSuccess(term) {
  return { type: types.LOAD_TERM_SUCCESS, term };
}

export function setCurrentTerm(term) {
  return async function(dispatch) {
    dispatch(loadTermSuccess(term));
  };
}
