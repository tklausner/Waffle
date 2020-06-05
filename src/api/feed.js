import axios from "axios";
import {
  fetchFeedsPending,
  fetchFeedsSuccess,
  fetchFeedsFailure,
  fetchFeedPending,
  fetchFeedSuccess,
  fetchFeedFailure,
  createFeedPending,
  createFeedSuccess,
  createFeedFailure,
  deleteFeedPending,
  deleteFeedSuccess,
  deleteFeedFailure,
  updateFeedPending,
  updateFeedSuccess,
  updateFeedFailure,
} from "../store/actions/feedActions";

// root url
const root = "https://waffleapp-server.herokuapp.com/";

// POST FEED
export const newFeed = (feed) => {
  return (dispatch) => {
    dispatch(createFeedPending());
    return axios
      .feed(root + "api/feed", { ...feed })
      .then(({ data }) => {
        dispatch(createFeedSuccess(data));
      })
      .catch((error) => {
        dispatch(createFeedFailure(error));
      });
  };
};

// GET ALL FEEDS
export const readFeeds = () => {
  return (dispatch) => {
    dispatch(fetchFeedsPending());
    return axios
      .get(root + "api/feed")
      .then(({ data }) => {
        dispatch(fetchFeedsSuccess(data));
      })
      .catch((error) => {
        dispatch(fetchFeedsFailure(error));
      });
  };
};

// GET FEED BY ID (feeds[id])
export const getFeed = (id) => {
  return (dispatch) => {
    dispatch(fetchFeedPending());
    return axios
      .get(root + "api/feed/" + id)
      .then(({ data }) => {
        dispatch(fetchFeedSuccess(data));
      })
      .catch((error) => {
        dispatch(fetchFeedFailure(error));
      });
  };
};

// DELETE FEED BY ID
export const deleteFeed = (id) => {
  return (dispatch) => {
    dispatch(deleteFeedPending());
    return axios
      .delete(root + "api/feed/" + id)
      .then(({ data }) => {
        dispatch(deleteFeedSuccess(data));
      })
      .catch((error) => {
        dispatch(deleteFeedFailure(error));
      });
  };
};

// UPDATE FEED
export const updateFeed = (id, feed) => {
  return (dispatch) => {
    dispatch(updateFeedPending());
    return axios
      .put(root + "api/feed/" + id, { ...feed })
      .then(({ data }) => {
        dispatch(updateFeedSuccess(data));
      })
      .catch((error) => {
        dispatch(updateFeedFailure(error));
      });
  };
};
