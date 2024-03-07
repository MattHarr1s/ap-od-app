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
        justifyContent: "center",
        alignItems: "center",
        flex: 2,
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
    overflow: "visible",
    borderRadius: 15,
    margin: 6,
    padding: 5,
    backgroundColor: "#fff",
    flex:2
  },
});

export default CardSurface;
