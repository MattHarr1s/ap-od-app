import React, { useState, useEffect } from "react";
import { StoreProvider, useStoreState } from "easy-peasy";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { SplashScreen, Tabs } from "expo-router";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

export default function Home() {
  return (
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
                name={props.focused ? "home-circle" : "home-circle-outline"}
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
                  props.focused ? "calendar-month" : "calendar-month-outline"
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
              onPress={() => {}}
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
          title: "MY PROFILE",
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
                  props.focused ? "account-circle" : "account-circle-outline"
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
  );
}
