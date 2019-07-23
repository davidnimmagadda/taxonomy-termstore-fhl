import types from "../actions/actionTypes";
import initialState from "./initialState";

export default function apiCallReducer(
  state = initialState.activeApiCalls,
  action
) {
  switch (action.type) {
    case types.API_CALL_TRIGGERRED:
      return state + 1;
    case types.API_CALL_RETURNED:
      return state - 1;
    default:
      return state;
  }
}
