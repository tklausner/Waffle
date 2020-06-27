import { combineReducers } from "redux";
import { userReducer } from "./userReducer";
import { postReducer } from "./postReducer";
import { feedReducer } from "./feedReducer";
import { exploreReducer } from "./exploreReducer";
import { messageReducer } from "./messageReducer";
import { commentReducer } from "./commentReducer";
import { authReducer } from "./authReducer";

const appReducer = combineReducers({
  auth: authReducer,
  user: userReducer,
  post: postReducer,
  feed: feedReducer,
  comment: commentReducer,
  explore: exploreReducer,
  message: messageReducer,
});

const rootReducer = (state, action) => {
  if (action.type === "USER_LOGOUT") {
    state = undefined;
  }
  return appReducer(state, action);
};
export default rootReducer;
