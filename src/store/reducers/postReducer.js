import {
  FETCH_POSTS_PENDING,
  FETCH_POSTS_SUCCESS,
  FETCH_POSTS_FAILURE,
  CREATE_POST_PENDING,
  CREATE_POST_SUCCESS,
  CREATE_POST_FAILURE,
} from "../actions/postActions";

const initialState = {
  posts: [],
  pending: false,
  error: null,
};

export function postReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_POSTS_PENDING:
      return { ...state, pending: true };
    case FETCH_POSTS_SUCCESS:
      return { ...state, pending: false, posts: action.payload };
    case FETCH_POSTS_FAILURE:
      return { ...state, pending: false, error: action.error };
    case CREATE_POST_PENDING:
      return { ...state, pending: true };
    case CREATE_POST_SUCCESS:
      return { ...state, pending: false, post: action.payload };
    case CREATE_POST_FAILURE:
      return { ...state, pending: false, error: action.error };
    default:
      return state;
  }
}

export const getPosts = (state) => state.posts;
export const getPostsPending = (state) => state.pending;
export const getPostsError = (state) => state.error;
