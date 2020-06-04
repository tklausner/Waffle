import { combineReducers } from "redux";
import { postReducer } from "./postReducer";
import { feedReducer } from "./feedReducer";
import { authReducer } from "./authReducer";
import { messageReducer } from "./messageReducer";

const rootReducer = combineReducers({
  post: postReducer,
  feed: feedReducer,
  auth: authReducer,
  message: messageReducer,
});
export default rootReducer;
