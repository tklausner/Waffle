import {
  FETCH_MESSAGES_PENDING,
  FETCH_MESSAGES_SUCCESS,
  FETCH_MESSAGES_FAILURE,
} from "../actions/messageActions";

const initialState = {
  messages: [],
  pending: false,
  error: null,
};

export function messageReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_MESSAGES_PENDING:
      return { ...state, pending: true };
    case FETCH_MESSAGES_SUCCESS:
      return { ...state, pending: false, messages: action.payload };
    case FETCH_MESSAGES_FAILURE:
      return { ...state, pending: false, error: action.error };
    default:
      return state;
  }
}

export const getMessages = (state) => state.messages;
export const getMessagesPending = (state) => state.pending;
export const getMessagesError = (state) => state.error;
