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

  height: number;
}

const FeaturedSurface: React.FC<FeaturedSurfaceProps> = ({
  headline,
  link,
  linkLabel,
  children,
  height,
}) => (
  <Surface style={styles.surface}>
    <FeaturedHeadline headline={headline} />
    <View
      style={{
        marginTop: 10,
        height: height * 0.5, // Adjust this value if needed
        width: "100%", // Full width
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        paddingBottom: 16,
      }}
    >
      {children}
      <Link href={link} asChild>
        <Button mode="contained">{linkLabel}</Button>
      </Link>
    </View>
  </Surface>
);

const styles = StyleSheet.create({
  surface: {
    borderRadius: 15, // Adjust for desired roundness
    elevation: 3, // Adjust for desired shadow depth
    margin: 5, // Spacing from the surrounding elements
    backgroundColor: "#fff", // Adjust background color as needed
  },
});

export default FeaturedSurface;
