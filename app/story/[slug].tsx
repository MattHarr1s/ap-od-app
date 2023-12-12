import { StatusBar } from 'expo-status-bar';
import { Platform, StyleSheet, ScrollView } from 'react-native';
import { Link } from 'expo-router';
import { useLocalSearchParams } from 'expo-router';

import { useEffect, useState } from 'react';
import { Text, View } from 'react-native';

export default function NewsScreen() {
  const {slug} = useLocalSearchParams();

  const [news, setNews] = useState([]);

  useEffect(() => {

    const getEvents = async () => {
      const response = await fetch('https://ap-od.org/wp-json/tribe/events/v1/events');
      const json = await response.json();
      setNews(json);
    }
    
    getEvents();
  }, []);

  return (
    <View style={styles.container}>
    <Text style={styles.title}>{slug}</Text>
     
      {/* {events.length > 0 &&  <ScrollView>
        {events.map((event) => {
          return <Link href={`/event/${event.slug}`} key={event.id}  asChild>
          <Text style={styles.title}>{event.title}</Text>
          <Text style={styles.title}>{event.slug}</Text>
          <Text style={styles.title}>{event.date}</Text>
        </Link>
        })}

      
      </ScrollView> */}

      

      {/* Use a light status bar on iOS to account for the black space above the modal */}
      <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
