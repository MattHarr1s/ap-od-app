import React, { useState, useEffect } from "react";
import { SplashScreen, Tabs } from "expo-router";
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
          <Tabs
            safeAreaInsets={{ left: 2, right: 2 }}
            screenOptions={{
              tabBarActiveTintColor: "#000000",
              tabBarInactiveTintColor: "#000000",
              tabBarIconStyle: {
                width: 24,
                height: 24,
              },
              tabBarStyle: {
                backgroundColor: "#ffffff",
              },
            }}
          >
            <Tabs.Screen
              name="index"
              options={{
                title: "HOME",
                headerShown: false,
                tabBarIcon(props) {
                  return (
                    <MaterialCommunityIcons
                      color={props.color}
                      size={24}
                      name={
                        props.focused ? "home-circle" : "home-circle-outline"
                      }
                    />
                  );
                },
              }}
            />
            <Tabs.Screen
              name="events"
              options={{
                headerShown: true,
                title: "EVENTS",
                tabBarIcon(props) {
                  return (
                    <MaterialCommunityIcons
                      color={props.color}
                      size={24}
                      name={
                        props.focused
                          ? "calendar-month"
                          : "calendar-month-outline"
                      }
                    />
                  );
                },
              }}
            />
            <Tabs.Screen
              name="resources"
              options={{
                headerShown: true,
                title: "RESOURCES",
                tabBarIcon(props) {
                  return (
                    <MaterialCommunityIcons
                      color={props.color}
                      size={24}
                      name={
                        props.focused
                          ? "newspaper-variant-multiple"
                          : "newspaper-variant-multiple-outline"
                      }
                    />
                  );
                },
              }}
            />
            <Tabs.Screen
              name="resource/[slug]"
              options={{
                headerShown: true,
                title: "Resource",
                href: null,
              }}
            />
            <Tabs.Screen
              name="event/[slug]"
              options={{
                headerShown: true,
                title: "Resource",
                href: null,
              }}
            />
            <Tabs.Screen
              name="rewards"
              options={{
                headerShown: true,
                title: "MEMBERS",
                tabBarIcon(props) {
                  return (
                    <MaterialCommunityIcons
                      color={props.color}
                      size={24}
                      name={props.focused ? "wallet" : "wallet-outline"}
                    />
                  );
                },
              }}
            />
            <Tabs.Screen
              name="profile"
              options={{
                headerShown: true,
                title: "PROFILE",
                tabBarIcon(props) {
                  return (
                    <MaterialCommunityIcons
                      color={props.color}
                      size={24}
                      name={
                        props.focused
                          ? "account-circle"
                          : "account-circle-outline"
                      }
                    />
                  );
                },
              }}
            />
          </Tabs>
        </SafeAreaProvider>
      </PaperProvider>
    </Auth0Provider>
  );
}

const styles = {
  bottomNav: {
    backgroundColor: "#ffffff",
    color: "#000000",
  },
};
