import {
  LOGOUT_USER_PENDING,
  LOGOUT_USER_SUCCESS,
  LOGOUT_USER_FAILURE,
} from "../actions/authActions";

const initialState = {
  pending: false,
  error: null,
};

export function authReducer(state = initialState, action) {
  switch (action.type) {
    case LOGOUT_USER_PENDING:
      return { ...state, pending: true };
    case LOGOUT_USER_SUCCESS:
      return { ...state, pending: false, payload: null };
    case LOGOUT_USER_FAILURE:
      return { ...state, pending: false, error: action.error };
    default:
      return state;
  }
}
