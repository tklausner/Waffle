import {
  FETCH_POSTS_PENDING,
  FETCH_POSTS_SUCCESS,
  FETCH_POSTS_FAILURE,
  FETCH_POSTS_BY_CATEGORY_PENDING,
  FETCH_POSTS_BY_CATEGORY_SUCCESS,
  FETCH_POSTS_BY_CATEGORY_FAILURE,
  CREATE_POST_PENDING,
  CREATE_POST_SUCCESS,
  CREATE_POST_FAILURE,
} from "../actions/postActions";

const initialState = {
  posts: [],
  products: [
    {
      id: "1",
      product: [
        {
          id: "1",
          post_id: "3982",
          image: require("../../../assets/images/ethan.jpeg"),
        },
        {
          id: "2",
          post_id: "3982",
          image: require("../../../assets/images/ethan.jpeg"),
        },
        {
          id: "3",
          post_id: "3982",
          image: require("../../../assets/images/ethan.jpeg"),
        },
        {
          id: "4",
          post_id: "3982",
          image: require("../../../assets/images/ethan.jpeg"),
        },
      ],
      category: "Hype Wear",
    },
    {
      id: "2",
      product: [
        {
          id: "1",
          post_id: "4000",
          image: require("../../../assets/images/bing.png"),
        },
        {
          id: "2",
          post_id: "4000",
          image: require("../../../assets/images/bing.png"),
        },
        {
          id: "3",
          post_id: "4000",
          image: require("../../../assets/images/bing.png"),
        },
        {
          id: "4",
          post_id: "3982",
          image: require("../../../assets/images/bing.png"),
        },
        {
          id: "5",
          post_id: "4000",
          image: require("../../../assets/images/bing.png"),
        },
        {
          id: "6",
          post_id: "3982",
          image: require("../../../assets/images/bing.png"),
        },
      ],
      category: "Bongs",
    },
    {
      id: "2",
      product: [
        {
          id: "1",
          post_id: "4000",
          image: require("../../../assets/images/OnlineLogo.png"),
        },
        {
          id: "2",
          post_id: "4000",
          image: require("../../../assets/images/OnlineLogo.png"),
        },
        {
          id: "3",
          post_id: "4000",
          image: require("../../../assets/images/OnlineLogo.png"),
        },
        {
          id: "4",
          post_id: "3982",
          image: require("../../../assets/images/OnlineLogo.png"),
        },
        {
          id: "5",
          post_id: "3982",
          image: require("../../../assets/images/OnlineLogo.png"),
        },
      ],
      category: "Waffles",
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
    case FETCH_POSTS_BY_CATEGORY_PENDING:
      return { ...state, pending: true };
    case FETCH_POSTS_BY_CATEGORY_SUCCESS:
      return { ...state, pending: false, products: action.payload };
    case FETCH_POSTS_BY_CATEGORY_FAILURE:
      return { ...state, pending: false, error: action.error };
    case CREATE_POST_PENDING:
      return { ...state, pending: true };
    case CREATE_POST_SUCCESS:
      return { ...state, pending: false, post: action.payload };
    case CREATE_POST_FAILURE:
      return { ...state, pending: false, error: action.error };
    default:
      return state;
  }
}

export const getPosts = (state) => state.posts;
export const getPostsPending = (state) => state.pending;
export const getPostsError = (state) => state.error;
