// EventCard.tsx
import React from "react";
import { Card, Text, Button, useTheme } from "react-native-paper";
import { router } from "expo-router";
import { StyleSheet } from "react-native";
import { Event } from "../types/types";
import { ScrollView } from "react-native-gesture-handler";

interface EventCardProps {
  event: Event;
  isSingle: boolean;
}

const EventCard: React.FC<EventCardProps> = ({ event, isSingle }) => {
  return (
    <Card style={styles.eventCard}>
      <Card.Cover source={{ uri: event.image.url }} resizeMode="contain" />
      <Card.Title
        titleNumberOfLines={3}
        style={{ flexWrap: "wrap" }}
        title={event.title}
        subtitle={`${event.start_date}    ${
          event?.venue?.address?.zip ? `| ${event.venue.address.zip}` : ""
        }`}
      />
      {isSingle && (
        <Card.Content>
          <ScrollView>
            <Text
              variant={!isSingle ? "bodySmall" : "bodyLarge"}
              numberOfLines={0}
              ellipsizeMode="tail"
            >
              {event.excerpt}
            </Text>
          </ScrollView>
        </Card.Content>
      )}

      {!isSingle && (
        <>
          <Card.Actions style={styles.eventCardActions}>
            <Button
              buttonColor="#60155e"
              textColor="#ffffff"
              onPress={() => {
                router.replace({
                  pathname: "(home)/event/[slug]",
                  params: { slug: event.slug },
                } as never); // Provide the correct type for the argument
              }}
            >
              More
            </Button>
          </Card.Actions>
        </>
      )}
    </Card>
  );
};

const styles = StyleSheet.create({
  eventCard: {
    width: "100%", // Card takes the full width of Surface
    justifyContent: "flex-start",
    flex: 2,
  },

  eventCardActions: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    marginVertical: 2,
  },
});

export default EventCard;
