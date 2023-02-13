import React from "react";
import { Image, StyleSheet, TouchableOpacity } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

const MainTab = createBottomTabNavigator();

import PostsScreen from "./PostsScreen";
import CreatePostScreen from "./CreatePostsScreen";
import ProfileScreen from "./ProfileScreen";

export default function MainScreen({ navigation }) {
  return (
    <MainTab.Navigator
      screenOptions={{
        tabBarShowLabel: false,
        headerTitleAlign: "center",
        headerTitleStyle: {
          fontFamily: "Roboto-Medium",
          fontSize: 17,
          color: "#212121",
        },
      }}
    >
      <MainTab.Screen
        options={{
          tabBarIcon: ({ focused, size, color }) => (
            <Image source={require("../../assets/img/posts.png")} />
          ),
          title: "Публикации",
          headerRight: () => (
            <TouchableOpacity
              style={styles.logOutBtn}
              onPress={() => navigation.navigate("Login")}
            >
              <Image source={require("../../assets/img/logOut.png")} />
            </TouchableOpacity>
          ),
        }}
        name="Posts"
        component={PostsScreen}
      />
      <MainTab.Screen
        options={{
          title: "Создать публикацию",
          tabBarIcon: ({ focused, size, color }) => (
            <Image source={require("../../assets/img/addPost.png")} />
          ),
        }}
        name="Create"
        component={CreatePostScreen}
      />
      <MainTab.Screen
        options={{
          title: "Профиль",
          tabBarIcon: ({ focused, size, color }) => (
            <Image source={require("../../assets/img/user.png")} />
          ),
        }}
        name="Profile"
        component={ProfileScreen}
      />
    </MainTab.Navigator>
  );
}

const styles = StyleSheet.create({
  logOutBtn: {
    marginRight: 19,
  },
});
