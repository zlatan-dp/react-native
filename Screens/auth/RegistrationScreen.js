import { useState } from "react";
import {
  ImageBackground,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Platform,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
  Dimensions,
} from "react-native";

import { authSignUp } from "../../redux/auth/authOperations";
import { useDispatch } from "react-redux";

export default function RegistrationScreen({ navigation }) {
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);
  const [login, setLogin] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSecurePassword, setIsSecurePassword] = useState(true);
  const [isFocusedLogin, setIsFocusedLogin] = useState(false);
  const [isFocusedEmail, setIsFocusedEmail] = useState(false);
  const [isFocusedPass, setIsFocusedPass] = useState(false);

  const loginHandler = (text) => setLogin(text);
  const emailHandler = (text) => setEmail(text);
  const passwordHandler = (text) => setPassword(text);

  const dispatch = useDispatch();

  const onSubmit = () => {
    const userData = { login, email, password };
    console.log(userData);
    dispatch(authSignUp(userData));
    setLogin("");
    setEmail("");
    setPassword("");
    keyboardHide();
    // navigation.navigate("Main");
  };

  const keyboardHide = () => {
    setIsShowKeyboard(false);
    Keyboard.dismiss();
  };

  return (
    <TouchableWithoutFeedback onPress={keyboardHide}>
      <View style={styles.container}>
        <ImageBackground
          style={styles.image}
          source={require("../../assets/img/bg.png")}
        >
          <KeyboardAvoidingView behavior={Platform.OS == "ios" && "padding"}>
            <View style={styles.form}>
              <View style={styles.avatarWrapper}>
                <Image
                  style={styles.addIcon}
                  source={require("../../assets/img/add.png")}
                />
              </View>
              <View style={styles.wrapper}>
                <Text style={styles.formTitle}>Регистрация</Text>
              </View>
              <View>
                <TextInput
                  style={{
                    ...styles.input,
                    borderColor: isFocusedLogin ? "#FF6C00" : "#E8E8E8",
                  }}
                  value={login}
                  placeholder={"Логин"}
                  placeholderTextColor={"#BDBDBD"}
                  onFocus={() => {
                    setIsShowKeyboard(true), setIsFocusedLogin(true);
                  }}
                  onBlur={() => setIsFocusedLogin(false)}
                  onChangeText={loginHandler}
                />
                <TextInput
                  style={{
                    ...styles.input,
                    borderColor: isFocusedEmail ? "#FF6C00" : "#E8E8E8",
                  }}
                  value={email}
                  placeholder={"Адрес электронной почты"}
                  placeholderTextColor={"#BDBDBD"}
                  onFocus={() => {
                    setIsShowKeyboard(true), setIsFocusedEmail(true);
                  }}
                  onBlur={() => setIsFocusedEmail(false)}
                  onChangeText={emailHandler}
                />
                <View style={styles.passInpWrap}>
                  <TextInput
                    style={{
                      ...styles.input,
                      borderColor: isFocusedPass ? "#FF6C00" : "#E8E8E8",
                    }}
                    value={password}
                    placeholder={"Пароль"}
                    placeholderTextColor={"#BDBDBD"}
                    secureTextEntry={isSecurePassword}
                    onFocus={() => {
                      setIsShowKeyboard(true), setIsFocusedPass(true);
                    }}
                    onBlur={() => setIsFocusedPass(false)}
                    onChangeText={passwordHandler}
                  />
                  <TouchableOpacity
                    style={styles.showPassBtnWrap}
                    activeOpacity={0.5}
                    onPress={() => setIsSecurePassword(!isSecurePassword)}
                  >
                    <Text style={styles.showPassBtn}>
                      {isSecurePassword ? "Показать" : "Скрыть"}
                    </Text>
                  </TouchableOpacity>
                </View>
                <TouchableOpacity
                  activeOpacity={0.8}
                  style={{
                    ...styles.btn,
                    marginBottom: isShowKeyboard ? 20 : 0,
                  }}
                  onPress={onSubmit}
                >
                  <Text style={styles.textBtn}>Зарегистрироваться</Text>
                </TouchableOpacity>
              </View>

              {!isShowKeyboard && (
                <TouchableOpacity
                  activeOpacity={0.6}
                  style={styles.wrapper}
                  onPress={() => navigation.navigate("Login")}
                >
                  <Text style={styles.linkToLogin}>
                    Уже есть аккаунт? Войти
                  </Text>
                </TouchableOpacity>
              )}
            </View>
          </KeyboardAvoidingView>
        </ImageBackground>
      </View>
    </TouchableWithoutFeedback>
  );
}

// const windowWidth = Dimensions.get("window").width;

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
    position: "relative",
    backgroundColor: "#fff",
    paddingLeft: 16,
    paddingRight: 16,
    paddingTop: 76,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },

  avatarWrapper: {
    position: "absolute",
    right: Dimensions.get("window").width / 2 - 60,
    top: -60,
    width: 120,
    height: 120,
    backgroundColor: "#F6F6F6",
    borderRadius: 16,
  },

  addIcon: {
    position: "absolute",
    right: -12,
    bottom: 14,
    width: 25,
    height: 25,
    resizeMode: "stretch",
  },

  formTitle: {
    // fontFamily: "Pacifico-Regular",
    fontFamily: "Roboto-Medium",
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
    borderRadius: 8,
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    color: "#212121",
    height: 50,
    marginTop: 16,
    padding: 16,
  },

  passInpWrap: {
    position: "relative",
  },

  showPassBtnWrap: {
    position: "absolute",
    right: 16,
    top: 29,
  },

  showPassBtn: {
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    color: "#1B4371",
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
  linkToLogin: {
    fontSize: 16,
    color: "#1B4371",
  },
});
