import {
  ADD_TODO,
  TOGGLE_TODO,
  SET_VISIBILITY_FILTER,
  VisibilityFilters,
} from "../actions";
const { SHOW_ALL } = VisibilityFilters;

const initialState = {
  posts: [
    {
      id: "1",
      username: "tklauklau",
      profile: require("../../../assets/images/teddy.png"),
      image: require("../../../assets/images/bing.png"),
      description: "Chernobyl x Colbalt",
    },
    {
      id: "2",
      username: "mimi>gaby",
      profile: require("../../../assets/images/ethan.jpeg"),
      image: require("../../../assets/images/ethan.jpeg"),
      description: "Too cool for miami chicks",
    },
    {
      id: "3",
      username: "RoorRus",
      profile: require("../../../assets/images/teddy.png"),
      image: require("../../../assets/images/roor.jpeg"),
      description: "GOD shining his light",
    },
  ],
};

export function postReducer(state = initialState, action) {
  return state;
}

export function visibilityFilter(state = SHOW_ALL, action) {
  switch (action.type) {
    case SET_VISIBILITY_FILTER:
      return action.filter;
    default:
      return state;
  }
}

export function todos(state = [], action) {
  switch (action.type) {
    case ADD_TODO:
      return [
        ...state,
        {
          text: action.text,
          completed: false,
        },
      ];
    case TOGGLE_TODO:
      return state.map((todo, index) => {
        if (index === action.index) {
          return Object.assign({}, todo, {
            completed: !todo.completed,
          });
        }
        return todo;
      });
    default:
      return state;
  }
}
