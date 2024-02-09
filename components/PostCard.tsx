// PostCard.tsx
import React from "react";
import { Card, Text, Button } from "react-native-paper";
import { router } from "expo-router";
import { StyleSheet, ScrollView } from "react-native";
import { Post } from "../types/types"; // Assuming you have a types file for your types

import RenderHTML from "react-native-render-html";
interface PostCardProps {
  post: Post;
  isSingle: boolean;
}

const PostCard: React.FC<PostCardProps> = ({ post, isSingle }) => {
  return (
    <Card
      style={{
        width: "100%", // Card takes the full width of Surface
        height: "100%", // Card takes the full height of Surface
        justifyContent: "flex-start",
        flexGrow: 1,
      }}
    >
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
      {!isSingle && (
        <>
          <Card.Content>
            <Text variant="bodySmall" numberOfLines={2} ellipsizeMode="tail">
              {post.excerpt}
            </Text>
          </Card.Content>
          <Card.Actions style={styles.eventCardActions}>
            <Button
              onPress={() => {
                router.replace({
                  pathname: "/resource/[slug]",
                  params: { slug: post.slug },
                } as never); // Provide the correct type for the argument
              }}
            >
              View Resource
            </Button>
          </Card.Actions>
        </>
      )}
      {isSingle && (
        <Card.Content>
          <ScrollView>
            <RenderHTML contentWidth={300} source={{ html: post.content }} />
          </ScrollView>
        </Card.Content>
      )}
    </Card>
  );
};

const styles = StyleSheet.create({
  eventCard: {},

  eventCardActions: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    marginVertical: 2,
  },
});

export default PostCard;
