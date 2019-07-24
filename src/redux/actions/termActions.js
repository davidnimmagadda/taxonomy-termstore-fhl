import types from "./actionTypes";
import * as termApi from "../../api/termApi";
import * as apiCallActions from "./apiCallActions";

export function createTermSuccess(term) {
  return { type: types.CREATE_TERM_SUCCESS, term };
}

export function updateTermSuccess(term) {
  return { type: types.UPDATE_TERM_SUCCESS, term };
}

export function saveTerm(term) {
  return async function(dispatch) {
    try {
      dispatch(apiCallActions.apiCallTriggerred());
      const savedTerm = await termApi.saveTerm(term);
      const action = term.id
        ? updateTermSuccess(savedTerm)
        : createTermSuccess(savedTerm);
      dispatch(action);
    } catch (error) {
      throw error;
    } finally {
      dispatch(apiCallActions.apiCallReturned());
    }
  };
}

export function loadTermsSuccess(terms) {
  return { type: types.LOAD_TERMS_SUCCESS, terms };
}
export function loadTermDetailsSuccess(termDetails) {
  return { type: types.LOAD_TERMS_DETAILS_SUCCESS, termDetails };
}
export function loadTermDetails() {
  return async function(dispatch) {
    try {
      dispatch(apiCallActions.apiCallTriggerred());
      const terms = await termApi.getTermDetails();
      dispatch(loadTermDetailsSuccess(terms));
    } catch (error) {
      throw error;
    } finally {
      dispatch(apiCallActions.apiCallReturned());
    }
  };
}
export function loadTerms() {
  return async function(dispatch) {
    try {
      dispatch(apiCallActions.apiCallTriggerred());
      const terms = await termApi.getTerms();
      dispatch(loadTermsSuccess(terms));
    } catch (error) {
      throw error;
    } finally {
      dispatch(apiCallActions.apiCallReturned());
    }
  };
}
