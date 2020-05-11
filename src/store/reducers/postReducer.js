import { LOAD_POSTS } from "../actions";

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
    {
      id: "4",
      username: "RoorRus",
      profile: require("../../../assets/images/teddy.png"),
      image: require("../../../assets/images/roor.jpeg"),
      description: "GOD shining his light",
    },
  ],
};

export function postReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_POSTS:
      return state;
    default:
      return state;
  }
}
