import axios from "axios";
import {
  fetchExploresPending,
  fetchExploresSuccess,
  fetchExploresFailure,
  fetchExplorePending,
  fetchExploreSuccess,
  fetchExploreFailure,
  createExplorePending,
  createExploreSuccess,
  createExploreFailure,
  deleteExplorePending,
  deleteExploreSuccess,
  deleteExploreFailure,
  updateExplorePending,
  updateExploreSuccess,
  updateExploreFailure,
} from "../store/actions/exploreActions";

// root url
const root = "https://waffleapp-server.herokuapp.com/";

// POST EXPLORE
export const newExplore = (explore) => {
  return (dispatch) => {
    dispatch(createExplorePending());
    return axios
      .post(root + "api/explore", { ...explore })
      .then(({ data }) => {
        dispatch(createExploreSuccess(data));
      })
      .catch((error) => {
        dispatch(createExploreFailure(error));
      });
  };
};

// GET ALL EXPLORES
export const readExplores = () => {
  return (dispatch) => {
    dispatch(fetchExploresPending());
    return axios
      .get(root + "api/explore")
      .then(({ data }) => {
        dispatch(fetchExploresSuccess(data));
      })
      .catch((error) => {
        dispatch(fetchExploresFailure(error));
      });
  };
};

// GET EXPLORE BY ID (explores[id])
export const getExplore = (id) => {
  return (dispatch) => {
    dispatch(fetchExplorePending());
    return axios
      .get(root + "api/explore/" + id)
      .then(({ data }) => {
        dispatch(fetchExploreSuccess(data));
      })
      .catch((error) => {
        dispatch(fetchExploreFailure(error));
      });
  };
};

// GET EXPLORE BY USER (explores[id])
export const getExploreByUser = (id) => {
  return (dispatch) => {
    dispatch(fetchExplorePending());
    return axios
      .get(root + "api/explore/user/" + id)
      .then(({ data }) => {
        dispatch(fetchExploreSuccess(data));
      })
      .catch((error) => {
        dispatch(fetchExploreFailure(error));
      });
  };
};

// DELETE EXPLORE BY ID
export const deleteExplore = (id) => {
  return (dispatch) => {
    dispatch(deleteExplorePending());
    return axios
      .delete(root + "api/explore/" + id)
      .then(({ data }) => {
        dispatch(deleteExploreSuccess(data));
      })
      .catch((error) => {
        dispatch(deleteExploreFailure(error));
      });
  };
};

// UPDATE EXPLORE
export const updateExplore = (explore) => {
  return (dispatch) => {
    dispatch(updateExplorePending());
    return axios
      .put(root + "api/explore/" + explore._id, { ...explore })
      .then(({ data }) => {
        dispatch(updateExploreSuccess(data));
      })
      .catch((error) => {
        dispatch(updateExploreFailure(error));
      });
  };
};
