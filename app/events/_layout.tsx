import React, { useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { Platform, StyleSheet, ScrollView } from "react-native";
import { Link, SplashScreen, Stack } from "expo-router";
import { useLocalSearchParams } from "expo-router";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

SplashScreen.preventAutoHideAsync();

export default function EventsLayout() {
  return <EventsLayoutNav />;
}

function EventsLayoutNav() {
  return (
    <Stack initialRouteName="index">
      <Stack.Screen
        name="index"
        options={{
          // https://reactnavigation.org/docs/headers#setting-the-header-title

          headerShown: false, // https://reactnavigation.org/docs/headers#adjusting-header-styles
        }}
      />
      <Stack.Screen name="[slug]" options={{ headerShown: false }} />
    </Stack>
  );
}
