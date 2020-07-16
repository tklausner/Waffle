import App from "./App";
import messaging from "@react-native-firebase/messaging";

messaging().setBackgroundMessageHandler(async (remoteMessage) => {
  console.log(
    "Notification caused app to open from background state:",
    remoteMessage
  );
});
AppRegistry.registerComponent("main", () => App);
