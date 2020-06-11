import React, { useContext } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  NavigationContainer,
  createAppContainer,
} from "@react-navigation/native";
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";

import HomeScreen from "../screens/Home/HomeScreen";
import ExploreScreen from "../screens/Explore/ExploreScreen";
import SellScreen from "../screens/Sell/SellScreen";
import ProfileScreen from "../screens/Profile/ProfileScreen";
import MessagingPreviewScreen from "../screens/Messaging/MessagingPreviewScreen";
import MessagingScreen from "../screens/Messaging/MessagingScreen";
import WaffleScreen from "../screens/Waffle/WaffleScreen";

import { DefaultHeader } from "../components/headers/DefaultHeader";
import { HomeHeader } from "../components/headers/HomeHeader";
import { MessagesHeader } from "../components/headers/MessagesHeader";
import { ProfileHeader } from "../components/headers/ProfileHeader";
import { ExploreHeader } from "../components/headers/ExploreHeader";
import { SearchHeader } from "../components/headers/SearchHeader";
import { SellImageHeader } from "../components/headers/SellImageHeader";

import { useSelector, useDispatch } from "react-redux";
import { getUserFB } from "../api/user";
import { AuthContext } from "./AuthNavigator";

// helper function for  getting associated header
function GetHeader(route) {
  switch (route) {
    case "Home":
      return <HomeHeader />;
      break;
    case "Waffle":
    case "Messaging":
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
      <HomeStack.Screen name="Messaging" component={MessageStackScreen} />
    </HomeStack.Navigator>
  );
}

const ExploreStack = createStackNavigator();

function ExploreStackScreen() {
  return (
    <ExploreStack.Navigator
      headerMode="float"
      screenOptions={({ route }) => ({
        header: () => GetHeader(route.name),
      })}
    >
      <ExploreStack.Screen name="Explore" component={ExploreScreen} />
      <ExploreStack.Screen name="Search" component={ExploreScreen} />
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
      screenOptions={({ route }) => ({
        header: () => GetHeader(route.name),
      })}
    >
      <ProfileStack.Screen name="Profile" component={ProfileScreen} />
    </ProfileStack.Navigator>
  );
}

const BottomTab = createBottomTabNavigator();
export default function RouteStack() {
  const user = useSelector((state) => state.user.user);

  function _loadUser() {
    console.log("LOADING RS");
    return user._id != null;
  }

  return _loadUser() ? (
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
  ) : null;
}
module.export = RouteStack;
