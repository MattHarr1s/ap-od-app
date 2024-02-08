// PostCard.tsx
import React from "react";
import { Card, Text, Button } from "react-native-paper";
import { Link } from "expo-router";
import { StyleSheet } from "react-native";
import { Post } from "../types/types"; // Assuming you have a types file for your types

interface PostCardProps {
  post: Post;
  isSingle: boolean;
}

const PostCard: React.FC<PostCardProps> = ({ post, isSingle }) => {  
  return(
  <Card style={styles.eventCard}>
    <Card.Cover
      source={{
        uri:
          post.featuredMedia ||
          "https://staging.ap-od.org/wp-content/uploads/2023/05/AP_logo_left_v2.png",
      }}
      resizeMode="contain"
    />
    <Card.Title
      title={post.title}
      titleNumberOfLines={2}
      subtitle={post.date}
    />
    <Card.Content>
      <Text
        variant="bodySmall"
        numberOfLines={isSingle ? 0 : 3}
        ellipsizeMode="tail"
      >
        {post.excerpt}
      </Text>
    </Card.Content>
    {!isSingle && (
      <Card.Actions style={styles.eventCardActions}>
        <Link href={`/resources/${post.slug}`} asChild>
          <Button>View Resource</Button>
        </Link>
      </Card.Actions>
    )}
  </Card>
)};

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

export default PostCard;
