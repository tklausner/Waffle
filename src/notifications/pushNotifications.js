import React, { Component } from "react";
import { Text, View, Button, Vibration, Platform } from 'react-native';
import { Notifications } from 'expo';
import * as Permissions from 'expo-permissions';
import Constants from 'expo-constants';

class pushNotifications extends Component {
  state = {
    expoPushToken: '',
    notification: {},
  };

  registerForPushNotificationsAsync = async () => {
    if (Constants.isDevice) {
      const { status: existingStatus } = await Permissions.getAsync(Permissions.NOTIFICATIONS);
      let finalStatus = existingStatus;
      if (existingStatus !== 'granted') {
        const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
        finalStatus = status;
      }
      token = await Notifications.getExpoPushTokenAsync();
      this.setState({ expoPushToken: token });
    } else {
      alert('Must use physical device for Push Notifications');
    }

    if (Platform.OS === 'android') {
      Notifications.createChannelAndroidAsync('default', {
        name: 'default',
        sound: true,
        priority: 'max',
        vibrate: [0, 250, 250, 250],
      });
    }
  };
  componentDidMount() {
   this.registerForPushNotificationsAsync();

   this._notificationSubscription = Notifications.addListener(this._handleNotification);
 }

 _handleNotification = notification => {
   Vibration.vibrate();
   console.log(notification);
   this.setState({ notification: notification });
 };

 sendPushNotification = async () => {
   const message = {
     to: this.state.expoPushToken,
     sound: 'default',
     title: 'Original Title',
     body: 'And here is the body!',
     data: { data: 'goes here' },
     _displayInForeground: false,
   };
   const response = await fetch('https://exp.host/--/api/v2/push/send', {
     method: 'POST',
     headers: {
       Accept: 'application/json',
       'Accept-encoding': 'gzip, deflate',
       'Content-Type': 'application/json',
     },
     body: JSON.stringify(message),
   });
 };
}
const pushnot= new pushNotifications();
export default pushnot;
