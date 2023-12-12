import { StatusBar } from "expo-status-bar";
import { Platform, StyleSheet, Image } from "react-native";
import { Link } from "expo-router";
import { Button } from "react-native-paper";
import { Card } from "react-native-paper";
import { Surface } from "react-native-paper";
import { ImageBackground, Text, View } from "react-native";

const logo = require("../assets/images/ap_logo_left_v2.png");
const purpleBackground = require("../assets/images/purple_button.png");

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Image
        source={logo}
        style={{ width: "80%", height: 100, objectFit: "contain" }}
      />
      
      <Button mode="elevated" style={styles.button} >
        <ImageBackground source={purpleBackground} style={styles.buttonOneBackground}>         
          NEWS      
        </ImageBackground>
      </Button>
      
      
        <Button mode="elevated" style={styles.button}>
       EVENTS
        </Button>
      
      
        <Button mode="elevated" style={styles.button}>
       MEMBER REWARDS
        </Button>
      
      <StatusBar style={Platform.OS === "ios" ? "light" : "dark"} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  text: {
    fontSize: 30,
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
    width: "100%",
    height: "100%",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
  button: {
    width: "80%",
    height: 100,
    justifyContent: "center",
    alignItems: "center",
    color: "white",
    borderRadius: 30,
    fontSize: 30
  },
  buttonOneBackground: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center", 
  },
});
