// action types

// POSTS
export const FETCH_POSTS_PENDING = "FETCH_POSTS_PENDING";
export const FETCH_POSTS_SUCCESS = "FETCH_POSTS_SUCCESS";
export const FETCH_POSTS_FAILURE = "FETCH_POSTS_FAILURE";

// MESSAGES
export const FETCH_MESSAGES_PENDING = "FETCH_MESSAGES_PENDING";
export const FETCH_MESSAGES_SUCCESS = "FETCH_MESSAGES_SUCCESS";
export const FETCH_MESSAGES_FAILURE = "FETCH_MESSAGES_FAILURE";

// action creators

// POSTS
export function fetchPostsPending() {
  return { type: FETCH_POSTS_PENDING };
}

export function fetchPostsSuccess(posts) {
  return { type: FETCH_POSTS_SUCCESS, payload: posts };
}

export function fetchPostsFailure(error) {
  return { type: FETCH_POSTS_FAILURE, error: error };
}

// MESSAGES

export function fetchMessagesPending() {
  return { type: FETCH_MESSAGES_PENDING };
}

export function fetchMessagesSuccess(messages) {
  return { type: FETCH_MESSAGES_SUCCESS, payload: messages };
}

export function fetchMessagesFailure(error) {
  return { type: FETCH_MESSAGES_FAILURE, error: error };
}
