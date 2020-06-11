// actions

export const LOGOUT_USER_PENDING = "LOGOUT_USER_PENDING";
export const LOGOUT_USER_SUCCESS = "LOGOUT_USER_SUCCESS";
export const LOGOUT_USER_FAILURE = "LOGOUT_USER_FAILURE";

export const USER_LOGOUT = "USER_LOGOUT";

// action creators

export function logoutUser() {
  return { type: USER_LOGOUT };
}

export function logoutUserPending() {
  return { type: LOGOUT_USER_PENDING };
}

export function logoutUserSuccess() {
  return { type: LOGOUT_USER_SUCCESS };
}

export function logoutUserFailure(error) {
  return { type: LOGOUT_USER_PENDING, error: error };
}
