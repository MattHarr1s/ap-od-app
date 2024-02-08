import { StatusBar } from "expo-status-bar";
import { FlatList, Platform, StyleSheet, Image } from "react-native";
import { Link } from "expo-router";
import { View } from "react-native";
import { Text, Card } from "react-native-paper";
import PostCard from "../../components/PostCard";


export default function ResourcesScreen() {
  return (
    <View style={styles.container}>     
      <FlatList
        data={newsItems}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <PostCard post={item} key={item.id} />
        )}
      />
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
