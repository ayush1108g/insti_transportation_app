import "react-native-gesture-handler";
import React, { useState, useEffect, useContext } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Icon from "react-native-vector-icons/FontAwesome";
import { Button, Provider as PaperProvider } from "react-native-paper";

import LoginContext, { LoginContextProvider } from "./store/AuthContext";
import { AlertProvider } from "./store/AlertContext";
import { SocketContextProvider } from "./store/SocketContext";
import {
  requestPermissions,
  scheduleNotificationHandler,
} from "./store/NotificationLocal";

import Login from "./screens/Login";
import Tabs from "./screens/Tabs";

const Stack = createStackNavigator();

export default function AppExtended() {
  return (
    <NavigationContainer>
      <AlertProvider>
        <LoginContextProvider>
          <SocketContextProvider>
            <App />
          </SocketContextProvider>
        </LoginContextProvider>
      </AlertProvider>
    </NavigationContainer>
  );
}

const App = () => {
  const LoginCtx = useContext(LoginContext);
  const navigation = useNavigation();

  useEffect(() => {
    requestPermissions();
  }, []);

  return (
    <View style={styles.mainContainer}>
      <PaperProvider>
        <Stack.Navigator>
          {!LoginCtx.isLoggedIn && (
            <Stack.Screen name="Login" component={Login} />
          )}
          {LoginCtx.isLoggedIn && (
            <Stack.Screen
              name="Tabs"
              component={Tabs}
              options={{
                headerRight: () => (
                  <Icon.Button
                    name="bell-o"
                    color="black"
                    backgroundColor="white"
                    onPress={() => navigation.navigate("Notification")}
                    style={{ marginLeft: 10 }}
                  />
                ),
              }}
            />
          )}
        </Stack.Navigator>
      </PaperProvider>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  mainContainer: {
    flex: 1,
    backgroundColor: "#000000",
    width: "100%",
    height: "100%",
  },
});
