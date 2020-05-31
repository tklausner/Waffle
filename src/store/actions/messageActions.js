// actions

export const FETCH_MESSAGES_PENDING = "FETCH_MESSAGES_PENDING";
export const FETCH_MESSAGES_SUCCESS = "FETCH_MESSAGES_SUCCESS";
export const FETCH_MESSAGES_FAILURE = "FETCH_MESSAGES_FAILURE";

// action creators

export function fetchMessagesPending() {
  return { type: FETCH_MESSAGES_PENDING };
}

export function fetchMessagesSuccess(messages) {
  return { type: FETCH_MESSAGES_SUCCESS, payload: messages };
}

export function fetchMessagesFailure(error) {
  return { type: FETCH_MESSAGES_FAILURE, error: error };
}
