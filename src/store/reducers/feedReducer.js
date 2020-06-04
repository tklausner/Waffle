import {
  FETCH_FEEDS_PENDING,
  FETCH_FEEDS_SUCCESS,
  FETCH_FEEDS_FAILURE,
  FETCH_FEED_PENDING,
  FETCH_FEED_SUCCESS,
  FETCH_FEED_FAILURE,
  CREATE_FEED_PENDING,
  CREATE_FEED_SUCCESS,
  CREATE_FEED_FAILURE,
  DELETE_FEED_PENDING,
  DELETE_FEED_SUCCESS,
  DELETE_FEED_FAILURE,
  UPDATE_FEED_PENDING,
  UPDATE_FEED_SUCCESS,
  UPDATE_FEED_FAILURE,
} from "../actions/feedActions";

const initialState = {
  feeds: [[]],
  feed: [],
  pending: false,
  error: null,
};

export function feedReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_FEEDS_PENDING:
      return { ...state, pending: true };
    case FETCH_FEEDS_SUCCESS:
      return { ...state, pending: false, feeds: action.payload };
    case FETCH_FEEDS_FAILURE:
      return { ...state, pending: false, error: action.error };
    case FETCH_FEED_PENDING:
      return { ...state, pending: true };
    case FETCH_FEED_SUCCESS:
      return { ...state, pending: false, feed: action.payload };
    case FETCH_FEED_FAILURE:
      return { ...state, pending: false, error: action.error };
    case CREATE_FEED_PENDING:
      return { ...state, pending: true };
    case CREATE_FEED_SUCCESS:
      return { ...state, pending: false, feed: action.payload };
    case CREATE_FEED_FAILURE:
      return { ...state, pending: false, error: action.error };
    case DELETE_FEED_PENDING:
      return { ...state, pending: true };
    case DELETE_FEED_SUCCESS:
      return { ...state, pending: false, feed: action.payload };
    case DELETE_FEED_FAILURE:
      return { ...state, pending: false, error: action.error };
    case UPDATE_FEED_PENDING:
      return { ...state, pending: true };
    case UPDATE_FEED_SUCCESS:
      return { ...state, pending: false, feed: action.payload };
    case UPDATE_FEED_FAILURE:
      return { ...state, pending: false, error: action.error };
    default:
      return state;
  }
}

export const getFeed = (state) => state.feed;
export const getFeeds = (state) => state.feeds;
export const getFeedsPending = (state) => state.pending;
export const getFeedsError = (state) => state.error;
