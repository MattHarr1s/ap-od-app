import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Text } from "react-native-paper";
import { useFonts } from "expo-font";
import { SplashScreen, Stack } from "expo-router";
import { useEffect } from "react";
import { useColorScheme } from "react-native";
import {
  MD3LightTheme as DefaultTheme,
  PaperProvider,
} from "react-native-paper";
import { Appbar } from "react-native-paper";
import { router } from "expo-router";
import { Auth0Provider } from "react-native-auth0";

import { SafeAreaProvider } from "react-native-safe-area-context";
export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from "expo-router";

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: "home",
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
    ...FontAwesome.font,
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return <RootLayoutNav />;
}

function RootLayoutNav() {
  const colorScheme = useColorScheme();

  return (
    <Auth0Provider
      domain="dev-v4w65pck0ernl172.us.auth0.com"
      clientId="mAbFw0HUixGgHaCl6f6vSwUhbJRNXRIG"
    >
      <PaperProvider theme={DefaultTheme}>
        <SafeAreaProvider>
          <Stack>
            <Stack.Screen name="index" options={{ headerShown: false }} />
            <Stack.Screen
              name="events"
              options={{
                headerShown: true,
                title: "EVENTS",
                headerRight(props) {
                  return (
                    <Appbar.Action
                      icon="tune-variant"
                      onPress={() => {
                        alert("Filter");
                      }}
                    />
                  );
                },
              }}
            />
            <Stack.Screen
              name="news"
              options={{ headerShown: true, title: "NEWS" }}
            />
            <Stack.Screen
              name="profile"
              options={{ headerShown: true, title: "PROFILE" }}
            />
            <Stack.Screen
              name="rewards"
              options={{ headerShown: true, title: "MEMBER REWARDS" }}
            />
            <Stack.Screen name="modal" options={{ presentation: "modal" }} />
          </Stack>
          <Appbar style={styles.appBar}>
            <Appbar.Action
              icon="account"
              onPress={() => {
                router.push("/profile");
              }}
            />
          </Appbar>
        </SafeAreaProvider>
      </PaperProvider>
    </Auth0Provider>
  );
}

const styles = {
  appBar: {
    backgroundColor: "#ffffff",
    color: "#000000",
    justifyContent: "flex-end",
  },
};
