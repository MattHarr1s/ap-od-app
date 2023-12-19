import { StatusBar } from "expo-status-bar";
import { Platform, StyleSheet, Image } from "react-native";
import { Link } from "expo-router";
import { Button } from "react-native-paper";
import { Card } from "react-native-paper";
import { Surface } from "react-native-paper";
import { ImageBackground, Text, View } from "react-native";
import { useAuth0 } from "react-native-auth0";
const logo = require("../assets/images/ap_logo_left_v2.png");
const purpleBackground = require("../assets/images/purple_button.png");


const LoginButton = () => {
  const {authorize} = useAuth0();

  const onPress = async () => {
      try {
          await authorize();
      } catch (e) {
          console.log(e);
      }
  };

  return <Button onPress={onPress} title="Log in" />
}

export default function HomeScreen() {
  const {authorize, clearSession, user, error, getCredentials, isLoading} = useAuth0();
  return (
    <View style={styles.container}>
      <Image
        source={logo}
        style={{ width: "80%", height: 100, objectFit: "contain" }}
      />

      <LoginButton />
      <Link href="/news" asChild>
      <Button mode="contained" style={styles.buttonOne} >         
          NEWS      
      </Button>
      </Link>
      <Link href="/events" asChild>
        <Button mode="contained" style={styles.buttonTwo}>
       EVENTS
        </Button>
      </Link>
      <Link href="/rewards" asChild>
        <Button mode="contained" style={styles.buttonOne}>
       MEMBER REWARDS
        </Button>
      </Link>
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
  buttonOne: {
    width: "80%",
    height: 100,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgb(122,39,121)",
    color: "white",    
    borderRadius: 30,
    fontSize: 30
  },
  buttonTwo: {
    width: "80%",
    height: 100,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#db4028",
    color: "white",
    borderRadius: 30,
    fontSize: 30
  },
  
});
