import React from "react";
import { useState, createContext, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { baseBackendUrl } from "../constant";

const LoginContext = React.createContext({
  isLoggedIn: false,
  token: null,
  user: null,
  setUser: () => {},
  //   login: () => {},
  setIsLoggedIn: () => {},
  setToken: () => {},
  logout: () => {},
});

export const LoginContextProvider = (props) => {
  const [token, setToken] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (!user || !token) {
      return;
    }
    AsyncStorage.setItem("token", token);
    AsyncStorage.setItem("user", JSON.stringify(user));
  }, [token, isLoggedIn, user]);

  useEffect(() => {
    const checkLogin = async () => {
      const token = await AsyncStorage.getItem("token");
      const user = await AsyncStorage.getItem("user");
      if (token && user) {
        setToken(token);
        setUser(JSON.parse(user));
        setIsLoggedIn(true);
      }
    };
    checkLogin();
  }, []);
  const logoutHandler = async () => {
    setToken(null);
    setUser(null);
    setIsLoggedIn(false);
    await AsyncStorage.clear();
  };
  const storeData = async (userdata) => {
    try {
      const jsonValue = JSON.stringify(userdata);
      await AsyncStorage.setItem("userdata", jsonValue);
      console.log("data stored");
    } catch (e) {
      console.log("error storing data", e);
    }
  };
  const context = {
    token: token,
    isLoggedIn: isLoggedIn,
    user: user,
    // login: loginHandler,
    setUser: setUser,
    setIsLoggedIn: setIsLoggedIn,
    setToken: setToken,
    logout: logoutHandler,
  };

  return (
    <LoginContext.Provider value={context}>
      {props.children}
    </LoginContext.Provider>
  );
};

export default LoginContext;
