import React from 'react';
import { Card, Button, Surface } from 'react-native-paper';

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

export default EventCard;
