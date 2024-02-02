import React from 'react';
import { StyleSheet, Dimensions } from 'react-native';
import { Card, Button, Surface } from 'react-native-paper';

const { width, height } = Dimensions.get('window');

const EventCard = ({ event }) => (
  <Surface style={styles.eventSurface} elevation={3}>
    <Card style={styles.eventCard}>
      <Card.Cover source={{ uri: event.image.url }} resizeMode="contain" />
      <Card.Title
        title={event.title}
        subtitle={`${event.start_date_details.month} ${event.start_date_details.day}, ${event.start_date_details.year}`}
      />
      <Card.Content>
        {/* Additional content can be placed here */}
      </Card.Content>
      <Card.Actions>
        <Button>View Event</Button>
      </Card.Actions>
    </Card>
  </Surface>
);

const styles = StyleSheet.create({
  eventSurface: {
    width: width * 0.8,
    height: height * 0.4,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 10,
  },
  eventCard: {
    width: '100%',
    height: '100%',
    justifyContent: 'flex-start',
  },
});

export default EventCard;
