import React, { ReactComponentElement } from "react";
import { View, StyleSheet } from "react-native";
import { Surface } from "react-native-paper";

interface CardSurfaceProps {
  width: number;
  height: number;
  children: ReactComponentElement<any>;
}

const CardSurface: React.FC<CardSurfaceProps> = ({
  children,
  width,
  height,
}) => (
  <View style={styles.cardSurfaceWrap}>
    <Surface
      style={{
        width: width * 0.8, // Use 80% of the screen width for card
        height: height * 0.42, // Use 40% of the screen height for card
        justifyContent: "center",
        alignItems: "center",
        flex: 1,
        marginHorizontal: 10,
      }}
      elevation={3}
    >
      {children}
    </Surface>
  </View>
);

const styles = StyleSheet.create({
  cardSurfaceWrap: {
    overflow: "hidden",
    borderRadius: 15,
    margin: 6,
    padding: 5,
    backgroundColor: "#fff",
  },
});


export default CardSurface;