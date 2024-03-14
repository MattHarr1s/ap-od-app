import React, { useState, useEffect } from "react";
import { StoreProvider, useStoreRehydrated, useStoreState } from "easy-peasy";
import AsyncStorage from "@react-native-async-storage/async-storage";
import store from "../components/Store/store";
import { SplashScreen, Stack, useRootNavigationState } from "expo-router";
import { useFonts } from "expo-font";
import { useColorScheme } from "react-native";
import {
  MD3LightTheme as DefaultTheme,
  PaperProvider,
} from "react-native-paper";

import { SafeAreaProvider } from "react-native-safe-area-context";
import { Auth0Provider } from "react-native-auth0";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

const theme = {
  ...DefaultTheme, // or MD3DarkTheme
  roundness: 2,
  colors: {
    ...DefaultTheme.colors,
    primary: "#ea5b3a", // Red Orange
    accent: "#4caad8", // Blue
    background: "#60155e", // Purple
    surface: "#fcb41c", // Yellow
    text: "#a3cc27", // Green
    backdrop: "#f79731", // Orange
  },
};
export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from "expo-router";

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: "index",
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const rootNavigationState = useRootNavigationState();

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
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return <RootLayoutNav />;
}

function OnBoardingLayoutNav() {
  return (
    <Auth0Provider
      domain="dev-v4w65pck0ernl172.us.auth0.com"
      clientId="mAbFw0HUixGgHaCl6f6vSwUhbJRNXRIG"
    >
      <StoreProvider store={store}>
        <PaperProvider theme={theme}>
          <SafeAreaProvider>
            <Stack>
              <Stack.Screen name="index" options={{ headerShown: false }} />
            </Stack>
          </SafeAreaProvider>
        </PaperProvider>
      </StoreProvider>
    </Auth0Provider>
  );
}

function AppContainer() {
  const rehydrated = useStoreRehydrated();
  const onboardingStep = useStoreState((state) => state.onboardingStep);
  if (!rehydrated) {
    return null;
  }



  SplashScreen.hideAsync();
  if(onboardingStep === 5) return (<Stack><Stack.Screen name="(home)" options={{ headerShown: false }}/></Stack>  )
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
    </Stack>
  );
}

function RootLayoutNav() {
  const colorScheme = useColorScheme();

  return (
    <Auth0Provider
      domain="dev-v4w65pck0ernl172.us.auth0.com"
      clientId="mAbFw0HUixGgHaCl6f6vSwUhbJRNXRIG"
    >
      <StoreProvider store={store}>
        <PaperProvider theme={theme}>
          <SafeAreaProvider>
            <AppContainer />
          </SafeAreaProvider>
        </PaperProvider>
      </StoreProvider>
    </Auth0Provider>
  );
}
