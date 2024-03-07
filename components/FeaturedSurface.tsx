import React from "react";
import { Surface, Button } from "react-native-paper";
import { View, StyleSheet } from "react-native";
import { Text } from "react-native-paper";
import { Href, Link, LinkProps } from "expo-router";
import FeaturedHeadline from "./FeaturedHeadline";

interface FeaturedSurfaceProps {
  headline: string; 
  link: LinkProps<string>["href"];
  linkLabel: string;
  children: any;
  linkStyle: any;
  height: number;
  style: any;  
}

const FeaturedSurface: React.FC<FeaturedSurfaceProps> = ({
  headline,
  link,
  linkLabel,
  linkStyle,
  children,
  height,
  style
}) => (
  <Surface style={style}>
    <FeaturedHeadline headline={headline}  />
    <View
      style={{
        marginTop: 10,
      flex: 1,  // Take up all available space
        width: "100%", // Full width
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        paddingBottom: 16,
      }}
    >
      {children}
      <Link href={link} asChild>
        <Button textColor={linkStyle?.textColor ? linkStyle?.textColor : null} buttonColor={linkStyle?.buttonColor ? linkStyle.buttonColor : null} mode="contained">{linkLabel}</Button>
      </Link>
    </View>
  </Surface>
);

const styles = StyleSheet.create({
  surface: {
    borderRadius: 15, // Adjust for desired roundness
    elevation: 3, // Adjust for desired shadow depth
    margin: 5, // Spacing from the surrounding elements    
  },
});

export default FeaturedSurface;
