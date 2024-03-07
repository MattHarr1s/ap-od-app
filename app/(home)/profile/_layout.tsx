import { StatusBar } from "expo-status-bar";
import { Platform, StyleSheet, Image } from "react-native";
import { Link } from "expo-router";
import { Button } from "react-native-paper";
import { useAuth0 } from "react-native-auth0";
import { List, Text } from "react-native-paper";
import { View } from "react-native";
import LoginForm from "../../../components/forms/LoginForm";
import ProfileForm from "../../../components/forms/ProfileForm";
const ProfileScreen = () => {
  const { authorize, clearSession, user, error, getCredentials, isLoading } =
    useAuth0();

  if (isLoading) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }
  return (
    <View style={styles.container}>
      {user ? (
        <>
          {console.log(user)}
          <ProfileForm user={user} />
          <Button
            mode="contained"
            onPress={() => {
              clearSession();
            }}
          >
            Log Out
          </Button>
        </>
      ) : (
        <>
          <Button
            mode="contained"
            onPress={() => {
              authorize({
                additionalParameters: { ui_locales: "en-US,es-ES" },
              });
            }}
          >
            Log In
          </Button>
        </>
      )}
    </View>
  );
};

export default ProfileScreen;


const styles = StyleSheet.create({
  container: {
    padding: 24,
    flex: 1,
    alignItems: "flex-start",
    justifyContent: "space-between",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  text: {
    fontSize: 30,
    fontWeight: "bold",
    color: "black",
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
    fontSize: 30,
  },
  buttonTwo: {
    width: "80%",
    height: 100,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#db4028",
    color: "white",
    borderRadius: 30,
    fontSize: 30,
  },
});
