import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, Button, ImageBackground } from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";

import { addDeviceToUser } from "../service/UserService";

import star from "../../assets/star.png";

export default function ScanCode({ navigation }) {
  const [hasPermission, setHasPermission] = useState(null);

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  const handleBarCodeScanned = async ({ type, data }) => {
    await addDeviceToUser(data);
    alert(`Device successfully scanned`);
    navigation.navigate("HomeHealth");
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.container}>
      <ImageBackground source={star} style={styles.image}>
        <BarCodeScanner
          onBarCodeScanned={handleBarCodeScanned}
          style={StyleSheet.absoluteFillObject}
        />
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#00072D",
    alignItems: "center",
    flexDirection: "column",
    justifyContent: "flex-end",
  },
  image: {
    width: "100%",
    flex: 1,
    resizeMode: "cover",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
});
