import "react-native-gesture-handler";
import React, { useState, useEffect, useContext } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Button, Provider as PaperProvider } from "react-native-paper";

import { LoginContextProvider } from "./store/AuthContext";
import Login from "./screens/Login";
import Tabs from "./screens/Tabs";

const Stack = createStackNavigator();

export default function App() {
  return (
    <View style={styles.mainContainer}>
      <LoginContextProvider>
        <PaperProvider>
          <NavigationContainer>
            <Stack.Navigator>
              <Stack.Screen name="Login" component={Login} />
              <Stack.Screen name="Tabs" component={Tabs} />
            </Stack.Navigator>
          </NavigationContainer>
        </PaperProvider>
      </LoginContextProvider>
    </View>
  );
}

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
