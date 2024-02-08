// EventCard.tsx
import React from 'react';
import { Card, Text, Button } from 'react-native-paper';
import { Link } from 'expo-router';
import { StyleSheet } from 'react-native';
import { Event } from '../types/types'; 

interface EventCardProps {
  event: Event;
  isSingle: boolean;
}

const EventCard: React.FC<EventCardProps> = ({ event, isSingle }) => (
  <Card style={styles.eventCard}>
    <Card.Cover source={{ uri: event.image.url }} resizeMode="contain" />
    <Card.Title
    titleNumberOfLines={3}
      style={{flexWrap: 'wrap'}}
      title={event.title}
      subtitle={`${event.start_date}    ${event?.venue?.address?.zip ? `| ${event.venue.address.zip}` : ""}`}
    />
    <Card.Content>
      <Text variant={!isSingle? 'bodySmall' : 'bodyLarge'} numberOfLines={isSingle ? 0 : 2} ellipsizeMode="tail">
        {event.excerpt}
      </Text>
    </Card.Content>
    {!isSingle && (
    <Card.Actions style={styles.eventCardActions}>
      <Link href={`/events/${event.slug}`} asChild>
        <Button>View Event</Button>
      </Link>
    </Card.Actions>
    )}
  </Card>
);

const styles = StyleSheet.create({
   eventCard: {
    width: "100%", // Card takes the full width of Surface
    height: "100%", // Card takes the full height of Surface
    justifyContent: "flex-start",
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
