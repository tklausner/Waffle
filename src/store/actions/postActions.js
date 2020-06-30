// actions

export const FETCH_POSTS_PENDING = "FETCH_POSTS_PENDING";
export const FETCH_POSTS_SUCCESS = "FETCH_POSTS_SUCCESS";
export const FETCH_POSTS_FAILURE = "FETCH_POSTS_FAILURE";

export const FETCH_POST_PENDING = "FETCH_POST_PENDING";
export const FETCH_POST_SUCCESS = "FETCH_POST_SUCCESS";
export const FETCH_POST_FAILURE = "FETCH_POST_FAILURE";

export const FETCH_POSTS_BY_CATEGORY_PENDING =
  "FETCH_POSTS_BY_CATEGORY_PENDING";
export const FETCH_POSTS_BY_CATEGORY_SUCCESS =
  "FETCH_POSTS_BY_CATEGORY_SUCCESS";
export const FETCH_POSTS_BY_CATEGORY_FAILURE =
  "FETCH_POSTS_BY_CATEGORY_FAILURE";

export const CREATE_POST_PENDING = "CREATE_POST_PENDING";
export const CREATE_POST_SUCCESS = "CREATE_POST_SUCCESS";
export const CREATE_POST_FAILURE = "CREATE_POST_FAILURE";

export const DELETE_POST_PENDING = "DELETE_POST_PENDING";
export const DELETE_POST_SUCCESS = "DELETE_POST_SUCCESS";
export const DELETE_POST_FAILURE = "DELETE_POST_FAILURE";

export const UPDATE_POST_PENDING = "UPDATE_POST_PENDING";
export const UPDATE_POST_SUCCESS = "UPDATE_POST_SUCCESS";
export const UPDATE_POST_FAILURE = "UPDATE_POST_FAILURE";

// action creators

export function fetchPostsPending() {
  return { type: FETCH_POSTS_PENDING };
}

export function fetchPostsSuccess(posts) {
  return { type: FETCH_POSTS_SUCCESS, payload: posts };
}

export function fetchPostsFailure(error) {
  // ("[POST] Fetch Posts Failed, ERROR: ", error);
  return { type: FETCH_POSTS_FAILURE, error: error };
}

export function fetchPostPending() {
  return { type: FETCH_POST_PENDING };
}

export function fetchPostSuccess(post) {
  return { type: FETCH_POST_SUCCESS, payload: post };
}

export function fetchPostFailure(error) {
  // ("[POST] Fetch Post Failed, ERROR: ", error);
  return { type: FETCH_POST_FAILURE, error: error };
}

export function fetchPostPreviewsPending() {
  return { type: FETCH_POSTS_BY_CATEGORY_PENDING };
}

export function fetchPostPreviewsSuccess(previews) {
  return {
    type: FETCH_POSTS_BY_CATEGORY_SUCCESS,
    payload: previews,
  };
}

export function fetchPostPreviewsFailure(error) {
  // ("[POST] Fetch Post Previews Failed, ERROR: ", error);
  return { type: FETCH_POSTS_BY_CATEGORY_FAILURE, error: error };
}

export function createPostPending() {
  return { type: CREATE_POST_PENDING };
}

export function createPostSuccess(post) {
  // (`[POST] @${post.username} Uploaded Item`);
  return { type: CREATE_POST_SUCCESS, payload: post };
}

export function createPostFailure(error) {
  // ("[POST] Upload Failed, ERROR: ", error);
  return { type: CREATE_POST_FAILURE, error: error };
}

export function deletePostPending() {
  return { type: DELETE_POST_PENDING };
}

export function deletePostSuccess(post) {
  // (`[POST] @${post.username} Deleted Item`);
  return { type: DELETE_POST_SUCCESS, payload: post };
}

export function deletePostFailure(error) {
  // ("[POST] Delete Failed, ERROR: ", error);
  return { type: DELETE_POST_FAILURE, error: error };
}

export function updatePostPending() {
  return { type: UPDATE_POST_PENDING };
}

export function updatePostSuccess(post) {
  // (`[POST] @${post.username} Updated Item`);
  return { type: UPDATE_POST_SUCCESS, payload: post };
}

export function updatePostFailure(error) {
  // ("[POST] Update Failed, ERROR: ", error);
  return { type: UPDATE_POST_FAILURE, error: error };
}
