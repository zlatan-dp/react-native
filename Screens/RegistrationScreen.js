import { useState } from "react";
import {
  ImageBackground,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  KeyboardAvoidingView,
  Platform,
} from "react-native";

export default function RegistrationScreen() {
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);
  return (
    <View style={styles.container}>
      <ImageBackground
        style={styles.image}
        source={require("../assets/img/bg.png")}
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
          <View style={styles.form}>
            <View style={styles.wrapper}>
              <Text style={styles.formTitle}>Регистрация</Text>
            </View>
            <View>
              <TextInput
                style={styles.input}
                placeholder={"Логин"}
                placeholderTextColor={"#BDBDBD"}
                onFocus={() => setIsShowKeyboard(true)}
              />
              <TextInput
                style={styles.input}
                placeholder={"Адрес электронной почты"}
                placeholderTextColor={"#BDBDBD"}
                onFocus={() => setIsShowKeyboard(true)}
              />
              <TextInput
                style={styles.input}
                placeholder={"Пароль"}
                placeholderTextColor={"#BDBDBD"}
                secureTextEntry={true}
                onFocus={() => setIsShowKeyboard(true)}
              />
            </View>

            <TouchableOpacity activeOpacity={0.8} style={styles.btn}>
              <Text style={styles.textBtn}>Зарегистрироваться</Text>
            </TouchableOpacity>

            <View style={styles.wrapper}>
              <Text style={styles.linkToLogin}>Уже есть аккаунт? Войти</Text>
            </View>

            {/* {!isShowKeyboard && (
                <TouchableOpacity activeOpacity={0.8} style={styles.btn}>
                  <Text style={styles.textBtn}>Зарегистрироваться</Text>
                </TouchableOpacity>
              ) && (
                <View style={styles.wrapper}>
                  <Text style={styles.linkToLogin}>
                    Уже есть аккаунт? Войти
                  </Text>
                </View>
              )} */}
          </View>
        </KeyboardAvoidingView>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "flex-end",
  },
  form: {
    // marginHorizontal: 16,
    backgroundColor: "#fff",
    paddingLeft: 16,
    paddingRight: 16,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },
  formTitle: {
    // fontWeight: 500,
    fontSize: 30,
  },
  wrapper: {
    alignItems: "center",
    marginTop: 16,
    marginBottom: 16,
  },

  input: {
    backgroundColor: "#F6F6F6",
    borderWidth: 1,
    borderColor: "#E8E8E8",
    borderRadius: 8,
    color: "#212121",
    height: 50,
    marginTop: 16,
    padding: 16,
  },
  btn: {
    backgroundColor: "#FF6C00",
    borderRadius: 100,
    padding: 16,
    marginTop: 32,
    alignItems: "center",
  },
  textBtn: {
    color: "#FFFFFF",
  },
  linkToLogin: {
    fontSize: 16,
    color: "#1B4371",
  },
});
