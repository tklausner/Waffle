import React from "react";
import { View } from "react-native";
import { Container } from "native-base";
import Ionicons from "react-native-vector-icons/Ionicons";
import { createStore, applyMiddleware } from "redux";
import * as firebase from "firebase";

import AuthNavigator from "./src/routes/AuthNavigator";
import rootReducer from "./src/store/reducers/rootReducer";
import { Provider } from "react-redux";
import ApiKeys from "./src/constants/ApiKeys";
import { loadCache } from "./src/utils/index";
import thunk from "redux-thunk";

import SplashScreen from "react-native-splash-screen";
// store containing redux state
const store = createStore(rootReducer, applyMiddleware(thunk));
loadCache();

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isReady: false,
    };

    //Inititalize Firebase
    if (!firebase.apps.length) {
      firebase.initializeApp(ApiKeys.FirebaseConfig);
    }
  }

  async componentDidMount() {
    SplashScreen.hide();
    this.setState({ isReady: true });
  }

  render() {
    return this.state.isReady ? (
      <Provider store={store}>
        <AuthNavigator />
      </Provider>
    ) : null;
  }
}
