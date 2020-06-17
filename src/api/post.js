import axios from "axios";
import {
  fetchPostsPending,
  fetchPostsSuccess,
  fetchPostsFailure,
  fetchPostPending,
  fetchPostSuccess,
  fetchPostFailure,
  fetchPostPreviewsPending,
  fetchPostPreviewsSuccess,
  fetchPostPreviewsFailure,
  createPostPending,
  createPostSuccess,
  createPostFailure,
  deletePostPending,
  deletePostSuccess,
  deletePostFailure,
  updatePostPending,
  updatePostSuccess,
  updatePostFailure,
} from "../store/actions/postActions";

// root url
const root = "https://waffleapp-server.herokuapp.com/";

// POST POST
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

// GET ALL POSTS
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

// GET POST BY ID (posts[id])
export const getPost = (id) => {
  return (dispatch) => {
    dispatch(fetchPostPending());
    return axios
      .get(root + "api/posts/" + id)
      .then(({ data }) => {
        dispatch(fetchPostSuccess(data));
      })
      .catch((error) => {
        dispatch(fetchPostFailure(error));
      });
  };
};

// GET POSTS BY CATEGORY (posts[category])
export const readPostsByCategory = (category) => {
  return (dispatch) => {
    dispatch(fetchPostPreviewsPending());
    return axios
      .get(root + "api/posts/category/" + category)
      .then(({ data }) => {
        dispatch(fetchPostPreviewsSuccess(data));
      })
      .catch((error) => {
        dispatch(fetchPostPreviewsFailure(error));
      });
  };
};

// GET POSTS BY USER (posts[user_id])
export const readPostsByUser = (user_id) => {
  return (dispatch) => {
    dispatch(fetchPostsPending());
    return axios
      .get(root + "api/posts/user/" + user_id)
      .then(({ data }) => {
        dispatch(fetchPostsSuccess(data));
      })
      .catch((error) => {
        dispatch(fetchPostsFailure(error));
      });
  };
};

// DELETE POST BY ID
export const deletePost = (id) => {
  return (dispatch) => {
    dispatch(deletePostPending());
    return axios
      .delete(root + "api/posts/" + id)
      .then(({ data }) => {
        dispatch(deletePostSuccess(data));
      })
      .catch((error) => {
        dispatch(deletePostFailure(error));
      });
  };
};

// UPDATE POST
export const updatePost = (id, post) => {
  return (dispatch) => {
    dispatch(updatePostPending());
    return axios
      .put(root + "api/posts/" + id, { ...post })
      .then(({ data }) => {
        dispatch(updatePostSuccess(data));
      })
      .catch((error) => {
        dispatch(updatePostFailure(error));
      });
  };
};
