import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  Text,
  View,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
} from "react-native";

import { ref, onValue } from "firebase/database";
import { database } from "../../firebase/config";

const DefaultPostsScreen = ({ route, navigation }) => {
  const [posts, setPosts] = useState([]);
  // console.log("posts", posts);

  const { login, email } = useSelector((state) => state.auth);

  const getAllPosts = async () => {
    const postsRef = await ref(database, "posts");

    onValue(
      postsRef,
      (snapshot) => {
        setPosts([]);

        snapshot.forEach((childSnapshot) => {
          const userId = childSnapshot.key;
          const userPostsRef = ref(database, `posts/${userId}`);

          onValue(userPostsRef, (postsSnapshot) => {
            postsSnapshot.forEach((postSnapshot) => {
              const childKey = postSnapshot.key;
              const childData = postSnapshot.val();

              let count = 0;

              const postComRef = ref(
                database,
                `posts/${userId}/${childKey}/comments`
              );
              onValue(postComRef, (snapshot) => {
                snapshot.forEach((childSnapshot) => {
                  const childData = childSnapshot.val();
                  // comments.push(childData);
                  if (childData) {
                    count += 1;
                  }
                });
              });

              setPosts((state) => [
                ...state,
                { postId: childKey, ...childData, count },
              ]);
            });
          });
        });
      },
      {
        onlyOnce: false,
      }
    );
  };

  useEffect(() => {
    // setPosts([]);
    getAllPosts();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.userInfo}>
        <View style={styles.userFotoWrap}></View>
        <View style={styles.userTextWrap}>
          <Text style={styles.userLogin}>{login}</Text>
          <Text style={styles.userEmail}>{email}</Text>
        </View>
      </View>
      <FlatList
        data={posts}
        keyExtractor={(item, indx) => indx.toString()}
        renderItem={({ item }) => (
          <View style={styles.postWrap}>
            <View style={styles.imgWrap}>
              <Image source={{ uri: item.photo }} style={styles.photo} />
            </View>

            <Text style={styles.message}>{item.message}</Text>
            <View style={styles.infoWrap}>
              <TouchableOpacity
                style={styles.commentsInfo}
                onPress={() =>
                  navigation.navigate("Comments", {
                    photo: item.photo,
                    postId: item.postId,
                    userId: item.userId,
                  })
                }
              >
                <Image source={require("../../assets/img/comments.png")} />
                <Text style={{ marginLeft: 8 }}>{item.count}</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.locationInfo}
                onPress={() => {
                  navigation.navigate("Map", { location: item.location });
                }}
              >
                <Image source={require("../../assets/img/map-pin.png")} />
                <Text style={{ marginLeft: 8 }}>
                  {item.locationMessage || "Location"}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 32,
    justifyContent: "center",
    marginHorizontal: 16,
    // alignItems: "center",
  },
  userInfo: {
    marginBottom: 32,
    flexDirection: "row",
    alignItems: "center",
  },
  userFotoWrap: {
    width: 60,
    height: 60,
    backgroundColor: "#212121",
    borderRadius: 16,
    marginRight: 8,
  },

  userTextWrap: {},
  userLogin: {
    fontFamily: "Roboto-Bold",
    fontSize: 13,
    color: "#212121",
  },
  userEmail: {
    fontFamily: "Roboto-Regular",
    fontSize: 11,
    color: "rgba(33, 33, 33, 0.8)",
  },

  postWrap: {
    marginBottom: 32,
  },
  imgWrap: {
    borderRadius: 8,
    overflow: "hidden",
    marginBottom: 8,
  },
  photo: {
    width: "100%",
    height: 240,
  },
  infoWrap: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  commentsInfo: {
    // flex: 1,
    flexDirection: "row",
  },
  locationInfo: {
    // flex: 1,
    flexDirection: "row",
  },
  message: {
    fontFamily: "Roboto-Medium",
    fontSize: 16,
    color: "#212121",
    marginBottom: 10,
  },
});

export default DefaultPostsScreen;
