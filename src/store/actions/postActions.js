// actions

export const FETCH_POSTS_PENDING = "FETCH_POSTS_PENDING";
export const FETCH_POSTS_SUCCESS = "FETCH_POSTS_SUCCESS";
export const FETCH_POSTS_FAILURE = "FETCH_POSTS_FAILURE";

export const FETCH_POSTS_BY_CATEGORY_PENDING =
  "FETCH_POSTS_BY_CATEGORY_PENDING";
export const FETCH_POSTS_BY_CATEGORY_SUCCESS =
  "FETCH_POSTS_BY_CATEGORY_SUCCESS";
export const FETCH_POSTS_BY_CATEGORY_FAILURE =
  "FETCH_POSTS_BY_CATEGORY_FAILURE";

export const CREATE_POST_PENDING = "CREATE_POST_PENDING";
export const CREATE_POST_SUCCESS = "CREATE_POST_SUCCESS";
export const CREATE_POST_FAILURE = "CREATE_POST_FAILURE";

// action creators

export function fetchPostsPending() {
  return { type: FETCH_POSTS_PENDING };
}

export function fetchPostsSuccess(posts) {
  return { type: FETCH_POSTS_SUCCESS, payload: posts };
}

export function fetchPostsFailure(error) {
  console.log("Fetch Failed, ERROR: ", error);
  return { type: FETCH_POSTS_FAILURE, error: error };
}

export function fetchProductsPending() {
  return { type: FETCH_POSTS_BY_CATEGORY_PENDING };
}

export function fetchProductsSuccess(posts) {
  return { type: FETCH_POSTS_BY_CATEGORY_SUCCESS, payload: products };
}

export function fetchProductsFailure(error) {
  console.log("Fetch Failed, ERROR: ", error);
  return { type: FETCH_POSTS_BY_CATEGORY_FAILURE, error: error };
}

export function createPostPending() {
  return { type: CREATE_POST_PENDING };
}

export function createPostSuccess(post) {
  console.log(`@${post.username} Succesfully Uploaded Item`);
  return { type: CREATE_POST_SUCCESS, payload: post };
}

export function createPostFailure(error) {
  console.log("Upload Failed, ERROR: ", error);
  return { type: CREATE_POST_FAILURE, error: error };
}
