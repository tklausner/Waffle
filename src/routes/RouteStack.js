import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  NavigationContainer,
  createAppContainer,
} from "@react-navigation/native";
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";

import HomeScreen from "../screens/HomeScreen";
import ExploreScreen from "../screens/ExploreScreen";
import SellScreen from "../screens/SellScreen";
import ProfileScreen from "../screens/ProfileScreen";
import MessagingPreviewScreen from "../screens/MessagingPreviewScreen";
import MessagingScreen from "../screens/MessagingScreen";

import { DefaultHeader } from "../components/DefaultHeader";
import { HomeHeader } from "../components/HomeHeader";
import { MessagesHeader } from "../components/MessagesHeader";
import { ProfileHeader } from "../components/ProfileHeader";
import { ExploreHeader } from "../components/ExploreHeader";
import { SearchHeader } from "../components/SearchHeader";

const HomeStack = createStackNavigator();

// helper function for  getting associated header
function GetHeader(route) {
  switch (route) {
    case "Home":
      return <HomeHeader />;
      break;
    case "Messages":
    case "Message":
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
    default:
      return <DefaultHeader />;
      break;
  }
}

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
      <HomeStack.Screen name="Messages" component={MessagingPreviewScreen} />
      <HomeStack.Screen name="Message" component={MessagingScreen} />
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
    <SellStack.Navigator>
      <SellStack.Screen
        name="Sell"
        component={SellScreen}
        options={{
          header: () => <DefaultHeader />,
        }}
      />
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
