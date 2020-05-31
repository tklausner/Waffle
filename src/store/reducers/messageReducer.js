import {
  FETCH_MESSAGES_PENDING,
  FETCH_MESSAGES_SUCCESS,
  FETCH_MESSAGES_FAILURE,
} from "../actions/messageActions";

const initialState = {
  messages: [
    {
      id: "1",
      username: "tklauklau",
      profile: require("../../../assets/images/teddy.png"),
      content: "blah blah blah",
    },
    {
      id: "2",
      username: "mimi>gaby",
      profile: require("../../../assets/images/ethan.jpeg"),
      content: "Too cool for miami chicks",
    },
    {
      id: "3",
      username: "RoorRus",
      profile: require("../../../assets/images/kyle.jpg"),
      content: "GOD shining his light",
    },
  ],
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
