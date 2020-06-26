import axios from "axios";
import {
  fetchCommentsPending,
  fetchCommentsSuccess,
  fetchCommentsFailure,
  fetchCommentPending,
  fetchCommentSuccess,
  fetchCommentFailure,
  createCommentPending,
  createCommentSuccess,
  createCommentFailure,
  deleteCommentPending,
  deleteCommentSuccess,
  deleteCommentFailure,
  updateCommentPending,
  updateCommentSuccess,
  updateCommentFailure,
} from "../store/actions/commentActions";

// root url
const root = "https://waffleapp-server.herokuapp.com/";

// POST COMMENT
export const newComment = (comment) => {
  return (dispatch) => {
    dispatch(createCommentPending());
    return axios
      .post(root + "api/comments", { ...comment })
      .then(({ data }) => {
        dispatch(createCommentSuccess(data));
      })
      .catch((error) => {
        dispatch(createCommentFailure(error));
      });
  };
};

// GET ALL COMMENTS
export const readComments = () => {
  return (dispatch) => {
    dispatch(fetchCommentsPending());
    return axios
      .get(root + "api/comments")
      .then(({ data }) => {
        dispatch(fetchCommentsSuccess(data));
      })
      .catch((error) => {
        dispatch(fetchCommentsFailure(error));
      });
  };
};

// GET COMMENT BY ID (comments[id])
export const getComment = (id) => {
  return (dispatch) => {
    dispatch(fetchCommentPending());
    return axios
      .get(root + "api/comments/" + id)
      .then(({ data }) => {
        dispatch(fetchCommentSuccess(data));
      })
      .catch((error) => {
        dispatch(fetchCommentFailure(error));
      });
  };
};

// GET COMMENT BY POST_ID (comments[id])
export const getCommentsByPost = (id) => {
  return (dispatch) => {
    dispatch(fetchCommentsPending());
    return axios
      .get(root + "api/comments/post/" + id)
      .then(({ data }) => {
        dispatch(fetchCommentsSuccess(data));
      })
      .catch((error) => {
        dispatch(fetchCommentsFailure(error));
      });
  };
};

// GET COMMENT BY USER_ID (comments[id])
export const getCommentsByUser = (id) => {
  return (dispatch) => {
    dispatch(fetchCommentsPending());
    return axios
      .get(root + "api/comments/user/" + id)
      .then(({ data }) => {
        dispatch(fetchCommentsSuccess(data));
      })
      .catch((error) => {
        dispatch(fetchCommentsFailure(error));
      });
  };
};

// DELETE COMMENT BY ID
export const deleteComment = (id) => {
  return (dispatch) => {
    dispatch(deleteCommentPending());
    return axios
      .delete(root + "api/comments/" + id)
      .then(({ data }) => {
        dispatch(deleteCommentSuccess(data));
      })
      .catch((error) => {
        dispatch(deleteCommentFailure(error));
      });
  };
};

// UPDATE COMMENT
export const updateComment = (comment) => {
  return (dispatch) => {
    dispatch(updateCommentPending());
    return axios
      .put(root + "api/comments/" + comment._id, { ...comment })
      .then(({ data }) => {
        dispatch(updateCommentSuccess(data));
      })
      .catch((error) => {
        dispatch(updateCommentFailure(error));
      });
  };
};
