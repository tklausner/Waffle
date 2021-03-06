import React, { useContext } from "react";
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from "@react-navigation/drawer";

import ProfileScreen from "./ProfileScreen";
import ReceiptScreen from "./ReceiptScreen";
import ReviewScreen from "./ReviewScreen";
import SettingsScreen from "./SettingsScreen";

import * as firebase from "firebase";
import { useDispatch } from "react-redux";
import { logout } from "../../api/user";

const ProfileDrawer = createDrawerNavigator();

export function Drawer() {
  const dispatch = useDispatch();
  function _logout() {
    dispatch(logout());
  }

  async function logOut() {
    try {
      await firebase.auth().signOut();
    } catch (e) {
      console.error(e);
    }
  }

  function CustomDrawerContent(props) {
    return (
      <DrawerContentScrollView {...props}>
        <DrawerItemList {...props} />
        <DrawerItem
          label="Log Out"
          labelStyle={{ color: "red" }}
          onPress={() => {
            logOut();
            _logout();
          }}
        />
      </DrawerContentScrollView>
    );
  }

  return (
    <ProfileDrawer.Navigator
      initialRouteName="Profile"
      drawerType="slide"
      drawerPosition="right"
      drawerContent={(props) => <CustomDrawerContent {...props} />}
    >
      <ProfileDrawer.Screen
        name="Profile"
        component={ProfileScreen}
        options={{ swipeEnabled: false }}
      />
      <ProfileDrawer.Screen
        name="Receipts"
        component={ReceiptScreen}
        options={{ swipeEnabled: true }}
      />
      <ProfileDrawer.Screen
        name="Reviews"
        component={ReviewScreen}
        options={{ swipeEnabled: true }}
      />
      <ProfileDrawer.Screen
        name="Settings"
        component={SettingsScreen}
        options={{ swipeEnabled: true }}
      />
    </ProfileDrawer.Navigator>
  );
}
