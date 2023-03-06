import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
} from "react-native";

const DefaultPostsScreen = ({ route, navigation }) => {
  const [posts, setPosts] = useState([]);
  console.log(posts);
  useEffect(() => {
    if (route.params) {
      setPosts((prevState) => [...prevState, route.params]);
    }
  }, [route.params]);
  return (
    <View style={styles.container}>
      <FlatList
        data={posts}
        keyExtractor={(item, indx) => indx.toString()}
        renderItem={({ item }) => (
          <View style={{ marginBottom: 10 }}>
            <Image
              source={{ uri: item.photo }}
              style={{ width: 300, height: 200 }}
            />
            <TouchableOpacity onPress={() => navigation.navigate("Comments")}>
              <Image source={require("../../assets/img/comments.png")} />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("Map");
              }}
            >
              <Image source={require("../../assets/img/map-pin.png")} />
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default DefaultPostsScreen;
