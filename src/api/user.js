import axios from "axios";
import {
  fetchUsersPending,
  fetchUsersSuccess,
  fetchUsersFailure,
  fetchUserPending,
  fetchUserSuccess,
  fetchUserFailure,
  createUserPending,
  createUserSuccess,
  createUserFailure,
  deleteUserPending,
  deleteUserSuccess,
  deleteUserFailure,
  updateUserPending,
  updateUserSuccess,
  updateUserFailure,
} from "../store/actions/userActions";

import { logoutUser } from "../store/actions/authActions";

// root url
const root = "https://waffleapp-server.herokuapp.com/";

export const logout = () => {
  return (dispatch) => {
    dispatch(logoutUser());
  };
};

// POST USER
export const newUser = (user) => {
  return (dispatch) => {
    dispatch(createUserPending());
    return axios
      .post(root + "api/users", { ...user })
      .then(({ data }) => {
        dispatch(createUserSuccess(data));
      })
      .catch((error) => {
        dispatch(createUserFailure(error));
      });
  };
};

// GET ALL USERS
export const readUsers = () => {
  return (dispatch) => {
    dispatch(fetchUsersPending());
    return axios
      .get(root + "api/users")
      .then(({ data }) => {
        dispatch(fetchUsersSuccess(data));
      })
      .catch((error) => {
        dispatch(fetchUsersFailure(error));
      });
  };
};

// GET USER BY ID (users[id])
export const getUser = (id) => {
  return (dispatch) => {
    dispatch(fetchUserPending());
    return axios
      .get(root + "api/users/" + id)
      .then(({ data }) => {
        dispatch(fetchUserSuccess(data));
      })
      .catch((error) => {
        dispatch(fetchUserFailure(error));
      });
  };
};

// GET USER BY FB_ID (users[id])
export const getUserFB = (id) => {
  return (dispatch) => {
    dispatch(fetchUserPending());
    return axios
      .get(root + "api/users/fb/" + id)
      .then(({ data }) => {
        dispatch(fetchUserSuccess(data));
      })
      .catch((error) => {
        dispatch(fetchUserFailure(error));
      });
  };
};

// DELETE USER BY ID
export const deleteUser = (id) => {
  return (dispatch) => {
    dispatch(deleteUserPending());
    return axios
      .delete(root + "api/users/" + id)
      .then(({ data }) => {
        dispatch(deleteUserSuccess(data));
      })
      .catch((error) => {
        dispatch(deleteUserFailure(error));
      });
  };
};

// UPDATE USER
export const updateUser = (user) => {
  return (dispatch) => {
    dispatch(updateUserPending());
    return axios
      .put(root + "api/users/" + user._id, { ...user })
      .then(({ data }) => {
        dispatch(updateUserSuccess(data));
      })
      .catch((error) => {
        dispatch(updateUserFailure(error));
      });
  };
};
