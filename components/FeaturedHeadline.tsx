//FeaturedHeadline.tsx
import React from "react";
import { View, StyleSheet } from "react-native";

import { Text } from "react-native-paper";

interface FeaturedHeadlineProps {
  headline: string;
}

const FeaturedHeadline: React.FC<FeaturedHeadlineProps> = ({ headline }) => (
  <View
    style={{
      flexDirection: "row",
      justifyContent: "space-between",
      width: "100%",
      padding: 10,
    }}
  >
    <Text
      variant="headlineLarge"
      style={{
        fontSize: 26,
        fontWeight: "bold",
        marginTop: 5,
        marginLeft: 3,
        color: "#ffffff",
      }}
    >
      {headline}
    </Text>
  </View>
);

export default FeaturedHeadline;
