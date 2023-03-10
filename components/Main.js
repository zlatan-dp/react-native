import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import RegistrationScreen from "../Screens/auth/RegistrationScreen";
import LoginScreen from "../Screens/auth/LoginScreen";
import MainScreen from "../Screens/mainScreen/Home";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { onAuthStateChanged } from "../redux/auth/authOperations";
const AuthStack = createStackNavigator();

export const Main = () => {
  const { stateChange } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(onAuthStateChanged());
  }, []);
  return (
    <NavigationContainer>
      {stateChange ? (
        <MainScreen />
      ) : (
        <AuthStack.Navigator initialRouteName="Login">
          <AuthStack.Screen
            options={{ headerShown: false }}
            name="Registration"
            component={RegistrationScreen}
          />
          <AuthStack.Screen
            options={{ headerShown: false }}
            name="Login"
            component={LoginScreen}
          />
        </AuthStack.Navigator>
      )}
    </NavigationContainer>
  );
};
