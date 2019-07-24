import types from "../actions/actionTypes";
import initialState from "./initialState";

export default function termDetailReducer(
  state = initialState.termDetails,
  action
) {
  switch (action.type) {
    case types.LOAD_TERM_DETAILS_SUCCESS:
      return action.termDetails;
    default:
      return state;
  }
}
