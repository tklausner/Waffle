import React from "react";
import { View } from "react-native";
import { AppLoading } from "expo";
import { Container } from "native-base";
import * as Font from "expo-font";
import { Ionicons } from "@expo/vector-icons";
import { createStore, applyMiddleware } from "redux";
import * as firebase from "firebase";

import AuthNavigator from "./src/routes/AuthNavigator";
import rootReducer from "./src/store/reducers/rootReducer";
import { Provider } from "react-redux";
import ApiKeys from "./src/constants/ApiKeys";

import thunk from "redux-thunk";

// store containing redux state
const store = createStore(rootReducer, applyMiddleware(thunk));

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
    await Font.loadAsync({
      Roboto: require("native-base/Fonts/Roboto.ttf"),
      Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf"),
      ...Ionicons.font,
    });
    this.setState({ isReady: true });
  }

  render() {
    if (!this.state.isReady) {
      return <AppLoading />;
    }
    return (
      <Provider store={store}>
          <AuthNavigator />
      </Provider>
    );
  }
}
