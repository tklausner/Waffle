// actions

export const FETCH_COMMENTS_PENDING = "FETCH_COMMENTS_PENDING";
export const FETCH_COMMENTS_SUCCESS = "FETCH_COMMENTS_SUCCESS";
export const FETCH_COMMENTS_FAILURE = "FETCH_COMMENTS_FAILURE";

export const FETCH_COMMENT_PENDING = "FETCH_COMMENT_PENDING";
export const FETCH_COMMENT_SUCCESS = "FETCH_COMMENT_SUCCESS";
export const FETCH_COMMENT_FAILURE = "FETCH_COMMENT_FAILURE";

export const CREATE_COMMENT_PENDING = "CREATE_COMMENT_PENDING";
export const CREATE_COMMENT_SUCCESS = "CREATE_COMMENT_SUCCESS";
export const CREATE_COMMENT_FAILURE = "CREATE_COMMENT_FAILURE";

export const DELETE_COMMENT_PENDING = "DELETE_COMMENT_PENDING";
export const DELETE_COMMENT_SUCCESS = "DELETE_COMMENT_SUCCESS";
export const DELETE_COMMENT_FAILURE = "DELETE_COMMENT_FAILURE";

export const UPDATE_COMMENT_PENDING = "UPDATE_COMMENT_PENDING";
export const UPDATE_COMMENT_SUCCESS = "UPDATE_COMMENT_SUCCESS";
export const UPDATE_COMMENT_FAILURE = "UPDATE_COMMENT_FAILURE";

// action creators

export function fetchCommentsPending() {
  return { type: FETCH_COMMENTS_PENDING };
}

export function fetchCommentsSuccess(comments) {
  return { type: FETCH_COMMENTS_SUCCESS, payload: comments };
}

export function fetchCommentsFailure(error) {
  // ("[COMMENT] Fetch Comments Failed, ERROR: ", error);
  return { type: FETCH_COMMENTS_FAILURE, error: error };
}

export function fetchCommentPending() {
  return { type: FETCH_COMMENT_PENDING };
}

export function fetchCommentSuccess(comment) {
  // (`[COMMENT] @${comment.user_id} Fetched`);
  return { type: FETCH_COMMENT_SUCCESS, payload: comment };
}

export function fetchCommentFailure(error) {
  // ("[COMMENT] Fetch Comment Failed, ERROR: ", error);
  return { type: FETCH_COMMENT_FAILURE, error: error };
}

export function createCommentPending() {
  return { type: CREATE_COMMENT_PENDING };
}

export function createCommentSuccess(comment) {
  // (`[COMMENT] @${comment.user_id} New Comment`);
  return { type: CREATE_COMMENT_SUCCESS, payload: comment };
}

export function createCommentFailure(error) {
  // ("[COMMENT] Upload Failed, ERROR: ", error);
  return { type: CREATE_COMMENT_FAILURE, error: error };
}

export function deleteCommentPending() {
  return { type: DELETE_COMMENT_PENDING };
}

export function deleteCommentSuccess(comment) {
  // (`[COMMENT] @${comment.user_id} Deleted Comment`);
  return { type: DELETE_COMMENT_SUCCESS, payload: comment };
}

export function deleteCommentFailure(error) {
  // ("[COMMENT] Delete Failed, ERROR: ", error);
  return { type: DELETE_COMMENT_FAILURE, error: error };
}

export function updateCommentPending() {
  return { type: UPDATE_COMMENT_PENDING };
}

export function updateCommentSuccess(comment) {
  // (`[COMMENT] @${comment.user_id} Updated Comment`);
  return { type: UPDATE_COMMENT_SUCCESS, payload: comment };
}

export function updateCommentFailure(error) {
  // ("Update Failed, ERROR: ", error);
  return { type: UPDATE_COMMENT_FAILURE, error: error };
}
