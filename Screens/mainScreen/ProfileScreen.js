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
import { useDispatch } from "react-redux";
import { authSignOut } from "../../redux/auth/authOperations";

import { ref, onValue, get } from "firebase/database";
import { database } from "../../firebase/config";

const ProfileScreen = ({ route, navigation }) => {
  const [posts, setPosts] = useState([]);
  // console.log("posts", posts);
  const dispatch = useDispatch();
  const signOut = () => {
    dispatch(authSignOut());
  };

  const { userId, login } = useSelector((state) => state.auth);

  const getAllPosts = async () => {
    const postsRef = await ref(database, "posts/" + userId);

    onValue(
      postsRef,
      (snapshot) => {
        setPosts([]);

        snapshot.forEach((childSnapshot) => {
          const childKey = childSnapshot.key;
          const childData = childSnapshot.val();

          const commentsSnapshot = childSnapshot.child("comments");
          console.log("commentsSnapshot", commentsSnapshot.val());

          let count = 0;

          const postRef = ref(database, `posts/${userId}/${childKey}/comments`);

          onValue(postRef, (snapshot) => {
            snapshot.forEach((childSnapshot) => {
              const childData = childSnapshot.val();
              // comments.push(childData);
              if (childData) {
                count += 1;
              }
            });
          });

          // const commentsSnapshot = childSnapshot.child("comments");

          setPosts((state) => [
            ...state,
            { postId: childKey, ...childData, count },
          ]);
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
        </View>
        <TouchableOpacity style={styles.logOutBtn} onPress={signOut}>
          <Image source={require("../../assets/img/logOut.png")} />
        </TouchableOpacity>
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
                  navigation.navigate("Map", { photo: item.photo });
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
    marginBottom: 16,

    alignItems: "center",
  },
  userFotoWrap: {
    width: 120,
    height: 120,
    backgroundColor: "#212121",
    borderRadius: 16,
    marginBottom: 16,
  },

  userTextWrap: {},
  userLogin: {
    fontFamily: "Roboto-Medium",
    fontSize: 30,
    color: "#212121",
  },
  logOutBtn: {
    position: "absolute",
    right: 16,
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

export default ProfileScreen;
