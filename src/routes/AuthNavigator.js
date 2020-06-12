import React, { useState, useEffect, createContext } from "react";
import * as firebase from "firebase";
import RouteStack from "./RouteStack";
import SignOutStack from "./SignOutStack";

import { useSelector } from "react-redux";

export const AuthContext = createContext(null);

export default function AuthNavigator() {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState(null);
  const mongo_user = useSelector((state) => state.user.user);

  function _loadUser() {
    return user != null && mongo_user._id != null;
  }

  // Handle user state changes
  function onAuthStateChanged(result) {
    setUser(result);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const authSubscriber = firebase
      .auth()
      .onAuthStateChanged(onAuthStateChanged);

    // unsubscribe on unmount
    return authSubscriber;
  }, []);

  if (initializing) {
    return null;
  }
  return _loadUser() ? (
    <AuthContext.Provider value={user}>
      <RouteStack />
    </AuthContext.Provider>
  ) : (
    <SignOutStack />
  );
}
