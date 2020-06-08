import { combineReducers } from "redux";
import { userReducer } from "./userReducer";
import { postReducer } from "./postReducer";
import { feedReducer } from "./feedReducer";
import { exploreReducer } from "./exploreReducer";
import { messageReducer } from "./messageReducer";

const rootReducer = combineReducers({
  user: userReducer,
  post: postReducer,
  feed: feedReducer,
  explore: exploreReducer,
  message: messageReducer,
});
export default rootReducer;
