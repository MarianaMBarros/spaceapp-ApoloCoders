import React from "react";
import { ImageBackground, StyleSheet, Text, View } from "react-native";

import welcome from "../../assets/welcome.png";

export default function Welcome({ navigation }) {
  async function handleScanCode() {
    navigation.navigate("ScanCode");
  }

  return (
    <View style={styles.container}>
      <ImageBackground source={welcome} style={styles.image}>
        <Text style={styles.textQrcode}>
          To tart the journey scan your device's Qrcode
        </Text>
        <Text style={styles.text} onPress={handleScanCode}>
          START
        </Text>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#263A5D",
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  text: {
    color: "#fff",
    fontSize: 30,
    fontWeight: "bold",
    padding: 10,
    backgroundColor: "#0B4F6C",
    width: "100%",
    textAlign: "center",
  },
  textQrcode: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
    paddingBottom: 20,
    margin: 20,
    textAlign: "center",
  },
});
