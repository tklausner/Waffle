import { combineReducers } from "redux";
import { userReducer } from "./userReducer";
import { postReducer } from "./postReducer";
import { feedReducer } from "./feedReducer";
import { messageReducer } from "./messageReducer";

const rootReducer = combineReducers({
  user: userReducer,
  post: postReducer,
  feed: feedReducer,
  message: messageReducer,
});
export default rootReducer;
