import {
  FETCH_EXPLORES_PENDING,
  FETCH_EXPLORES_SUCCESS,
  FETCH_EXPLORES_FAILURE,
  FETCH_EXPLORE_PENDING,
  FETCH_EXPLORE_SUCCESS,
  FETCH_EXPLORE_FAILURE,
  CREATE_EXPLORE_PENDING,
  CREATE_EXPLORE_SUCCESS,
  CREATE_EXPLORE_FAILURE,
  DELETE_EXPLORE_PENDING,
  DELETE_EXPLORE_SUCCESS,
  DELETE_EXPLORE_FAILURE,
  UPDATE_EXPLORE_PENDING,
  UPDATE_EXPLORE_SUCCESS,
  UPDATE_EXPLORE_FAILURE,
} from "../actions/exploreActions";

const initialState = {
  explore: [],
  pending: false,
  error: null,
};

export function exploreReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_EXPLORES_PENDING:
      return { ...state, pending: true };
    case FETCH_EXPLORES_SUCCESS:
      return { ...state, pending: false, explores: action.payload };
    case FETCH_EXPLORES_FAILURE:
      return { ...state, pending: false, error: action.error };
    case FETCH_EXPLORE_PENDING:
      return { ...state, pending: true };
    case FETCH_EXPLORE_SUCCESS:
      return { ...state, pending: false, explore: action.payload };
    case FETCH_EXPLORE_FAILURE:
      return { ...state, pending: false, error: action.error };
    case CREATE_EXPLORE_PENDING:
      return { ...state, pending: true };
    case CREATE_EXPLORE_SUCCESS:
      return { ...state, pending: false, explore: action.payload };
    case CREATE_EXPLORE_FAILURE:
      return { ...state, pending: false, error: action.error };
    case DELETE_EXPLORE_PENDING:
      return { ...state, pending: true };
    case DELETE_EXPLORE_SUCCESS:
      return { ...state, pending: false, explore: action.payload };
    case DELETE_EXPLORE_FAILURE:
      return { ...state, pending: false, error: action.error };
    case UPDATE_EXPLORE_PENDING:
      return { ...state, pending: true };
    case UPDATE_EXPLORE_SUCCESS:
      return { ...state, pending: false, explore: action.payload };
    case UPDATE_EXPLORE_FAILURE:
      return { ...state, pending: false, error: action.error };
    default:
      return state;
  }
}

export const getExplore = (state) => state.explore;
export const getExplores = (state) => state.explores;
export const getExploresPending = (state) => state.pending;
export const getExploresError = (state) => state.error;
