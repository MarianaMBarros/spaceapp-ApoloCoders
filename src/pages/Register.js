import React, { useState } from "react";
import {
  ImageBackground,
  View,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
} from "react-native";

import star from "../../assets/star.png";
import logo from "../../assets/logo.png";

import {
  addNewUser,
  setUserLogged,
  getUserByEmail,
} from "../service/UserService";
import { validateEmail } from "../service/UtilService";

export default function Register({ navigation }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleSubmit() {
    if (!name) {
      alert("Please fill in the name field");
      return;
    }
    if (!email) {
      alert("Please fill in the email field");
      return;
    }
    if (!validateEmail(email)) {
      alert("Invalid email");
      return;
    }
    if (!password) {
      alert("Please fill in the password field");
      return;
    }

    const user = await getUserByEmail(email);
    if (user) {
      alert("user already registered");
      return;
    }

    const newUser = await addNewUser(email, name, password);
    await setUserLogged(newUser);
    navigation.navigate("Welcome");
  }

  async function handleBack() {
    navigation.navigate("Login");
  }

  return (
    <View style={styles.container}>
      <ImageBackground source={star} style={styles.image}>
        <ImageBackground source={logo} style={styles.logoImg}></ImageBackground>
        <View style={styles.inputView}>
          <TextInput
            style={styles.inputText}
            placeholderTextColor="#FFF"
            placeholder="Name"
            value={name}
            onChangeText={setName}
          />
        </View>
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
        <TouchableOpacity onPress={handleSubmit} style={styles.loginBtn}>
          <Text style={styles.loginText}>REGISTER</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleBack} style={{ marginBottom: 10 }}>
          <Text style={styles.loginText}>Back</Text>
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
    fontSize: 11,
    color: "white",
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
