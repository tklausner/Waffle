import {
  FETCH_POSTS_PENDING,
  FETCH_POSTS_SUCCESS,
  FETCH_POSTS_FAILURE,
} from "../actions";

const initialState = {
  posts: [
    {
      id: "1",
      username: "tklauklau",
      profile: require("../../../assets/images/teddy.png"),
      image: require("../../../assets/images/bing.png"),
      description: "Chernobyl x Colbalt",
      value: 1500,
      waffles_remaining: 10,
    },
    {
      id: "2",
      username: "mimi>gaby",
      profile: require("../../../assets/images/ethan.jpeg"),
      image: require("../../../assets/images/ethan.jpeg"),
      description: "Too cool for miami chicks",
      value: 10,
      waffles_remaining: 3,
    },
    {
      id: "3",
      username: "RoorRus",
      profile: require("../../../assets/images/teddy.png"),
      image: require("../../../assets/images/roor.jpeg"),
      description: "GOD shining his light",
      value: 6000,
      waffles_remaining: 5,
    },
    {
      id: "4",
      username: "RoorRus",
      profile: require("../../../assets/images/teddy.png"),
      image: require("../../../assets/images/roor.jpeg"),
      description: "GOD shining his light",
      value: 200,
      waffles_remaining: 9,
    },
  ],
  pending: false,
  error: null,
};

export function postReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_POSTS_PENDING:
      return { ...state, pending: true };
    case FETCH_POSTS_SUCCESS:
      return { ...state, pending: false, posts: action.payload };
    case FETCH_POSTS_FAILURE:
      return { ...state, pending: false, error: action.error };
    default:
      return state;
  }
}

export const getPosts = (state) => state.posts;
export const getPostsPending = (state) => state.pending;
export const getPostsError = (state) => state.error;
