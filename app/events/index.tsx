import React, { useEffect, useState, memo, useCallback } from "react";
import { StatusBar } from "expo-status-bar";
import { ActivityIndicator } from "react-native-paper";
import {
  Platform,
  StyleSheet,
  FlatList,
  Dimensions,
  View,
  Text,
} from "react-native";
import { Card, Surface, Button } from "react-native-paper";
import * as SplashScreen from "expo-splash-screen";
import { Link } from "expo-router";
SplashScreen.preventAutoHideAsync();

const { width, height } = Dimensions.get("window");

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
  end_date: string;
  end_date_details: {
    year: string;
    month: string;
    day: string;
  };
  image: {
    url: string;
  };
};

const keyExtractor = (item: Event) => item.id.toString();

const EventItem = memo(({ item }: { item: Event }) => (
  <Surface key={item.id} style={styles.eventSurface} elevation={3}>
    <Card style={styles.eventCard}>
      <Card.Cover source={{ uri: item.image.url }} resizeMode="contain" />
      <Card.Title title={item.title} subtitle={item.date} />
      <Card.Content>{/* Content here */}</Card.Content>
      <Card.Actions>
        <Link href={`/events/${item.slug}`} asChild>
          <Button>View Event</Button>
        </Link>
      </Card.Actions>
    </Card>
  </Surface>
));

export default function EventsScreen() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  const renderItem = useCallback(
    ({ item }: { item: Event }) => <EventItem item={item} />,
    []
  );

  useEffect(() => {
    const getEvents = async () => {
      try {
        const response = await fetch(
          "https://staging.ap-od.org/wp-json/tribe/events/v1/events"
        );
        const json = await response.json();
        setEvents(json.events);
        setLoading(false);
        SplashScreen.hideAsync();
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };
    getEvents();
  }, []);

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator animating={true} />
      ) : (
        <FlatList
          data={events}
          renderItem={renderItem}
          keyExtractor={keyExtractor}
          initialNumToRender={10}
          maxToRenderPerBatch={10}
          windowSize={5}
        />
      )}
      <StatusBar style={Platform.OS === "ios" ? "light" : "auto"} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  content: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
  detailsBox: {
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginLeft: 10,
    width: "80%",
    padding: 10,
    color: "#000000",
    fontColor: "#000000",
  },
  eventSurface: {
    width: width * 0.8, // Use 80% of the screen width for card
    height: height * 0.4, // Use 40% of the screen height for card
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 10, // Margin on both sides of the card
    marginBottom: 20, // Margin at the bottom of the card
  },
  eventCard: {
    width: "100%", // Card takes the full width of Surface
    height: "100%", // Card takes the full height of Surface
    justifyContent: "flex-start",
  },

  chipContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    flexWrap: "wrap", // Ensures chips wrap to the next line if space is insufficient
    padding: 20,
  },
  chip: {
    margin: 5, // Adjust for spacing between chips
    paddingVertical: 5, // Adjust for vertical padding inside chip
    paddingHorizontal: 10, // Adjust for horizontal padding inside chip
  },
  surface: {
    borderRadius: 15, // Adjust for desired roundness
    overflow: "hidden", // Ensures inner components don't overflow rounded corners
    elevation: 3, // Adjust for desired shadow depth
    margin: 10, // Spacing from the surrounding elements
    backgroundColor: "#fff", // Adjust background color as needed
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    padding: 20,
  },
});
