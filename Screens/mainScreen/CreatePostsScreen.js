import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  Alert,
  TextInput,
} from "react-native";
import { Camera } from "expo-camera";
import * as Location from "expo-location";
import { storage, database } from "../../firebase/config";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { ref as refDb, set, push } from "firebase/database";

const CreatePostScreen = ({ navigation }) => {
  // const [hasPermission, setHasPermission] = useState(null);
  const [camera, setCamera] = useState(null);
  const [photo, setPhoto] = useState("");
  const [message, setMessage] = useState("");
  const [location, setLocation] = useState("");
  const [locationMessage, setLocationMessage] = useState("");

  const { userId, login } = useSelector((state) => state.auth);

  const takePhoto = React.useCallback(async () => {
    const photo = await camera.takePictureAsync();
    const locationPhoto = await Location.getCurrentPositionAsync();
    setLocation(locationPhoto);
    console.log(locationPhoto);
    console.log(photo.uri);
    setPhoto(photo.uri);
  });

  const sendPhoto = () => {
    uploadPostToServer();
    // console.log(message);
    // console.log(location);
    setMessage("");
    setPhoto("");
    setLocationMessage("");
    navigation.navigate("DefaultScreen");
  };

  const uploadPhotoToServer = async () => {
    const response = await fetch(photo);
    const file = await response.blob();
    const uniquePostId = Date.now().toString();

    const storageRef = await ref(storage, `postImage/${uniquePostId}`);
    await uploadBytes(storageRef, file);

    const processedPhoto = await getDownloadURL(
      ref(storage, `postImage/${uniquePostId}`)
    );

    return processedPhoto;
  };

  const uploadPostToServer = async () => {
    const photo = await uploadPhotoToServer();
    // const createPost = await set(refDb(database, "posts/" + userId), {
    //   photo,
    //   message,
    //   location: location.coords,

    //   userId,
    //   login,
    // });

    const postListRef = await refDb(database, "posts/" + userId);
    const newPostRef = await push(postListRef);
    await set(newPostRef, {
      photo,
      message,
      location: location.coords,
      locationMessage,
      userId,
      login,
    });
  };

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      console.log(status);
      if (status !== "granted") {
        console.log("Permission to access location was denied");
        Alert.alert("Permission to access location was denied!");
      }
    })();
  }, []);

  // useEffect(() => {
  //   (async () => {
  //     const { status } = await Camera.requestCameraPermissionsAsync();
  //     console.log(status);
  //   })();
  // }, []);

  return (
    <View style={styles.container}>
      <View style={styles.cameraWrap}>
        <Camera style={styles.camera} ref={setCamera}>
          {photo && (
            <View style={styles.takePhotoWrap}>
              <Image
                source={{ uri: photo }}
                style={{ height: 100, width: 150, borderRadius: 10 }}
              />
            </View>
          )}
          <TouchableOpacity
            style={styles.snapWrap}
            activeOpacity={0.6}
            onPress={takePhoto}
          >
            <Image source={require("../../assets/img/camera.png")} />
          </TouchableOpacity>
        </Camera>
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder={"Название..."}
          placeholderTextColor={"#BDBDBD"}
          value={message}
          onChangeText={setMessage}
        />
        <TextInput
          style={styles.input}
          placeholder={"Местность..."}
          placeholderTextColor={"#BDBDBD"}
          value={locationMessage}
          onChangeText={setLocationMessage}
        />
      </View>
      <TouchableOpacity
        activeOpacity={0.8}
        style={locationMessage && photo && message ? styles.btn : styles.disBtn}
        disabled={locationMessage && photo && message ? false : true}
        onPress={sendPhoto}
      >
        <Text style={styles.textBtn}>Опубликовать</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 16,
    // backgroundColor: "#FFFFFF",
    // justifyContent: "center",
    // alignItems: "center",
  },
  cameraWrap: {
    height: 240,
    marginTop: 32,
    borderRadius: 8,
    overflow: "hidden",
    marginBottom: 32,
  },
  camera: {
    height: 240,
    justifyContent: "center",
    alignItems: "center",
  },
  takePhotoWrap: {
    position: "absolute",
    top: 10,
    left: 10,
    borderColor: "#fff",
    borderWidth: 1,
    borderRadius: 10,
  },

  snapWrap: {
    justifyContent: "center",
    alignItems: "center",
    width: 60,
    height: 60,
    backgroundColor: "rgba(255, 255, 255, 0.3)",
    borderRadius: 50,
  },
  btn: {
    backgroundColor: "#FF6C00",
    borderRadius: 100,
    padding: 16,
    marginTop: 16,
    alignItems: "center",
  },
  disBtn: {
    backgroundColor: "#BDBDBD",
    borderRadius: 100,
    padding: 16,
    marginTop: 16,
    alignItems: "center",
  },
  textBtn: {
    color: "#FFFFFF",
  },
  inputContainer: {},
  input: {
    borderBottomWidth: 1,
    borderBottomColor: "#E8E8E8",
    marginBottom: 16,

    fontFamily: "Roboto-Regular",
    fontSize: 16,
    color: "#212121",
    height: 50,
  },
});

export default CreatePostScreen;
