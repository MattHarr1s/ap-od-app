import { StatusBar } from "expo-status-bar";
import { Platform, StyleSheet, ScrollView } from "react-native";
import { Link } from "expo-router";
import { useLocalSearchParams, useGlobalSearchParams, useNavigation } from "expo-router";

import { useEffect, useState } from "react";
import { Text, View } from "react-native";
import { ActivityIndicator } from "react-native-paper";
import { Post } from "../../types/types";
import { transformPosts } from "../../utils/transformers";
import PostCard from "../../components/PostCard";

export default function ResourceScreen() {
  const { slug } = useLocalSearchParams();

  const [news, setNews] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();
  useEffect(() => {
    const getPost = async () => {      
      try {
        const response = await fetch(
          `https://ap-od.org/wp-json/wp/v2/posts?_embed&slug=${slug}`
        );
        const json = await response.json();        
        const post =  await transformPosts(json)[0];        
        setNews(post);
        setLoading(false);
      }
      catch (error) {
        console.error(error);
        setLoading(false);
      }            
    };
    if (slug) {      
      getPost();
    }
  }, [slug]);

  useEffect(() => {
    if (news) {
      navigation.setOptions({
        title: news.title,
      });
    }
  }, [news]);

  if (loading || !news) {
    return <ActivityIndicator animating={true} />;
  }

  return (
    <View style={styles.container}>
      <PostCard post={news} isSingle />

      {/* Use a light status bar on iOS to account for the black space above the modal */}
      <StatusBar style={Platform.OS === "ios" ? "light" : "auto"} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    margin: 20,
    marginTop: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
