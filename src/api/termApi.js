import { handleResponse, handleError } from "./apiUtils";
const baseUrl = process.env.API_URL + "/terms/";

export async function getTerms() {
  try {
    let response = await fetch(baseUrl);
    return handleResponse(response);
  } catch (error) {
    return handleError(error);
  }
}
export async function getTermDetails() {
  try {
    let response = await fetch(process.env.API_URL + "/termDetails");
    return handleResponse(response);
  } catch (error) {
    return handleError(error);
  }
}
export async function saveTerm(term) {
  try {
    let response = await fetch(baseUrl + (term.id || ""), {
      method: term.id ? "PUT" : "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(term)
    });
    return handleResponse(response);
  } catch (error) {
    return handleError(error);
  }
}

export async function deleteTerm(termId) {
  try {
    let response = await fetch(baseUrl + termId, { method: "DELETE" });
    return handleResponse(response);
  } catch (error) {
    return handleError(error);
  }
}
