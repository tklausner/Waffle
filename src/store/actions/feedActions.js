// actions

export const FETCH_FEEDS_PENDING = "FETCH_FEEDS_PENDING";
export const FETCH_FEEDS_SUCCESS = "FETCH_FEEDS_SUCCESS";
export const FETCH_FEEDS_FAILURE = "FETCH_FEEDS_FAILURE";

export const FETCH_FEED_PENDING = "FETCH_FEED_PENDING";
export const FETCH_FEED_SUCCESS = "FETCH_FEED_SUCCESS";
export const FETCH_FEED_FAILURE = "FETCH_FEED_FAILURE";

export const CREATE_FEED_PENDING = "CREATE_FEED_PENDING";
export const CREATE_FEED_SUCCESS = "CREATE_FEED_SUCCESS";
export const CREATE_FEED_FAILURE = "CREATE_FEED_FAILURE";

export const DELETE_FEED_PENDING = "DELETE_FEED_PENDING";
export const DELETE_FEED_SUCCESS = "DELETE_FEED_SUCCESS";
export const DELETE_FEED_FAILURE = "DELETE_FEED_FAILURE";

export const UPDATE_FEED_PENDING = "UPDATE_FEED_PENDING";
export const UPDATE_FEED_SUCCESS = "UPDATE_FEED_SUCCESS";
export const UPDATE_FEED_FAILURE = "UPDATE_FEED_FAILURE";

// action creators

export function fetchFeedsPending() {
  return { type: FETCH_FEEDS_PENDING };
}

export function fetchFeedsSuccess(feeds) {
  return { type: FETCH_FEEDS_SUCCESS, payload: feeds };
}

export function fetchFeedsFailure(error) {
  // ("[FEED] Fetch Feeds Failed, ERROR: ", error);
  return { type: FETCH_FEEDS_FAILURE, error: error };
}

export function fetchFeedPending() {
  return { type: FETCH_FEED_PENDING };
}

export function fetchFeedSuccess(feed) {
  // (`[FEED] @${feed.user_id} Fetched`);
  return { type: FETCH_FEED_SUCCESS, payload: feed };
}

export function fetchFeedFailure(error) {
  // ("[FEED] Fetch Feed Failed, ERROR: ", error);
  return { type: FETCH_FEED_FAILURE, error: error };
}

export function createFeedPending() {
  return { type: CREATE_FEED_PENDING };
}

export function createFeedSuccess(feed) {
  // (`[FEED] @${feed.user_id} New Feed`);
  return { type: CREATE_FEED_SUCCESS, payload: feed };
}

export function createFeedFailure(error) {
  // ("[FEED] Upload Failed, ERROR: ", error);
  return { type: CREATE_FEED_FAILURE, error: error };
}

export function deleteFeedPending() {
  return { type: DELETE_FEED_PENDING };
}

export function deleteFeedSuccess(feed) {
  // (`[FEED] @${feed.user_id} Deleted Feed`);
  return { type: DELETE_FEED_SUCCESS, payload: feed };
}

export function deleteFeedFailure(error) {
  // ("[FEED] Delete Failed, ERROR: ", error);
  return { type: DELETE_FEED_FAILURE, error: error };
}

export function updateFeedPending() {
  return { type: UPDATE_FEED_PENDING };
}

export function updateFeedSuccess(feed) {
  // (`[FEED] @${feed.user_id} Updated Feed`);
  return { type: UPDATE_FEED_SUCCESS, payload: feed };
}

export function updateFeedFailure(error) {
  // ("Update Failed, ERROR: ", error);
  return { type: UPDATE_FEED_FAILURE, error: error };
}
