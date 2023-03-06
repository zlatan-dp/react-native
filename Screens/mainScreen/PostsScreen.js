import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import DefaultPostsScreen from "../postedScreens/DefaultPostsScreen";
import CommentsScreen from "../postedScreens/CommentsScreen";
import MapScreen from "../postedScreens/MapScreen";
import { Image, StyleSheet, TouchableOpacity } from "react-native";

const PostedScreen = createStackNavigator();

const PostsScreen = ({ navigation }) => {
  return (
    <PostedScreen.Navigator>
      <PostedScreen.Screen
        name="DefaultScreen"
        component={DefaultPostsScreen}
        options={{
          title: "Публикации",
          headerTitleAlign: "center",

          headerRight: () => (
            <TouchableOpacity
              style={styles.logOutBtn}
              onPress={() => navigation.navigate("Login")}
            >
              <Image source={require("../../assets/img/logOut.png")} />
            </TouchableOpacity>
          ),

          headerLeft: () => null,
        }}
      />
      <PostedScreen.Screen
        name="Comments"
        component={CommentsScreen}
        options={{
          title: "Комментарии",
          headerTitleAlign: "center",
          headerBackTitleVisible: false,
        }}
      />
      <PostedScreen.Screen
        name="Map"
        component={MapScreen}
        options={{
          title: "Карта",
          headerBackTitleVisible: false,
          headerTitleAlign: "center",
        }}
      />
    </PostedScreen.Navigator>
  );
};

const styles = StyleSheet.create({
  logOutBtn: {
    marginRight: 19,
  },
});

export default PostsScreen;
