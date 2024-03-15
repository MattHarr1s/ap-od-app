import React, { useEffect, useState, memo, useCallback } from "react";
import { StatusBar } from "expo-status-bar";
import { ActivityIndicator } from "react-native-paper";
import { FlatList, Platform, StyleSheet, Dimensions } from "react-native";
import { useStoreState, useStoreActions, useStoreDispatch } from "easy-peasy";
import { Link } from "expo-router";
import { View } from "react-native";
import { Text, Card } from "react-native-paper";
import PostCard from "../../components/PostCard";
import { Post } from "../../types/types";


import CardSurface from "../../components/CardSurface";
import { transformPosts } from "../../utils/transformers";


const { width, height } = Dimensions.get("window");
const keyExtractor = (item: Post) => item.id.toString();

const PostItem = memo(({ item }: { item: Post }) => (
  <CardSurface key={item.id} width={width + 20} height={height + 20}>
    <PostCard post={item} isSingle={false} />
  </CardSurface>
));

export default function ResourcesScreen() {
  const resources = useStoreState((state) => state.resources);
  const fetchResources = useStoreActions((actions) => actions.fetchResources);

  
  const renderItem = useCallback(
    ({ item }: { item: Post }) => <PostItem item={item} />,
    []
  );

  useEffect(() => {
    fetchResources();    
  }, [resources.length]);
  

  return (
    <View style={styles.container}>
      {resources.length === 0 && <ActivityIndicator animating={true} />}
         <FlatList
           data={resources}
           keyExtractor={keyExtractor}
           renderItem={renderItem}
           initialNumToRender={5}
           maxToRenderPerBatch={5}
           windowSize={5}
         />
      {/* {loading ? (
        <ActivityIndicator animating={true} />
      ) : (
        // <FlatList
        //   data={resources}
        //   keyExtractor={keyExtractor}
        //   renderItem={renderItem}
        //   initialNumToRender={5}
        //   maxToRenderPerBatch={5}
        //   windowSize={5}
        // />
      )} */}
      {/* Use a light status bar on iOS to account for the black space above the modal */}
      <StatusBar style={Platform.OS === "ios" ? "light" : "auto"} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
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
  card: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    width: "100%",

    backgroundColor: "#ffffff",
    borderRadius: 10,
    marginVertical: 10,
    padding: 10,
  },
  cardContent: {
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    marginLeft: 10,
  },
});
