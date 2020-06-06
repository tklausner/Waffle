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

// root url
const root = "https://waffleapp-server.herokuapp.com/";

// POST USER
export const newUser = (user) => {
  return (dispatch) => {
    dispatch(createUserPending());
    return axios
      .user(root + "api/user", { ...user })
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
      .get(root + "api/user")
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
      .get(root + "api/user/" + id)
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
      .delete(root + "api/user/" + id)
      .then(({ data }) => {
        dispatch(deleteUserSuccess(data));
      })
      .catch((error) => {
        dispatch(deleteUserFailure(error));
      });
  };
};

// UPDATE USER
export const updateUser = (id, user) => {
  return (dispatch) => {
    dispatch(updateUserPending());
    return axios
      .put(root + "api/user/" + id, { ...user })
      .then(({ data }) => {
        dispatch(updateUserSuccess(data));
      })
      .catch((error) => {
        dispatch(updateUserFailure(error));
      });
  };
};
