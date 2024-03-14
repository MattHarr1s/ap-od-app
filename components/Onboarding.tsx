import React, { useState, useEffect } from "react";
import { View } from "react-native";
import {
  Text,
  Button,
  Surface,
  Card,
  Chip,
  TextInput,
  Dialog,
  Portal,
  ProgressBar,
} from "react-native-paper";
import { StyleSheet } from "react-native";
import { useStoreState, useStoreActions, useStoreDispatch } from "easy-peasy";
import * as Location from "expo-location";
import { router } from "expo-router";
import FeaturedHeadline from "./FeaturedHeadline";
import FeaturedSurface from "./FeaturedSurface";
import { set } from "react-hook-form";
const Onboarding = () => {
  const [selectedResourceCategories, setSelectedResourceCategories] = useState(
    []
  );
  const [showDialog, setShowDialog] = useState(false);

  const [selectedEventCategories, setSelectedEventCategories] = useState([]);
  const zipCode = useStoreState((state) => state.zipCode);
  const setZipCode = useStoreActions((actions) => actions.setZipCode);
  const onboardingStep = useStoreState((state) => state.onboardingStep);
  const setOnboardingStep = useStoreActions(
    (actions) => actions.setOnboardingStep
  );
  const eventCategories = useStoreState((state) => state.eventCategories);
  const resourceCategories = useStoreState((state) => state.resourceCategories);
  const fetchResourceCategories = useStoreActions(
    (actions) => actions.fetchResourceCategories
  );
  const interestedResourceCategories = useStoreState(
    (state) => state.interestedResourceCategories
  );
  const setInterestedResourceCategories = useStoreActions(
    (actions) => actions.setInterestedResourceCategories
  );
  const setInterestedEventCategories = useStoreActions(
    (actions) => actions.setInterestedEventCategories
  );

  const fetchEventCategories = useStoreActions(
    (actions) => actions.fetchEventCategories
  );
  const fetchUserEventsAndResources = useStoreActions(
    (actions) => actions.fetchUserEventsAndResources
  );
    


  const location = useStoreState((state) => state.location);
  const setLocation = useStoreActions((actions) => actions.setLocation);

  useEffect(() => {
    fetchResourceCategories();
    fetchEventCategories();
    console.log("Onboarding Step", onboardingStep);
    console.log("selectedResourceCategories", interestedResourceCategories);
  }, []);

  useEffect(() => {
    (async () => {
      try {
        let enabled = await Location.hasServicesEnabledAsync();
        console.log("Location Services Enabled", enabled);
        if (!enabled) {
          setShowDialog(true);
        } else {
          let data = await Location.getLastKnownPositionAsync();
          setLocation(data?.coords);
          console.log("Location", location);
        }
      } catch (e) {
        console.log("Error", e);
      }
    })();
  }, []);

  const handleSelectCategory = (category, type) => {
    let selectedCategories =
      type === "event" ? selectedEventCategories : selectedResourceCategories;
    let setSelectedCategories =
      type === "event"
        ? setSelectedEventCategories
        : setSelectedResourceCategories;
    if (selectedCategories.includes(category)) {
      setSelectedCategories(
        selectedCategories.filter((item) => item.id !== category.id)
      );
    } else {
      setSelectedCategories([...selectedCategories, category]);
    }
  };

  const handleStep2Change = () => {
    setInterestedResourceCategories(selectedResourceCategories);
    setOnboardingStep(2);
  };
  const handleStep3Change = () => {
    setInterestedEventCategories(selectedEventCategories);
    setOnboardingStep(3);
  };
  const handleStep4Change = () => {
    fetchUserEventsAndResources("all");
    setOnboardingStep(5);
    router.replace("/home/index");
  };

  const requestLocation = async () => {
    let enabled = await Location.hasServicesEnabledAsync();
    let data = await Location.getLastKnownPositionAsync();
    setLocation(data?.coords);
  };

  return (
    <>
      <Surface elevation={4} style={styles.surface}>
        
        <ProgressBar progress={onboardingStep * 0.25} />

        {onboardingStep === 0 && (
          <>
            <Text variant="headlineLarge" style={{ color: "black" }}>
              Welcome to the Abriendo Puertas | Opening Doors App
            </Text>
            <Text>
              This app is designed to help you and your family learn and grow
              together. It is a tool to help you learn about your child's
              development and how to support them. It also has information about
              your rights and how to advocate for your family and community.
              This app is for you and your family to use together. It is a
              resource for you to use at your own pace. We hope you find it
              helpful and that it helps you and your family grow together.
            </Text>
            <Text>
              To maximize the benefits of the app, we will ask you a few
              questions to help us understand your family's needs and to
              personalize the content for you.
            </Text>
            <Button mode="contained" onPress={() => {console.log('press'), setOnboardingStep(1)}}>
              Get Started
            </Button>
          </>
        )}
        {onboardingStep === 1 && (
          <>
            <Text>Step {onboardingStep}</Text>
            <Text variant="headlineLarge" style={{ color: "black" }}>
              {selectedResourceCategories.length < 3
                ? `Select ${
                    3 - selectedResourceCategories.length
                  } or more categories that interest you`
                : "Great! You're all set!"}
            </Text>
            <Text>
              This will help us personalize the content for you and your family.
            </Text>
            <View style={styles.chipCard}>
              {resourceCategories?.map((category) => (
                <Chip
                  key={category.id}
                  onPress={() => handleSelectCategory(category, "resources")}
                  showSelectedOverlay={true}
                  elevated={true}
                  compact={true}
                  style={styles.chip}
                  selected={selectedResourceCategories.includes(category)}
                >
                  {category.name}
                </Chip>
              ))}
            </View>

            <Button
              mode="contained"
              disabled={selectedResourceCategories.length < 3}
              onPress={() => handleStep2Change()}
            >
              Next
            </Button>
          </>
        )}
        {onboardingStep === 2 && (
          <>
            <Text>Step {onboardingStep}</Text>
            <Text variant="headlineLarge" style={{ color: "black" }}>
              {selectedEventCategories.length < 3
                ? `Select ${
                    3 - selectedEventCategories.length
                  } or more types of events that interest you`
                : "Great! You're all set!"}
            </Text>
            <Text>This will help us personalize the events you are shown</Text>
            <View style={styles.chipCard}>
              {eventCategories?.map((category) => (
                <Chip
                  key={category.id}
                  onPress={() => handleSelectCategory(category, "event")}
                  showSelectedOverlay={true}
                  elevated={true}
                  compact={true}
                  style={styles.chip}
                  selected={selectedEventCategories.includes(category)}
                >
                  {category.name}
                </Chip>
              ))}
            </View>
            <Button
              mode="contained"
              disabled={selectedEventCategories.length < 3}
              onPress={() => handleStep3Change()}
            >
              Next
            </Button>
          </>
        )}
        {onboardingStep === 3 && (
          <>
            <Text>Step {onboardingStep}</Text>
            <Text variant="headlineLarge" style={{ color: "black" }}>
              Please Enable Location Services to Find Local Events
            </Text>
            <Text>This will help us personalize the events you are shown</Text>
            <Portal>
              <Dialog
                visible={showDialog}
                onDismiss={() => setShowDialog(false)}
              >
                <Dialog.Title>Alert</Dialog.Title>
                <Dialog.Content>
                  <Text variant="bodyMedium">This is simple dialog</Text>
                </Dialog.Content>
                <Dialog.Actions>
                  <Button onPress={() => setShowDialog(false)}>Done</Button>
                </Dialog.Actions>
              </Dialog>
            </Portal>

            <Text>Lat: {location.latitude}</Text>
            <Text>Long: {location.longitude}</Text>
            {location === null && (
              <Button mode="contained" onPress={() => requestLocation()}>
                Request Location
              </Button>
            )}
            <View style={{ height: "auto" }}>
              <Button mode="contained" onPress={() => requestLocation()}>
                Request Location
              </Button>
              <Button
                mode="contained"
                disabled={location === null}
                onPress={() => setOnboardingStep(4)}
              >
                Next
              </Button>
            </View>
          </>
        )}
        {onboardingStep === 4 && (
          <>
            <Text variant="headlineLarge" style={{ color: "black" }}>
              Thank You!
            </Text>
            <Text>We are excited to have you join our community</Text>
            <Text>
              You can always update your preferences in the settings tab
            </Text>
            <Button mode="contained" onPress={() => handleStep4Change()}>
              Continue to App
            </Button>
          </>
        )}
      </Surface>
    </>
  );
};

export default Onboarding;

const styles = StyleSheet.create({
  container: {
    padding: 24,
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    width: "100%",
  },
  surface: {
    borderRadius: 15, // Adjust for desired roundness
    elevation: 3, // Adjust for desired shadow depth
    margin: 5, // Spacing from the surrounding elements
    width: "95%",
    padding: 20,
    height: "auto",
  },
  chipCard: {
    flexDirection: "row",
    flexWrap: "wrap",
    paddingHorizontal: 12,
    marginVertical: 20,
  },
  chip: {
    margin: 6,
  },
});
