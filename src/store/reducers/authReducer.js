import { combineReducers } from "redux";
import {
  ADD_TODO,
  TOGGLE_TODO,
  SET_VISIBILITY_FILTER,
  VisibilityFilters,
} from "../actions";
const { SHOW_ALL } = VisibilityFilters;

const initialState = {};

export function authReducer(state = initialState, action) {
  return state;
}
