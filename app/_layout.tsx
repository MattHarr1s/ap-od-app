import React, { useState, useEffect } from "react";
import { StoreProvider } from 'easy-peasy';
import store from '../components/Store/store';
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

const theme = {
  ...DefaultTheme, // or MD3DarkTheme
  roundness: 2,
  colors: {
    ...DefaultTheme.colors,
    primary: '#ea5b3a', // Red Orange
    accent: '#4caad8', // Blue
    background: '#60155e', // Purple
    surface: '#fcb41c', // Yellow
    text: '#a3cc27', // Green
    backdrop: '#f79731', // Orange
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
      <StoreProvider store={store}>
      <PaperProvider theme={theme}>
        <SafeAreaProvider>
          <Tabs
            safeAreaInsets={{ left: 2, right: 2 }}
            screenOptions={{
              tabBarIconStyle: {
                width: 24,
                height: 24,
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
                      color={props.focused ? "#4caad8" : "#ffffff"}
                      size={24}
                      name={
                        props.focused ? "home-circle" : "home-circle-outline"
                      }
                      backgroundColor={props.focused ? "#ffffff" : "#4caad8"}
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
                tabBarLabelStyle: {
                  color: "#ffffff",
                  backgroundColor: "#60155e",
                  width: "100%",
                  padding: 2,
                },                        
                tabBarIcon(props) {
                  return (
                    <MaterialCommunityIcons
                      color="#ffffff"                       
                      size={24}
                      name={
                        props.focused
                          ? "calendar-month"
                          : "calendar-month-outline"
                      }
                    />
                  );
                },
                tabBarIconStyle: {
                  width: "100%",
                  height: "100%",
                  backgroundColor: "#60155e",
                },
                headerStyle: {
                  backgroundColor: "#60155e",
                  
                },
                headerRight: () => (
                  <MaterialCommunityIcons
                    color="#ffffff"
                    size={24}
                    name="magnify"
                    style={{ marginRight: 10 }}
                    onPress={() => {
                      
                    }}
                  />
                ),
              }}
            />
            <Tabs.Screen
              name="resources"
              options={{
                headerShown: true,
                title: "RESOURCES",
                tabBarLabelStyle: {
                  color: "#ffffff",
                  backgroundColor: "#fcba1c",
                  width: "100%",
                  padding: 2,
                },                
                tabBarIcon(props) {
                  return (
                    <MaterialCommunityIcons
                      color="#ffffff"
                      size={24}
                      name={
                        props.focused
                          ? "newspaper-variant-multiple"
                          : "newspaper-variant-multiple-outline"
                      }
                    />
                  );
                },
                tabBarIconStyle: {
                  width: "100%",
                  height: "100%",
                  backgroundColor: "#fcba1c",
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
                tabBarLabelStyle: {
                  color: "#ffffff",
                  backgroundColor: "#4caad8",
                  width: "100%",
                  padding: 2,
                },                
                tabBarIcon(props) {
                  return (
                    <MaterialCommunityIcons
                      color="#ffffff"
                      size={24}
                      name={props.focused ? "wallet" : "wallet-outline"}
                    />
                  );
                },
                tabBarIconStyle: {
                  width: "100%",
                  height: "100%",
                  backgroundColor: "#4caad8",
                },

              }}
            />
            <Tabs.Screen
              name="profile"
              options={{
                headerShown: true,                               
                title: "PROFILE",
                tabBarLabelStyle: {
                  color: "#ffffff",
                  backgroundColor: "#a3cc27",
                  width: "100%",
                  padding: 2,
                },                

                tabBarIcon(props) {
                  const color = "#ffffff";

                  return (
                    <MaterialCommunityIcons
                      color="#ffffff"
                      size={24}
                      name={
                        props.focused
                          ? "account-circle"
                          : "account-circle-outline"
                      }
                    />
                  );
                },
                tabBarIconStyle: {
                  width: "100%",
                  height: "100%",
                  backgroundColor: "#a3cc27",
                },

              }}
            />
          </Tabs>
        </SafeAreaProvider>
      </PaperProvider>
      </StoreProvider>
    </Auth0Provider>
  );
}
