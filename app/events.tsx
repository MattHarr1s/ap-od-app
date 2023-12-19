import { StatusBar } from "expo-status-bar";
import { Platform, StyleSheet, FlatList } from "react-native";
import { Link } from "expo-router";
import { useEffect, useState } from "react";
import { View, useWindowDimensions, Image } from "react-native";
import { Card } from "react-native-paper";
import { Text } from "react-native-paper";
import { Surface } from "react-native-paper";
import { Portal, Modal, Button } from "react-native-paper";
import * as SplashScreen from "expo-splash-screen";

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
SplashScreen.preventAutoHideAsync();
export default function EventsScreen() {
  // Declare the state with the Event array type
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [visible, setVisible] = useState(false);
 
  useEffect(() => {
    const getEvents = async () => {
      const response = await fetch(
        "https://ap-od.org/wp-json/tribe/events/v1/events"
      );
      const json = await response.json();
      setEvents(json.events);
      setLoading(false);
      SplashScreen.hideAsync();
    };

    getEvents();
  }, []);

  return (
    <View style={styles.container}>
      {events.length > 0 && (
        <FlatList
          data={events}
          renderItem={({ item }) => (
            <Link href={`/event/${item.slug}`} key={item.id}>
              <Card style={{backgroundColor: '#fff'}}>
                <Card.Content style={{ flexDirection: "row" }}>
                  <Image
                    source={{ uri: item.image.url }}
                    style={{ width: "30%", height: "100%" }}
                  />
                  <View style={styles.detailsBox}>
                    <Text variant="labelSmall">{`${item.start_date_details.month}/${item.start_date_details.day}/${item.start_date_details.year} - ${item.end_date_details.month}/${item.end_date_details.day}/${item.end_date_details.year}`}</Text>
                    <Text variant="titleSmall" numberOfLines={1} ellipsizeMode='tail'>{item.title}</Text>
                    <Text variant="labelSmall">{`Cost: ${item.cost}`}</Text>
                  </View>
                </Card.Content>
              </Card>
            </Link>
          )}
          keyExtractor={(item) => item.id.toString()} // Ensure id is a string
        />
      )}
      <Portal>
        <Modal
          visible={visible}
          onDismiss={() => setVisible(false)}
          contentContainerStyle={{ backgroundColor: "white", padding: 20 }}
        >
          <Text>Example Modal. Click outside to dismiss.</Text>
        </Modal>
      </Portal>

      {/* Use a light status bar on iOS to account for the black space above the modal */}
      <StatusBar style={Platform.OS === "ios" ? "light" : "auto"} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 20,
    paddingHorizontal: 20,
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
});
