// actions

export const FETCH_USERS_PENDING = "FETCH_USERS_PENDING";
export const FETCH_USERS_SUCCESS = "FETCH_USERS_SUCCESS";
export const FETCH_USERS_FAILURE = "FETCH_USERS_FAILURE";

export const FETCH_USER_PENDING = "FETCH_USER_PENDING";
export const FETCH_USER_SUCCESS = "FETCH_USER_SUCCESS";
export const FETCH_USER_FAILURE = "FETCH_USER_FAILURE";

export const CREATE_USER_PENDING = "CREATE_USER_PENDING";
export const CREATE_USER_SUCCESS = "CREATE_USER_SUCCESS";
export const CREATE_USER_FAILURE = "CREATE_USER_FAILURE";

export const DELETE_USER_PENDING = "DELETE_USER_PENDING";
export const DELETE_USER_SUCCESS = "DELETE_USER_SUCCESS";
export const DELETE_USER_FAILURE = "DELETE_USER_FAILURE";

export const UPDATE_USER_PENDING = "UPDATE_USER_PENDING";
export const UPDATE_USER_SUCCESS = "UPDATE_USER_SUCCESS";
export const UPDATE_USER_FAILURE = "UPDATE_USER_FAILURE";

// action creators

export function fetchUsersPending() {
  return { type: FETCH_USERS_PENDING };
}

export function fetchUsersSuccess(users) {
  return { type: FETCH_USERS_SUCCESS, payload: users };
}

export function fetchUsersFailure(error) {
  console.log("Fetch Users Failed, ERROR: ", error);
  return { type: FETCH_USERS_FAILURE, error: error };
}

export function fetchUserPending() {
  return { type: FETCH_USER_PENDING };
}

export function fetchUserSuccess(user) {
  console.log(`Fetch @${user.username} Succesful`);
  return { type: FETCH_USER_SUCCESS, payload: user };
}

export function fetchUserFailure(error) {
  console.log("Fetch User Failed, ERROR: ", error);
  return { type: FETCH_USER_FAILURE, error: error };
}

export function createUserPending() {
  return { type: CREATE_USER_PENDING };
}

export function createUserSuccess(user) {
  console.log(`New User @${user.username} Created`);
  return { type: CREATE_USER_SUCCESS, payload: user };
}

export function createUserFailure(error) {
  console.log("Failed to Create New User, ERROR: ", error);
  return { type: CREATE_USER_FAILURE, error: error };
}

export function deleteUserPending() {
  return { type: DELETE_USER_PENDING };
}

export function deleteUserSuccess(user) {
  console.log(`Deleted @${user.username} Succesful`);
  return { type: DELETE_USER_SUCCESS, payload: user };
}

export function deleteUserFailure(error) {
  console.log("Delete Failed, ERROR: ", error);
  return { type: DELETE_USER_FAILURE, error: error };
}

export function updateUserPending() {
  return { type: UPDATE_USER_PENDING };
}

export function updateUserSuccess(user) {
  console.log(`@${user.username} Succesfully Updated`);
  return { type: UPDATE_USER_SUCCESS, payload: user };
}

export function updateUserFailure(error) {
  console.log("Update User Failed, ERROR: ", error);
  return { type: UPDATE_USER_FAILURE, error: error };
}
