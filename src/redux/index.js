import { combineReducers, createStore } from "redux";
import * as reducers from "./reducers";

const combinedReducers = combineReducers(reducers);
const store = createStore(combinedReducers);
