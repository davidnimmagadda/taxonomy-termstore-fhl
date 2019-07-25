import { handleResponse, handleError } from "./apiUtils";
const baseUrl = process.env.API_URL + "/ts";

export async function getNode(path) {
  try {
    let response = await fetch(baseUrl + "/" + path);
    return handleResponse(response);
  } catch (error) {
    return handleError(error);
  }
}

export async function getAll() {
  try {
    let response = await fetch(baseUrl);
    return handleResponse(response);
  } catch (error) {
    return handleError(error);
  }
}
