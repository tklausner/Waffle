import {
  FETCH_POSTS_PENDING,
  FETCH_POSTS_SUCCESS,
  FETCH_POSTS_FAILURE,
  FETCH_POST_PENDING,
  FETCH_POST_SUCCESS,
  FETCH_POST_FAILURE,
  FETCH_POSTS_BY_CATEGORY_PENDING,
  FETCH_POSTS_BY_CATEGORY_SUCCESS,
  FETCH_POSTS_BY_CATEGORY_FAILURE,
  CREATE_POST_PENDING,
  CREATE_POST_SUCCESS,
  CREATE_POST_FAILURE,
  DELETE_POST_PENDING,
  DELETE_POST_SUCCESS,
  DELETE_POST_FAILURE,
  UPDATE_POST_PENDING,
  UPDATE_POST_SUCCESS,
  UPDATE_POST_FAILURE,
  FETCH_WAFFLE_WINNER_PENDING,
  FETCH_WAFFLE_WINNER_SUCCESS,
  FETCH_WAFFLE_WINNER_FAILURE,
} from "../actions/postActions";

const initialState = {
  post: null,
  posts: [],
  previews: [],
  pending: false,
  error: null,
  winner: null,
};

export function postReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_POSTS_PENDING:
      return { ...state, pending: true };
    case FETCH_POSTS_SUCCESS:
      return { ...state, pending: false, posts: action.payload };
    case FETCH_POSTS_FAILURE:
      return { ...state, pending: false, error: action.error };
    case FETCH_POST_PENDING:
      return { ...state, pending: true };
    case FETCH_POST_SUCCESS:
      return { ...state, pending: false, post: action.payload };
    case FETCH_POST_FAILURE:
      return { ...state, pending: false, error: action.error };
    case FETCH_POSTS_BY_CATEGORY_PENDING:
      return { ...state, pending: true };
    case FETCH_POSTS_BY_CATEGORY_SUCCESS:
      return {
        ...state,
        pending: false,
        previews: action.payload,
      };
    case FETCH_POSTS_BY_CATEGORY_FAILURE:
      return { ...state, pending: false, error: action.error };
    case CREATE_POST_PENDING:
      return { ...state, pending: true };
    case CREATE_POST_SUCCESS:
      return { ...state, pending: false, post: action.payload };
    case CREATE_POST_FAILURE:
      return { ...state, pending: false, error: action.error };
    case DELETE_POST_PENDING:
      return { ...state, pending: true };
    case DELETE_POST_SUCCESS:
      return { ...state, pending: false, post: action.payload };
    case DELETE_POST_FAILURE:
      return { ...state, pending: false, error: action.error };
    case UPDATE_POST_PENDING:
      return { ...state, pending: true };
    case UPDATE_POST_SUCCESS:
      return { ...state, pending: false, post: action.payload };
    case UPDATE_POST_FAILURE:
      return { ...state, pending: false, error: action.error };
    case FETCH_WAFFLE_WINNER_PENDING:
      return { ...state, pending: true };
    case FETCH_WAFFLE_WINNER_SUCCESS:
      return { ...state, pending: false, winner: action.payload };
    case FETCH_WAFFLE_WINNER_FAILURE:
      return { ...state, pending: false, error: action.error };
    default:
      return state;
  }
}

export const getPosts = (state) => state.posts;
export const getPreviews = (state) => state.previews;
export const getPostsPending = (state) => state.pending;
export const getPostsError = (state) => state.error;
export const getPost = (state) => state.post;
export const getWinner = (state) => state.winner;
