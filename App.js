import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, ActivityIndicator } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import FreeMembership from "./App/Screens/FreeMembership";
import Home from "./App/Screens/Home";
import Login from "./App/Screens/Login";
import PaidMembership from "./App/Screens/PaidMembership";
import Profile from "./App/Screens/Profile";
import Signup from "./App/Screens/Signup";
import Type from "./App/Screens/Type";
import OtpVerify from "./App/Screens/OtpVerify";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Blog from "./App/Screens/Blog";
import ConfirmPayment from "./App/Screens/ConfirmPayment";
import Forgot1 from "./App/Screens/Forgot1";
import Forgot2 from "./App/Screens/Forgot2";
import Forgot3 from "./App/Screens/Forgot3";
import Contactus from "./App/Screens/Contactus";

const Stack = createNativeStackNavigator();
const StackScreens = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Profile" component={Profile} />
      <Stack.Screen name="FreeMembership" component={FreeMembership} />
      <Stack.Screen name="Blog" component={Blog} />
      <Stack.Screen name="contactus" component={Contactus} />
    </Stack.Navigator>
  );
};

const Auth = createNativeStackNavigator();
const AuthScreens = () => {
  return (
    <Auth.Navigator screenOptions={{ headerShown: false }}>
      <Auth.Screen name="Login" component={Login} />
      <Auth.Screen name="signup" component={Signup} />
      <Auth.Screen name="type" component={Type} />
      <Auth.Screen name="otp" component={OtpVerify} />
      <Auth.Screen name="ConfirmPayment" component={ConfirmPayment} />
      <Auth.Screen name="PaidMembership" component={PaidMembership} />
      <Auth.Screen name="forgot1" component={Forgot1} />
      <Auth.Screen name="forgot2" component={Forgot2} />
      <Auth.Screen name="forgot3" component={Forgot3} />
    </Auth.Navigator>
  );
};

const Root = createNativeStackNavigator();
const RootScreen = () => {
  const [token, settoken] = useState(null);
  const [loading, setloading] = useState(true);
  const gettoken = async () => {
    const token = await AsyncStorage.getItem("token");
    if (token) {
      settoken(true);
    } else {
      settoken(false);
    }
  };
  useEffect(() => {
    gettoken();
    setTimeout(() => {
      setloading(false);
    }, 2500);
  }, []);
  if (loading) {
    return <ActivityIndicator />;
  }
  return (
    <Root.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName={token ? "App" : "Auth"}
    >
      <Root.Screen name="App" component={StackScreens} />
      <Root.Screen name="Auth" component={AuthScreens} />
    </Root.Navigator>
  );
};

export default function App() {
  return (
    <NavigationContainer>
      <RootScreen />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
