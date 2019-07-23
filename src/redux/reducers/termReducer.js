import types from "../actions/actionTypes";
import initialState from "./initialState";

export default function termReducer(state = initialState.terms, action) {
  switch (action.type) {
    case types.CREATE_TERM_SUCCESS:
      return [...state, { ...action.term }];
    case types.UPDATE_TERM_SUCCESS:
      return state.map(_ => (action.term.id === _.id ? action.term : _));
    case types.LOAD_TERMS_SUCCESS:
      return action.terms;
    default:
      return state;
  }
}
