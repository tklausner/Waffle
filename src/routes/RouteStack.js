import React, { useContext } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createDrawerNavigator } from "@react-navigation/drawer";
import {
  NavigationContainer,
  createAppContainer,
} from "@react-navigation/native";

import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import HomeScreen from "../screens/Home/HomeScreen";
import ExploreScreen from "../screens/Explore/ExploreScreen";
import SellScreen from "../screens/Sell/SellScreen";
import ProfileScreen from "../screens/Profile/ProfileScreen";
import UserProfileScreen from "../screens/Profile/UserProfileScreen";
import MessagingPreviewScreen from "../screens/Messaging/MessagingPreviewScreen";
import MessagingScreen from "../screens/Messaging/MessagingScreen";
import WaffleScreen from "../screens/Waffle/WaffleScreen";
import ProductScreen from "../screens/Waffle/ProductScreen";
import CommentScreen from "../screens/Home/CommentScreen";

import { DefaultHeader } from "../components/headers/DefaultHeader";
import { HomeHeader } from "../components/headers/HomeHeader";
import { MessagesHeader } from "../components/headers/MessagesHeader";
import { ProfileHeader } from "../components/headers/ProfileHeader";
import { ExploreHeader } from "../components/headers/ExploreHeader";
import { SearchHeader } from "../components/headers/SearchHeader";
import { SellImageHeader } from "../components/headers/SellImageHeader";

import { Drawer } from "../screens/Profile/Drawer";

import messaging from "@react-native-firebase/messaging";

// helper function for  getting associated header
function GetHeader(route) {
  switch (route) {
    case "Home":
      return <HomeHeader />;
      break;
    case "Waffle":
    case "Messaging":
    case "Explore_Comments":
    case "Profile_Comments":
    case "Home_Comments":
    case "Profile_Product":
    case "Explore_Product":
    case "Home_Product":
    case "UserProfile":
      return <MessagesHeader />;
      break;
    case "Profile":
      return <ProfileHeader />;
      break;
    case "Explore":
      return <ExploreHeader />;
      break;
    case "Search":
      return <SearchHeader />;
      break;
    case "Sell":
      return <SellImageHeader />;
      break;
    default:
      return <DefaultHeader />;
      break;
  }
}

const MessageStack = createStackNavigator();

function MessageStackScreen() {
  return (
    <MessageStack.Navigator headerMode="none">
      <MessageStack.Screen name="Messages" component={MessagingPreviewScreen} />
      <MessageStack.Screen name="Message" component={MessagingScreen} />
    </MessageStack.Navigator>
  );
}

const HomeStack = createStackNavigator();

function HomeStackScreen() {
  return (
    <HomeStack.Navigator
      headerMode="float"
      screenOptions={({ route }) => ({
        header: () => GetHeader(route.name),
      })}
      initialRouteName="Home"
    >
      <HomeStack.Screen name="Home" component={HomeScreen} />
      <HomeStack.Screen name="Waffle" component={WaffleScreen} />
      <HomeStack.Screen name="Home_Comments" component={CommentScreen} />
      <HomeStack.Screen name="Messaging" component={MessageStackScreen} />
      <HomeStack.Screen name="UserProfile" component={UserProfileScreen} />
      <HomeStack.Screen name="Home_Product" component={ProductScreen} />
    </HomeStack.Navigator>
  );
}

const ExploreStack = createStackNavigator();

function ExploreStackScreen() {
  return (
    <ExploreStack.Navigator headerMode="none">
      <ExploreStack.Screen name="Explore" component={ExploreScreen} />
      <ExploreStack.Screen name="Search" component={ExploreScreen} />
      <ExploreStack.Screen name="Explore_Product" component={ProductScreen} />
      <ExploreStack.Screen name="Explore_Comments" component={CommentScreen} />
    </ExploreStack.Navigator>
  );
}

const SellStack = createStackNavigator();

function SellStackScreen() {
  return (
    <SellStack.Navigator
      headerMode="float"
      screenOptions={({ route }) => ({
        header: () => GetHeader(route.name),
      })}
      initialRouteName="Sell"
    >
      <SellStack.Screen name="Sell" component={SellScreen} />
    </SellStack.Navigator>
  );
}

const ProfileStack = createStackNavigator();

function ProfileStackScreen() {
  return (
    <ProfileStack.Navigator
      name="Profile"
      headerMode="float"
      screenOptions={({ route }) => ({
        header: () => GetHeader(route.name),
      })}
      initialRouteName="Profile"
    >
      <ProfileStack.Screen name="Profile" component={Drawer} />
      <ProfileStack.Screen name="Profile_Product" component={ProductScreen} />
      <ProfileStack.Screen name="Profile_Comments" component={CommentScreen} />
    </ProfileStack.Navigator>
  );
}

const BottomTab = createBottomTabNavigator();
export default function RouteStack() {
  return (
    <NavigationContainer>
      <BottomTab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused }) => {
            let iconName, iconColor;
            if (route.name === "Home") {
              iconName = focused ? "home" : "home-outline";
              iconColor = focused ? "black" : "gray";
            } else if (route.name === "Explore") {
              iconName = "magnify";
              iconColor = focused ? "black" : "gray";
            } else if (route.name === "Sell") {
              iconName = "image-filter-center-focus-weak";
              iconColor = focused ? "black" : "gray";
            } else if (route.name === "Profile") {
              iconName = "account";
              iconColor = focused ? "black" : "gray";
            }

            return (
              <MaterialCommunityIcons
                name={iconName}
                color={iconColor}
                size={30}
              />
            );
          },
        })}
        tabBarOptions={{
          activeTintColor: "black",
          inActiveTintColor: "gray",
          showLabel: false,
        }}
      >
        <BottomTab.Screen name="Home" component={HomeStackScreen} />
        <BottomTab.Screen name="Explore" component={ExploreStackScreen} />
        <BottomTab.Screen name="Sell" component={SellStackScreen} />
        <BottomTab.Screen name="Profile" component={ProfileStackScreen} />
      </BottomTab.Navigator>
    </NavigationContainer>
  );
}
module.export = RouteStack;
