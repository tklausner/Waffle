// actions

export const FETCH_EXPLORES_PENDING = "FETCH_EXPLORES_PENDING";
export const FETCH_EXPLORES_SUCCESS = "FETCH_EXPLORES_SUCCESS";
export const FETCH_EXPLORES_FAILURE = "FETCH_EXPLORES_FAILURE";

export const FETCH_EXPLORE_PENDING = "FETCH_EXPLORE_PENDING";
export const FETCH_EXPLORE_SUCCESS = "FETCH_EXPLORE_SUCCESS";
export const FETCH_EXPLORE_FAILURE = "FETCH_EXPLORE_FAILURE";

export const CREATE_EXPLORE_PENDING = "CREATE_EXPLORE_PENDING";
export const CREATE_EXPLORE_SUCCESS = "CREATE_EXPLORE_SUCCESS";
export const CREATE_EXPLORE_FAILURE = "CREATE_EXPLORE_FAILURE";

export const DELETE_EXPLORE_PENDING = "DELETE_EXPLORE_PENDING";
export const DELETE_EXPLORE_SUCCESS = "DELETE_EXPLORE_SUCCESS";
export const DELETE_EXPLORE_FAILURE = "DELETE_EXPLORE_FAILURE";

export const UPDATE_EXPLORE_PENDING = "UPDATE_EXPLORE_PENDING";
export const UPDATE_EXPLORE_SUCCESS = "UPDATE_EXPLORE_SUCCESS";
export const UPDATE_EXPLORE_FAILURE = "UPDATE_EXPLORE_FAILURE";

// action creators

export function fetchExploresPending() {
  return { type: FETCH_EXPLORES_PENDING };
}

export function fetchExploresSuccess(explores) {
  return { type: FETCH_EXPLORES_SUCCESS, payload: explores };
}

export function fetchExploresFailure(error) {
  console.log("[EXPLORE] Fetch Explores Failed, ERROR: ", error);
  return { type: FETCH_EXPLORES_FAILURE, error: error };
}

export function fetchExplorePending() {
  return { type: FETCH_EXPLORE_PENDING };
}

export function fetchExploreSuccess(explore) {
  console.log(`[EXPLORE] @${explore.user_id} Fetched Explore`);
  return { type: FETCH_EXPLORE_SUCCESS, payload: explore };
}

export function fetchExploreFailure(error) {
  console.log("[EXPLORE] Fetch Explore Failed, ERROR: ", error);
  return { type: FETCH_EXPLORE_FAILURE, error: error };
}

export function createExplorePending() {
  return { type: CREATE_EXPLORE_PENDING };
}

export function createExploreSuccess(explore) {
  console.log(`[EXPLORE] @${explore.user_id} New Explore`);
  return { type: CREATE_EXPLORE_SUCCESS, payload: explore };
}

export function createExploreFailure(error) {
  console.log("[EXPLORE] Upload Failed, ERROR: ", error);
  return { type: CREATE_EXPLORE_FAILURE, error: error };
}

export function deleteExplorePending() {
  return { type: DELETE_EXPLORE_PENDING };
}

export function deleteExploreSuccess(explore) {
  console.log(`[EXPLORE] @${explore.user_id} Deleted Explore`);
  return { type: DELETE_EXPLORE_SUCCESS, payload: explore };
}

export function deleteExploreFailure(error) {
  console.log("[EXPLORE] Delete Failed, ERROR: ", error);
  return { type: DELETE_EXPLORE_FAILURE, error: error };
}

export function updateExplorePending() {
  return { type: UPDATE_EXPLORE_PENDING };
}

export function updateExploreSuccess(explore) {
  console.log(`@${explore.user_id} Succesfully Updated Item`);
  return { type: UPDATE_EXPLORE_SUCCESS, payload: explore };
}

export function updateExploreFailure(error) {
  console.log("Update Failed, ERROR: ", error);
  return { type: UPDATE_EXPLORE_FAILURE, error: error };
}
