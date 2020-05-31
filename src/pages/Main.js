import React, { useEffect } from "react";
import { ImageBackground, StyleSheet, Text, View } from "react-native";

import star from "../../assets/star.png";
import logo from "../../assets/logo.png";

import { getUserLogged } from "../service/UserService";

export default function Main({ navigation }) {
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

  async function handleLogin() {
    navigation.navigate("Login");
  }

  return (
    <View style={styles.container}>
      <ImageBackground source={star} style={styles.image}>
        <ImageBackground source={logo} style={styles.logoImg}></ImageBackground>
        <Text style={styles.text} onPress={handleLogin}>
          START
        </Text>
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
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "space-between",
    width: "100%",
  },
  text: {
    color: "#fff",
    fontSize: 30,
    fontWeight: "bold",
    padding: 20,
    backgroundColor: "#0B4F6C",
  },
  logoImg: {
    marginTop: 100,
    width: 350,
    height: 400,
  },
});
