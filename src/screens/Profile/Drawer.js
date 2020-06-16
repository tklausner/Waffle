import React, { useContext } from "react";
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from "@react-navigation/drawer";

import ProfileScreen from "./ProfileScreen";
import ExploreScreen from "../Explore/ExploreScreen";

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
          onPress={() => {
            logout();
            _logout();
          }}
        />
      </DrawerContentScrollView>
    );
  }

  return (
    <ProfileDrawer.Navigator
      initialRouteName="Profile"
      drawerContent={(props) => <CustomDrawerContent {...props} />}
    >
      <ProfileDrawer.Screen name="Profile" component={ProfileScreen} />
    </ProfileDrawer.Navigator>
  );
}
