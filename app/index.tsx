import React, { useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { Platform, StyleSheet, Image, Dimensions } from "react-native";
import { useStoreState, useStoreActions, Actions } from "easy-peasy";
import { ActivityIndicator } from "react-native-paper";
import { useTheme } from "react-native-paper";
import {
  Link,
  SplashScreen,
  router,
  useRootNavigationState,
  Redirect,
} from "expo-router";
import { Button } from "react-native-paper";
import { Chip, Card, Divider, Text } from "react-native-paper";
import { Surface } from "react-native-paper";
import { ImageBackground, View } from "react-native";
import { SwiperFlatList } from "react-native-swiper-flatlist";
import PostCard from "../components/PostCard";
import EventCard from "../components/EventCard";
import FeaturedSurface from "../components/FeaturedSurface";
import CardSurface from "../components/CardSurface";
import { Event, Post } from "../types/types";
import { transformEvents, transformPosts } from "../utils/transformers";
import Onboarding from "../components/Onboarding";

import { useAuth0 } from "react-native-auth0";
import { ScrollView } from "react-native-gesture-handler";
const logo = require("../assets/images/ap_logo_left_v2.png");
const purpleBackground = require("../assets/images/purple_button.png");
const { width, height } = Dimensions.get("window");

const rewardsItems = [
  {
    id: 1,
    title: "Discounts",
    image: "https://picsum.photos/700",
  },
  {
    id: 2,
    title: "Events",
    image: "https://picsum.photos/700",
  },
  {
    id: 3,
    title: "Resources",
    image: "https://picsum.photos/700",
  },
  {
    id: 4,
    title: "Volunteer",
    image: "https://picsum.photos/700",
  },
];

SplashScreen.preventAutoHideAsync();

export default function HomeScreen() {
  // const { authorize, clearSession, user, error, getCredentials, isLoading } =
  //   useAuth0();
  const rootNavigationState = useRootNavigationState();
  const theme = useTheme();
  type MyActions = Actions<{}> & {
    fetchFeaturedEvents: () => void;
  };
  const onboardingStep = useStoreState((state) => state.onboardingStep);
  const featuredEvents = useStoreState((state) => state.featuredEvents);
  const featuredResources = useStoreState((state) => state.featuredResources);
  const getFeaturedEvents = useStoreActions<MyActions>(
    (actions) => actions.fetchFeaturedEvents
  );

  const getFeaturedResources = useStoreActions<MyActions>(
    (actions) => actions.fetchFeaturedResources
  );

  const fetchUserEventsAndResources = useStoreActions<MyActions>(
    (actions) => actions.fetchUserEventsAndResources
  );

  useEffect(() => {
    if (onboardingStep > 4) {
      getFeaturedResources();
      getFeaturedEvents();
      if (rootNavigationState?.key) {
        fetchUserEventsAndResources();
        router.push("(home)");
      }
    }
  }, [onboardingStep]);

  if (onboardingStep < 5) {
    return (
      <View style={styles.onboarding}>
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
        <Onboarding />
      </View>
    );
  }

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
      <ScrollView>
        <FeaturedSurface
          headline="Featured Events"
          height={height}
          link="/events/"
          linkLabel="All Events"
          linkStyle={{
            buttonColor: "white",
            textColor: theme.colors.background,
          }}
          style={{ backgroundColor: theme.colors.background }}
        >
          {featuredEvents?.length === 0 ? (
            <ActivityIndicator animating={true} />
          ) : (
            <SwiperFlatList
              autoplay
              autoplayDelay={6}
              autoplayLoop
              index={0}
              data={featuredEvents}
              paginationActiveColor="#FF6347"
              paginationDefaultColor="gray"
              paginationStyle={{ position: "absolute", bottom: 10 }} // Adjust pagination position if necessary
              paginationStyleItem={{ width: 8, height: 8 }} // Adjust pagination dots size if necessary
              snapToAlignment="center" // Items snap to center
              snapToInterval={width * 0.8 + 10 * 2} // Snap to the interval of card width plus margin
              decelerationRate="fast"
              renderItem={({ item }) => (
                <CardSurface key={item.id} width={width} height={height}>
                  <EventCard event={item} />
                </CardSurface>
              )}
            />
          )}
        </FeaturedSurface>
        <Divider />
        <FeaturedSurface
          headline="Featured Resources"
          height={height}
          link="/resources/"
          linkLabel="All Resources"
          style={{ backgroundColor: theme.colors.surface }}
          linkStyle={{
            buttonColor: "white",
            textColor: theme.colors.background,
          }}
        >
          {featuredResources.length === 0 ? (
            <ActivityIndicator animating={true} />
          ) : (
            <SwiperFlatList
              autoplay
              autoplayDelay={6}
              autoplayLoop
              index={0}
              data={featuredResources}
              paginationActiveColor="#FF6347"
              paginationDefaultColor="gray"
              paginationStyle={{ position: "absolute", bottom: 10 }} // Adjust pagination position if necessary
              paginationStyleItem={{ width: 8, height: 8 }} // Adjust pagination dots size if necessary
              snapToAlignment="center" // Items snap to center
              snapToInterval={width * 0.8 + 10 * 2} // Snap to the interval of card width plus margin
              decelerationRate="fast"
              renderItem={({ item }) => (
                <CardSurface height={height} width={width} key={item.id}>
                  <PostCard post={item} />
                </CardSurface>
              )}
            />
          )}
        </FeaturedSurface>
        <Divider />
        <View style={styles.surfaceWrap}>
          <Surface style={styles.rewardsSurface} elevation={3}>
            <View style={styles.headerContainer}>
              <Text style={styles.headerText}>Member Rewards</Text>
            </View>
            <View style={styles.chipContainer}>
              <Text style={{ fontSize: 20, fontWeight: "bold" }}>
                Become a member today and enjoy these rewards and more!
              </Text>
            </View>
            <SwiperFlatList
              autoplay
              autoplayDelay={5}
              autoplayLoop
              index={0}
              data={rewardsItems}
              paginationActiveColor="#FF6347"
              paginationDefaultColor="gray"
              paginationStyleItem={{ width: 8, height: 8 }}
              snapToAlignment="center"
              snapToInterval={width * 0.8 + 10 * 2}
              decelerationRate="fast"
              renderItem={({ item }) => (
                <Card key={item.id} style={styles.rewardCard}>
                  <Card.Cover
                    source={{ uri: item.image }}
                    resizeMode="contain"
                  />
                  <Card.Title title={item.title} />
                </Card>
              )}
            />

            <View style={styles.rewardsButtonsContainer}>
              <Button
                mode="contained"
                onPress={() => alert("Learn More Pressed")}
              >
                Learn More
              </Button>
              {/* <Button
                mode="contained"
                onPress={() => {
                  authorize({
                    additionalParameters: { ui_locales: "en-US,es-ES" },
                  });
                }}
                style={styles.signUpButton}
              >
                Sign Up Now
              </Button> */}
            </View>
          </Surface>
        </View>
      </ScrollView>
      <StatusBar style={Platform.OS === "ios" ? "light" : "dark"} />
    </View>
  );
}
10;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    alignContent: "center",
    justifyContent: "center",
    paddingTop: 20,
  },
  onboarding: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    alignContent: "center",
    marginTop: 20,
    width: "100%",
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
    marginTop: 10,
    height: height * 0.5, // Adjust this value if needed
    width: "100%", // Full width
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    paddingBottom: 16,
  },
  eventSurface: {
    width: width * 0.8, // Use 80% of the screen width for card
    height: height * 0.42, // Use 40% of the screen height for card
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    marginHorizontal: 10, // Margin on both sides of the card
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    marginTop: 10,
    textAlign: "center",
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
  surfaceWrap: {
    overflow: "hidden",
    borderRadius: 15,
    margin: 6,
    padding: 5,
  },
  surface: {
    borderRadius: 15, // Adjust for desired roundness

    elevation: 3, // Adjust for desired shadow depth
    margin: 5, // Spacing from the surrounding elements
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    padding: 20,
  },
  headerText: {
    fontSize: 30,
    fontWeight: "bold",
    marginTop: 10,
  },
  rewardsSurface: {
    borderRadius: 15,
    margin: 10,
    padding: 10,
    backgroundColor: "#fff",
  },
  rewardCard: {
    width: width * 0.8,
    height: width * 0.6, // Adjust based on your needs
    marginHorizontal: 10,
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 0,
    marginBottom: 4,
  },
  rewardsButtonsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 15,
    marginBottom: 20,
  },
  signUpButton: {
    marginLeft: 10,
  },
});
