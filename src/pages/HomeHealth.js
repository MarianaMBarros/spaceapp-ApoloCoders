import React, { useEffect } from "react";
import {
  StyleSheet,
  Text,
  PanResponder,
  View,
  ImageBackground,
} from "react-native";
import { AnimatedCircularProgress } from "react-native-circular-progress";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import EntypoIcon from "react-native-vector-icons/Entypo";

const MAX_POINTS = 100;
import { getUserLogged, logout } from "../service/UserService";

import star from "../../assets/star.png";

export default function HomeHealth({ navigation }) {
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

  const fill = MAX_POINTS * 100;

  async function handleLogout() {
    await logout();
    navigation.navigate("Main");
  }

  return (
    <View style={styles.container}>
      <ImageBackground source={star} style={styles.image}>
        <AnimatedCircularProgress
          size={250}
          width={15}
          fill={90}
          tintColor="#00e0ff"
          backgroundColor="#3d5875"
        >
          {(fill) => (
            <View style={styles.containerText}>
              <Icon
                name="weather-windy"
                size={30}
                color="#FFF"
                style={{ marginTop: 25 }}
              />
              <Text style={styles.points}>90</Text>
              <Text style={styles.quality}>AIR QUALITY</Text>
            </View>
          )}
        </AnimatedCircularProgress>
        <View style={styles.containerEnd}>
          <AnimatedCircularProgress
            size={140}
            width={15}
            fill={50}
            tintColor="#FFFF00"
            backgroundColor="#3d5875"
            style={styles.circularItem}
          >
            {(fill) => (
              <View style={styles.containerText}>
                <EntypoIcon
                  name="water"
                  size={25}
                  color="#FFF"
                  style={{ marginTop: 5 }}
                />
                <Text style={styles.pointsEnd}>50</Text>
                <Text style={styles.qualityEnd}>HUMIDITY</Text>
              </View>
            )}
          </AnimatedCircularProgress>
          <AnimatedCircularProgress
            size={140}
            width={15}
            fill={75}
            tintColor="#00FF00"
            backgroundColor="#3d5875"
            style={styles.circularItem}
          >
            {(fill) => (
              <View style={styles.containerText}>
                <Icon
                  name="weight"
                  size={25}
                  color="#FFF"
                  style={{ marginTop: 5 }}
                />
                <Text style={styles.pointsEnd}>75</Text>
                <Text style={styles.qualityEnd}>PRESSURE</Text>
              </View>
            )}
          </AnimatedCircularProgress>
        </View>
        <Text style={styles.text} onPress={handleLogout}>
          LOGOUT
        </Text>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  containerText: {
    flex: 1,
    justifyContent: "space-evenly",
    alignItems: "center",
    flexDirection: "column",
  },
  circularItem: {
    margin: 20,
  },
  containerEnd: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    paddingBottom: 10,
  },
  pointsEnd: {
    margin: 2,
    flex: 1,
    backgroundColor: "transparent",
    textAlign: "center",
    color: "#FFF",
    fontSize: 30,
  },
  qualityEnd: {
    flex: 1,
    backgroundColor: "transparent",
    textAlign: "center",
    color: "#FFF",
    fontSize: 12,
  },
  points: {
    flex: 1,
    backgroundColor: "transparent",
    width: 90,
    textAlign: "center",
    color: "#FFF",
    fontSize: 50,
    fontWeight: "100",
  },
  quality: {
    flex: 1,
    backgroundColor: "transparent",
    width: 90,
    textAlign: "center",
    color: "#FFF",
    fontSize: 15,
    fontWeight: "100",
  },
  container: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#00072D",
    paddingTop: 50,
  },
  image: {
    width: "100%",
    flex: 1,
    resizeMode: "cover",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "bold",
    padding: 20,
    backgroundColor: "#0B4F6C",
    width: "100%",
    textAlign: "center",
  },
});
