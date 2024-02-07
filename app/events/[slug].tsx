import { StatusBar } from "expo-status-bar";
import { Platform, StyleSheet, ScrollView, Image } from "react-native";
import { Link } from "expo-router";
import { useLocalSearchParams, useNavigation } from "expo-router";

import { useEffect, useState } from "react";
import { View, useWindowDimensions } from "react-native";
import { Text, Card, Paragraph, ActivityIndicator } from "react-native-paper";
import { Surface } from "react-native-paper";
import RenderHTML from "react-native-render-html";
import * as SplashScreen from "expo-splash-screen";
SplashScreen.preventAutoHideAsync();

type Event = {
  id: number;
  title: string;
  slug: string;
  date: string;
  excerpt: string;
  cost: string;
  start_date: string;
  start_date_details: {
    year: string;
    month: string;
    day: string;
  };
  description: string;
  end_date: string;
  end_date_details: {
    year: string;
    month: string;
    day: string;
  };
  image: {
    url: string;
  };
  json_ld: {
    "@context": string;
    "@type": string;
    name: string;
    description: string;
    startDate: string;
    endDate: string;
    location: {
      "@type": string;
      name: string;
      address: {
        "@type": string;
        streetAddress: string;
        addressLocality: string;
        postalCode: string;
        addressCountry: string;
      };
    };
    image: string;
    url: string;
  };
};

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
      setEvent(json);
      setLoading(false);
      SplashScreen.hideAsync();
    };
    if (slug) {
      getEvent();
      
    }
  }, []);

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
      <Image source={{ uri: event.image.url }} style={styles.image} />
      <Text
        variant="labelSmall"
        style={styles.label}
      >{`${event.start_date_details.month}/${event.start_date_details.day}/${event.start_date_details.year} - ${event.end_date_details.month}/${event.end_date_details.day}/${event.end_date_details.year}`}</Text>

      <Text
        variant="labelSmall"
        style={styles.label}
      >{`Cost: ${event.cost}`}</Text>
      <ScrollView
        style={{ width: availableWidth }}
        contentContainerStyle={[styles.content, { width: availableWidth }]}
      >
        <RenderHTML
          source={{ html: event.description }}
          contentWidth={availableWidth - 2 * HZ_MARGIN}
          ignoredDomTags={["form"]}
        />
      </ScrollView>

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
