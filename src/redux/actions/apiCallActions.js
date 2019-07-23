import types from "./actionTypes";
export function apiCallTriggerred() {
  return {
    type: types.API_CALL_TRIGGERRED
  };
}

export function apiCallReturned() {
  return {
    type: types.API_CALL_RETURNED
  };
}
