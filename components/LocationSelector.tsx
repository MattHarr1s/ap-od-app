// LocationRequester.tsx
import React from "react";
import { View, StyleSheet } from "react-native";
import { Text, ActivityIndicator, Button, Chip } from "react-native-paper";
import * as Location from "expo-location";
import { LocationCoords } from "../types/types";


interface LocationRequesterProps {
  location: LocationCoords | null;
  loading: boolean;
  onRequestLocation: () => void;
}

const LocationRequester: React.FC<LocationRequesterProps> = ({
  location,
  loading,
  onRequestLocation,
}) => {
  if (loading) {
    return <ActivityIndicator />;
  }
  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <Chip>Lat: {location?.latitude}</Chip>
        <Text>Long: {location?.longitude}</Text>
      </View>
      <Button mode="contained" onPress={onRequestLocation}>
        Request Location
      </Button>
    </View>
  );
};

export default LocationRequester;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
  },
  row:
  {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "stretch",
  } 
});