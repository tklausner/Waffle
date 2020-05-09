import React from "react";
import { View } from "react-native";
import { AppLoading } from "expo";
import { Container } from "native-base";
import * as Font from "expo-font";
import { Ionicons } from "@expo/vector-icons";
import { createStore } from "redux";

import RouteStack from "./src/routes/RouteStack";
import rootReducer from "./src/store/reducers/rootReducer";
import { Provider } from "react-redux";

// store containing redux state
const store = createStore(rootReducer);

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isReady: false,
    };
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
        <RouteStack />
      </Provider>
    );
  }
}
