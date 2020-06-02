import axios from "axios";
import {
  fetchPostsPending,
  fetchPostsSuccess,
  fetchPostsFailure,
  createPostPending,
  createPostSuccess,
  createPostFailure,
} from "../store/actions/postActions";

// root url
const root = "https://waffleapp-server.herokuapp.com/";

// POST DATA (post)
export const newPost = (post) => {
  return (dispatch) => {
    dispatch(createPostPending());
    return axios
      .post(root + "api/posts", { ...post })
      .then(({ data }) => {
        dispatch(createPostSuccess(data));
      })
      .catch((error) => {
        dispatch(createPostFailure(error));
      });
  };
};

// GET ALL DATA (posts)
export const readPosts = () => {
  return (dispatch) => {
    dispatch(fetchPostsPending());
    return axios
      .get(root + "api/posts")
      .then(({ data }) => {
        dispatch(fetchPostsSuccess(data));
      })
      .catch((error) => {
        dispatch(fetchPostsFailure(error));
      });
  };
};
