import {
  ImageBackground,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

export default function RegistrationScreen() {
  return (
    <View style={styles.container}>
      <ImageBackground
        style={styles.image}
        source={require("../assets/img/bg.png")}
      >
        <Text>lalala</Text>
        <TextInput style={styles.input} textAlign={"center"} />
      </ImageBackground>
    </View>
  );
}
