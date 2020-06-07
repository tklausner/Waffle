import React, { useState, useEffect, createContext } from "react";
import * as firebase from "firebase";
import RouteStack from "./RouteStack";
import SignOutStack from "./SignOutStack";

export const AuthContext = createContext(null);

export const fetchUser = (uid) => {
  console.log("USER", uid);
};

export default function AuthNavigator() {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState(null);

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
  fetchUser(user.uid);
  return user ? (
    <AuthContext.Provider value={user}>
      <RouteStack />
    </AuthContext.Provider>
  ) : (
    <SignOutStack />
  );
}

const mapStateToProps = (state) => {
  return {
    user: state.user.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getUser: (id) => dispatch(getUser(id)),
  };
};

module.export = AuthNavigator;
