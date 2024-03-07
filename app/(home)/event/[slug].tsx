import { StatusBar } from "expo-status-bar";
import { Platform, StyleSheet, ScrollView, Image } from "react-native";
import { Link } from "expo-router";
import { useLocalSearchParams, useNavigation } from "expo-router";

import { useEffect, useState } from "react";
import { View, useWindowDimensions } from "react-native";
import { Text, Card, Paragraph, ActivityIndicator } from "react-native-paper";
import { Surface } from "react-native-paper";
import RenderHTML from "react-native-render-html";
import { Event } from "../../../types/types";
import { transformEvents } from "../../../utils/transformers";
import * as SplashScreen from "expo-splash-screen";
import EventCard from "../../../components/EventCard";
SplashScreen.preventAutoHideAsync();



const HZ_MARGIN = 10;

export default function EventScreen() {
  const { slug } = useLocalSearchParams();
  const [event, setEvent] = useState<Event | null>(null);
  const [loading, setLoading] = useState(true);
  const { width } = useWindowDimensions();
  const availableWidth = Math.min(width, 500);
  const navigation = useNavigation();
  useEffect(() => {
    const getEvent = async () => {
      const response = await fetch(
        `https://ap-od.org/wp-json/tribe/events/v1/events/by-slug/${slug}`
      );
      const json = await response.json();
      const event = transformEvents([json])[0];
      setEvent(event);
      setLoading(false);
      SplashScreen.hideAsync();
    };
    if (slug) {
      
      getEvent();
      
    }
  }, [slug]);

  useEffect(() => {
    if (event) {
      navigation.setOptions({
        title: event.title,        
      });
    }
  }
  , [event]);

  if (loading || !event) {
    return <ActivityIndicator animating={true} />;
  }

  return (
    <View style={styles.container}>
     <EventCard event={event} isSingle />

      {/* Use a light status bar on iOS to account for the black space above the modal */}
      <StatusBar style={Platform.OS === "ios" ? "light" : "auto"} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 2,
    alignItems: "center",
    justifyContent: "flex-start",
    margin: 20,
    marginTop: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  content: {
    flexGrow: 1,
    alignSelf: "center",
    paddingHorizontal: HZ_MARGIN,
    // leave some space for the FAB
    paddingBottom: 65,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 10,
    color: "#000000",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
  image: {
    width: "100%",
    height: 300,
    borderRadius: 20,
  },
});
