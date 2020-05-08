import { combineReducers } from "redux";
import { postReducer } from "./reducers";

const rootReducer = combineReducers({
  post: postReducer,
});
export default rootReducer;
