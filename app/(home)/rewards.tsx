import { StatusBar } from "expo-status-bar";
import { Platform, StyleSheet, Image } from "react-native";
import { Text } from "react-native-paper";
import {  View } from "react-native";

const logo = require("../../assets/images/ap_logo_left_v2.png");
export default function RewardsScreen() {
  return (
    <View style={styles.container}>
      <Image
        source={logo}
        style={{ width: "80%", height: 100, objectFit: "contain" }}
      />
      <Text variant="titleSmall" style={styles.title}>Please Log In to Access Member Rewards</Text>
      

      {/* Use a light status bar on iOS to account for the black space above the modal */}
      <StatusBar style={Platform.OS === "ios" ? "light" : "auto"} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    width: "100%",
    color: "#000000",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
