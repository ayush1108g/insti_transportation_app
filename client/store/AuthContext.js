import React from "react";
import { useState, createContext, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { baseBackendUrl } from "../constant";

const LoginContext = React.createContext({
  isLoggedIn: false,
  token: null,
  userid: null,
  email: null,
  name: null,
  login: () => {},
  logout: () => {},
});

export const LoginContextProvider = (props) => {
  const [token, setToken] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [name, setName] = useState(null);
  const [userid, setUserid] = useState(null);
  const [email, setEmail] = useState(null);

  useEffect(() => {
    const verifyToken = async (token) => {
      try {
        const user = await axios.get(`${baseBackendUrl}/auth`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log(user.data);
        if (user.data.status === "success") {
          return true;
        }
        return false;
      } catch (e) {
        console.log(e);
        return false;
      }
    };

    const checkLoginData = async () => {
      const userData = await AsyncStorage.getItem("userdata");
      if (!userData) {
        return;
      }
      const transformedData = JSON.parse(userData);
      const { token, name, email, userid } = transformedData;
      const tokenIsValid = await verifyToken(token);
      if (!tokenIsValid) {
        return;
      }
      setToken(token);
      setName(name);
      setEmail(email);
      setUserid(userid);
      setIsLoggedIn(true);
      console.log(userid);

      console.log("data checked");
    };
    checkLoginData();
  }, []);

  const loginHandler = async (token, name, userid, email) => {
    const userData = {
      token: token,
      name: name,
      email: email,
      userid: userid,
    };

    setEmail(email);
    setUserid(userid);
    setToken(token);
    setIsLoggedIn(true);
    setName(name);
    storeData(userData);
  };
  const logoutHandler = async () => {
    setToken(null);
    setEmail(null);
    setUserid(null);
    setIsLoggedIn(false);
    setName(null);
    await AsyncStorage.removeItem("userdata");
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
    name: name,
    userid: userid,
    email: email,
    login: loginHandler,
    logout: logoutHandler,
  };

  return (
    <LoginContext.Provider value={context}>
      {props.children}
    </LoginContext.Provider>
  );
};

export default LoginContext;
