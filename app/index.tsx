import React, { useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { Platform, StyleSheet, Image, Dimensions } from "react-native";
import { Link } from "expo-router";
import { Button } from "react-native-paper";
import { Card, Divider, Text } from "react-native-paper";
import { Surface } from "react-native-paper";
import { ImageBackground, View } from "react-native";
import { SwiperFlatList } from "react-native-swiper-flatlist";

import { useAuth0 } from "react-native-auth0";
const logo = require("../assets/images/ap_logo_left_v2.png");
const purpleBackground = require("../assets/images/purple_button.png");
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
  venue: {
    address: {
      zip: string;
    };
  };
};

export default function HomeScreen() {
  const { authorize, clearSession, user, error, getCredentials, isLoading } =
    useAuth0();
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getEvents = async () => {
      const response = await fetch(
        "https://staging.ap-od.org/wp-json/tribe/events/v1/events"
      );
      const json = await response.json();
        console.log(json.events);
      setEvents(json.events);
      setLoading(false);
    };

    getEvents();
  }, []);

  return (
    <View style={styles.container}>
      <Image
        source={logo}
        style={{
          width: "80%",
          height: 100,
          objectFit: "contain",
          marginTop: 10,
        }}
      />
      <Divider />
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          width: "100%",
          padding: 20,
        }}
      >
        <Text
          variant="headlineLarge"
          style={{ fontSize: 30, fontWeight: "bold", marginTop: 10 }}
        >
          Featured Events
        </Text>
      </View>
      <Divider />
      <View style={styles.eventsSwiper}>
        {events.length > 0 && (
          <SwiperFlatList
            autoplay
            autoplayDelay={4}
            autoplayLoop
            index={0}
            data={events}
            paginationActiveColor="#FF6347"
            paginationDefaultColor="gray"
            paginationStyleItem={{ width: 10, height: 10 }}
            renderItem={({ item }) => (
              <Surface key={item.id} style={styles.eventSurface} elevation={3}>
                <Card style={styles.eventCard}>
                  <Card.Cover source={{ uri: item.image.url }} />
                  <Card.Title
                    title={item.title}
                    subtitle={
                      item.start_date_details.month +
                      " " +
                      item.start_date_details.day +
                      ", " +
                      item.start_date_details.year
                    }
                  />
                  <Card.Content>
                    {/* <Text variant="labelMedium">{item?.venue?.address?.zip}</Text> */}
                  </Card.Content>
                  <Card.Actions>
                    <Button>View Event</Button>
                  </Card.Actions>
                </Card>
              </Surface>
            )}
          />
        )}
      </View>

      <StatusBar style={Platform.OS === "ios" ? "light" : "dark"} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    alignContent: "center",
    justifyContent: "center",
    paddingTop: 40,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "black",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
  buttonOne: {
    width: "80%",
    height: 100,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgb(122,39,121)",
    color: "white",
    borderRadius: 30,
    fontSize: 30,
  },
  buttonTwo: {
    width: "80%",
    height: 100,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#db4028",
    color: "white",
    borderRadius: 30,
    fontSize: 30,
  },
  eventsSwiper: {
    height: height * 0.5, // Adjust this value if needed
    width: "100%", // Full width
    justifyContent: "center",
    alignItems: "center",
  },
  eventSurface: {
    width: width * 0.8, // Use 90% of the screen width
    height: height * 0.4, // Use 40% of the screen height
    alignItems: "center",
    justifyContent: "center",
  },
  eventCard: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
  },
});
