import { StatusBar } from "expo-status-bar";
import { FlatList, Platform, StyleSheet, Image } from "react-native";
import { Link } from "expo-router";
import { View } from "react-native";
import { Text, Card } from "react-native-paper";

const newsItems = [
  {
    id: 1,
    title: "News Item 1",
    slug: "news-item-1",
    date: "2021-03-01T15:00:00",
    excerpt: "News Item 1 Excerpt",
    content: "<p>News Item 1 Content</p>\n",
    image: {
      url: "https://ap-od.org/wp-content/uploads/2021/03/News-Item-1-Image.jpg",
    },
  },
  {
    id: 2,
    title: "News Item 2",
    slug: "news-item-2",
    date: "2021-03-02T15:00:00",
    excerpt: "News Item 2 Excerpt",
    content: "<p>News Item 2 Content</p>\n",
    image: {
      url: "https://ap-od.org/wp-content/uploads/2021/03/News-Item-2-Image.jpg",
    },
  },
  {
    id: 3,
    title: "News Item 3",
    slug: "news-item-3",
    date: "2021-03-03T15:00:00",
    excerpt: "News Item 3 Excerpt",
    content: "<p>News Item 3 Content</p>\n",
    image: {
      url: "https://ap-od.org/wp-content/uploads/2021/03/News-Item-3-Image.jpg",
    },
  },
  {
    id: 4,
    title: "News Item 4",
    slug: "news-item-4",
    date: "2021-03-04T15:00:00",
    excerpt: "News Item 4 Excerpt",
    content: "<p>News Item 4 Content</p>\n",
    image: {
      url: "https://ap-od.org/wp-content/uploads/2021/03/News-Item-4-Image.jpg",
    },
  },
];

export default function ResourcesScreen({news}) {
  return (
    <View style={styles.container}>     
    {news.map((item) => ( 
      <Link href={`/news/${item.slug}`}>
        <Card style={{ backgroundColor: "#fff" }}>
          <Card.Content style={{ flexDirection: "row" }}>
            <Image
              source={{ uri: item.image.url }}
              style={{ width: "30%", height: "100%" }}
            />
            <View style={styles.detailsBox}>
              <Text variant="labelSmall">{item.title}</Text>
              <Text variant="titleSmall">{item.excerpt}</Text>                  
            </View>
          </Card.Content>
        </Card>
      </Link>
    ))}

      {/* <FlatList
        data={news}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <Link href={`/news/${item.slug}`}>
            <Card style={{ backgroundColor: "#fff" }}>
              <Card.Content style={{ flexDirection: "row" }}>
                <Image
                  source={{ uri: item.image.url }}
                  style={{ width: "30%", height: "100%" }}
                />
                <View style={styles.detailsBox}>
                  <Text variant="labelSmall">{item.title}</Text>
                  <Text variant="titleSmall">{item.excerpt}</Text>                  
                </View>
              </Card.Content>
            </Card>
          </Link>
        )}
      /> */}
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
