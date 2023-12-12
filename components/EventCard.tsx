import { Card, Text, Paragraph } from "react-native-paper";


export default function EventCard({event: props}) {
  return (
    <Card style={{ margin: 10 }}>
      <Card.Cover source={{ uri: props.image }} />
      <Card.Content>
        <Text>{props.title}</Text>
        <Paragraph>{props.description}</Paragraph>
      </Card.Content>
    </Card>
  );
}