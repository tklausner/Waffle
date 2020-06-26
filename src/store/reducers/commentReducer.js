import {
  FETCH_COMMENTS_PENDING,
  FETCH_COMMENTS_SUCCESS,
  FETCH_COMMENTS_FAILURE,
  FETCH_COMMENT_PENDING,
  FETCH_COMMENT_SUCCESS,
  FETCH_COMMENT_FAILURE,
  CREATE_COMMENT_PENDING,
  CREATE_COMMENT_SUCCESS,
  CREATE_COMMENT_FAILURE,
  DELETE_COMMENT_PENDING,
  DELETE_COMMENT_SUCCESS,
  DELETE_COMMENT_FAILURE,
  UPDATE_COMMENT_PENDING,
  UPDATE_COMMENT_SUCCESS,
  UPDATE_COMMENT_FAILURE,
} from "../actions/commentActions";

const initialState = {
  comments: [],
  comment: {},
  pending: false,
  error: null,
};

export function commentReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_COMMENTS_PENDING:
      return { ...state, pending: true };
    case FETCH_COMMENTS_SUCCESS:
      console.log("CO@#", action.payload);
      return { ...state, pending: false, comments: action.payload };
    case FETCH_COMMENTS_FAILURE:
      return { ...state, pending: false, error: action.error };
    case FETCH_COMMENT_PENDING:
      return { ...state, pending: true };
    case FETCH_COMMENT_SUCCESS:
      return { ...state, pending: false, comment: action.payload };
    case FETCH_COMMENT_FAILURE:
      return { ...state, pending: false, error: action.error };
    case CREATE_COMMENT_PENDING:
      return { ...state, pending: true };
    case CREATE_COMMENT_SUCCESS:
      return { ...state, pending: false, comment: action.payload };
    case CREATE_COMMENT_FAILURE:
      return { ...state, pending: false, error: action.error };
    case DELETE_COMMENT_PENDING:
      return { ...state, pending: true };
    case DELETE_COMMENT_SUCCESS:
      return { ...state, pending: false, comment: action.payload };
    case DELETE_COMMENT_FAILURE:
      return { ...state, pending: false, error: action.error };
    case UPDATE_COMMENT_PENDING:
      return { ...state, pending: true };
    case UPDATE_COMMENT_SUCCESS:
      return { ...state, pending: false, comment: action.payload };
    case UPDATE_COMMENT_FAILURE:
      return { ...state, pending: false, error: action.error };
    default:
      return state;
  }
}

export const getComment = (state) => state.comment;
export const getComments = (state) => state.comments;
export const getCommentsPending = (state) => state.pending;
export const getCommentsError = (state) => state.error;
