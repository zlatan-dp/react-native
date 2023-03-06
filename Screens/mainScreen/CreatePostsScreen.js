import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";
import { Camera } from "expo-camera";
import * as Location from "expo-location";

const CreatePostScreen = ({ navigation }) => {
  // const [hasPermission, setHasPermission] = useState(null);
  const [camera, setCamera] = useState(null);
  const [photo, setPhoto] = useState("");

  const takePhoto = React.useCallback(async () => {
    const photo = await camera.takePictureAsync();
    const location = await Location.getCurrentPositionAsync();
    console.log(location);
    console.log(photo.uri);
    setPhoto(photo.uri);
  });

  // React.useCallback();

  const sendPhoto = () => {
    // console.log(navigation);
    if (photo) navigation.navigate("DefaultScreen", { photo });
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
          <TouchableOpacity
            style={styles.snapWrap}
            activeOpacity={0.6}
            onPress={takePhoto}
          >
            <Image source={require("../../assets/img/camera.png")} />
          </TouchableOpacity>
        </Camera>
      </View>
      <TouchableOpacity
        activeOpacity={0.8}
        style={styles.btn}
        // disabled={true}
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

    // justifyContent: "center",
    // alignItems: "center",
  },
  cameraWrap: {
    height: 240,
    marginTop: 32,
    borderRadius: 8,
    overflow: "hidden",
  },
  camera: {
    height: 240,
    justifyContent: "center",
    alignItems: "center",
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
    marginTop: 43,
    alignItems: "center",
  },
  textBtn: {
    color: "#FFFFFF",
  },
});

export default CreatePostScreen;
