import React, {useState, useEffect} from "react";
import { StatusBar } from "expo-status-bar";
import { Platform, StyleSheet, ScrollView } from "react-native";
import { Link, Tabs, SplashScreen, Stack } from "expo-router";
import { useLocalSearchParams } from "expo-router";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

SplashScreen.preventAutoHideAsync();


export default function NewsLayout(){
  const [news, setNews] = useState([]);
  


  useEffect(() => {
    
    const getResources = async () => {
      const response = await fetch('https://staging.ap-od.org/wp-json/wp/v2/posts?_embed&categories=26&per_page=5');
      const json = await response.json();
      setNews(json);
    }
    
    getResources();
  }, []);
  useEffect(() => {
    if(news.length > 0){
      SplashScreen.hideAsync();
    }
  }, [news]);

  return <NewsLayoutNav news={news}/>


}


function NewsLayoutNav({news}){
  return (
    <Stack initialRouteName="index" >
      <Stack.Screen name="index" news={news} />
      <Stack.Screen name="[slug]"/>
    </Stack>

  )
}

