import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { database } from "../../firebase/config";
import { ref, push, set, onValue } from "firebase/database";
import {
  Text,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  TextInput,
  SafeAreaView,
  FlatList,
} from "react-native";

const CommentsScreen = ({ route }) => {
  const { photo, postId, userId } = route.params;
  const [comment, setComment] = useState("");
  const [allComment, setAllComment] = useState([]);

  const { login } = useSelector((state) => state.auth);

  useEffect(() => {
    getAllComents();
  }, []);

  const createComment = async () => {
    const commentData = {
      login,
      comment,
      date: Date.now(),
    };
    const postRef = await ref(database, `posts/${userId}/${postId}/comments`);
    const newCommentRef = await push(postRef);
    await set(newCommentRef, commentData);
    await setComment("");
  };

  const getAllComents = async () => {
    const postRef = await ref(database, `posts/${userId}/${postId}/comments`);
    onValue(postRef, (snapshot) => {
      setAllComment([]);
      snapshot.forEach((childSnapshot) => {
        const childData = childSnapshot.val();
        // console.log("childData", childData);
        setAllComment((state) => [...state, { ...childData }]);
      });
    });
  };

  const dataFormat = (data) => {
    const date = new Date(data);
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      hour12: false,
      timeZone: "UTC",
    };
    return new Intl.DateTimeFormat("ru-RU", options).format(date);
  };

  return (
    <View style={styles.container}>
      <View style={styles.imgWrap}>
        <Image source={{ uri: photo }} style={{ width: 300, height: 200 }} />
      </View>
      <SafeAreaView style={styles.commentContainer}>
        <FlatList
          data={allComment}
          renderItem={({ item }) => (
            <View style={styles.commentWrap}>
              <Text style={styles.commentTitle}>{item.login}</Text>
              <Text style={styles.commentText}>{item.comment}</Text>
              <Text style={styles.commentData}>{dataFormat(item.date)}</Text>
            </View>
          )}
        />
      </SafeAreaView>
      <View style={styles.commentForm}>
        <TextInput
          style={styles.input}
          placeholder={"Комментировать..."}
          value={comment}
          placeholderTextColor={"#BDBDBD"}
          onChangeText={setComment}
        />
        <TouchableOpacity
          activeOpacity={0.8}
          style={styles.btn}
          onPress={createComment}
        >
          <Image
            style={styles.addCommentIcon}
            source={require("../../assets/img/up.png")}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 32,
    paddingLeft: 16,
    paddingRight: 16,
    paddingBottom: 16,
    // justifyContent: "center",
    // alignItems: "center",
  },
  imgWrap: {
    alignItems: "center",
  },
  commentContainer: {
    flex: 1,
    paddingTop: 32,
    paddingBottom: 32,
  },
  commentWrap: {
    backgroundColor: "rgba(0, 0, 0, 0.03)",
    padding: 16,
    marginBottom: 24,
    borderTopLeftRadius: 6,
    borderTopRightRadius: 0,
    borderBottomLeftRadius: 6,
    borderBottomRightRadius: 6,
  },
  commentTitle: {
    marginBottom: 8,
    fontFamily: "Roboto-Medium",
    fontSize: 13,
    color: "#212121",
  },

  commentText: {
    marginBottom: 8,

    fontFamily: "Roboto-Regular",
    fontSize: 13,
    color: "#212121",
  },
  commentData: {
    fontFamily: "Roboto-Regular",
    fontSize: 10,
    color: "#BDBDBD",
    textAlign: "right",
  },

  commentForm: {
    position: "relative",
    width: "100%",
    // marginTop: 16,
    // borderWidth: 1,
  },
  btn: {
    position: "absolute",
    right: 8,
    top: "50%",
    transform: [{ translateY: -17 }],
    backgroundColor: "#FF6C00",
    borderRadius: 100,
    width: 34,
    height: 34,
    padding: 10,

    alignItems: "center",
  },
  addCommentIcon: {
    width: 10,
    height: 14,
    resizeMode: "stretch",
  },
  input: {
    backgroundColor: "#F6F6F6",
    borderWidth: 1,
    borderRadius: 100,
    borderColor: "#E8E8E8",
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    color: "#212121",
    height: 50,

    padding: 16,
  },
});

export default CommentsScreen;
