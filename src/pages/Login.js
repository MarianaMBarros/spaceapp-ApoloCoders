import React, { useState, useEffect } from "react";
import {
  ImageBackground,
  View,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  AsyncStorage,
} from "react-native";

import api from "../service/api";
import star from "../../assets/star.png";
import logo from "../../assets/logo.png";

import { getUser, setUserLogged, getUserLogged } from "../service/UserService";
import { validateEmail } from "../service/UtilService";

export default function Login({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    async function init() {
      const user = await getUserLogged();
      if (user) {
        await navigate(user);
      }
    }
    init();
  });

  async function navigate(user) {
    if (user.devices && user.devices.length > 0)
      navigation.navigate("HomeHealth");
    else navigation.navigate("Welcome");
  }

  async function handleSubmit() {
    if (!validateEmail(email)) {
      alert("Invalid email");
      return;
    }
    const user = await getUser(email, password);
    if (user) {
      await setUserLogged(user);
      await navigate(user);
    } else {
      alert("Incorrect email or password");
    }
  }

  async function handleRegister() {
    navigation.navigate("Register");
  }

  return (
    <View style={styles.container}>
      <ImageBackground source={star} style={styles.image}>
        <ImageBackground source={logo} style={styles.logoImg}></ImageBackground>
        <View style={styles.inputView}>
          <TextInput
            style={styles.inputText}
            placeholderTextColor="#FFF"
            placeholder="Email"
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
            value={email}
            onChangeText={setEmail}
          />
        </View>
        <View style={styles.inputView}>
          <TextInput
            style={styles.inputText}
            secureTextEntry
            placeholder="Password"
            placeholderTextColor="#FFF"
            value={password}
            onChangeText={setPassword}
          />
        </View>
        {/* <TouchableOpacity>
        <Text style={styles.forgot}>Forgot Password?</Text>
        </TouchableOpacity> */}
        <TouchableOpacity onPress={handleSubmit} style={styles.loginBtn}>
          <Text style={styles.loginText}>LOGIN</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleRegister} style={{ marginBottom: 10 }}>
          <Text style={styles.loginText}>Register</Text>
        </TouchableOpacity>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#00072D",
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    fontWeight: "bold",
    fontSize: 50,
    color: "#fb5b5a",
    marginBottom: 40,
  },
  inputView: {
    width: "80%",
    backgroundColor: "#465881",
    borderRadius: 15,
    height: 50,
    marginBottom: 20,
    justifyContent: "center",
    padding: 20,
  },
  inputText: {
    height: 50,
    color: "white",
  },
  forgot: {
    color: "white",
    fontSize: 11,
  },
  loginBtn: {
    width: "50%",
    backgroundColor: "#fb5b5a",
    borderRadius: 15,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
    marginBottom: 10,
  },
  loginText: {
    color: "white",
  },
  image: {
    width: "100%",
    flex: 1,
    resizeMode: "cover",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  logoImg: {
    width: 250,
    height: 250,
    resizeMode: "cover",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
});
