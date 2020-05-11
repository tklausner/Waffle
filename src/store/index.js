import { combineReducers, createStore } from "redux";

const rootReducer = combineReducers({
  post: postReducer,
});

export const store = createStore(rootReducer);
