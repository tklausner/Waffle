import {
  FETCH_USERS_PENDING,
  FETCH_USERS_SUCCESS,
  FETCH_USERS_FAILURE,
  FETCH_USER_PENDING,
  FETCH_USER_SUCCESS,
  FETCH_USER_FAILURE,
  CREATE_USER_PENDING,
  CREATE_USER_SUCCESS,
  CREATE_USER_FAILURE,
  DELETE_USER_PENDING,
  DELETE_USER_SUCCESS,
  DELETE_USER_FAILURE,
  UPDATE_USER_PENDING,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_FAILURE,
} from "../actions/userActions";

const initialState = {
  users: [],
  user: null,
  pending: false,
  error: null,
};

export function userReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_USERS_PENDING:
      return { ...state, pending: true };
    case FETCH_USERS_SUCCESS:
      return { ...state, pending: false, users: action.payload };
    case FETCH_USERS_FAILURE:
      return { ...state, pending: false, error: action.error };
    case FETCH_USER_PENDING:
      return { ...state, pending: true };
    case FETCH_USER_SUCCESS:
      return { ...state, pending: false, user: action.payload };
    case FETCH_USER_FAILURE:
      return { ...state, pending: false, error: action.error };
    case CREATE_USER_PENDING:
      return { ...state, pending: true };
    case CREATE_USER_SUCCESS:
      return { ...state, pending: false, user: action.payload };
    case CREATE_USER_FAILURE:
      return { ...state, pending: false, error: action.error };
    case DELETE_USER_PENDING:
      return { ...state, pending: true };
    case DELETE_USER_SUCCESS:
      return { ...state, pending: false, user: action.payload };
    case DELETE_USER_FAILURE:
      return { ...state, pending: false, error: action.error };
    case UPDATE_USER_PENDING:
      return { ...state, pending: true };
    case UPDATE_USER_SUCCESS:
      return { ...state, pending: false, user: action.payload };
    case UPDATE_USER_FAILURE:
      return { ...state, pending: false, error: action.error };
    default:
      return state;
  }
}

export const getUser = (state) => state.user;
export const getUsers = (state) => state.users;
export const getUsersPending = (state) => state.pending;
export const getUsersError = (state) => state.error;
