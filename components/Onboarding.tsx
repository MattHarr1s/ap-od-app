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
import { useStoreState, useStoreActions } from "easy-peasy";
import * as Location from "expo-location";
import { router } from "expo-router";
import FeaturedHeadline from "./FeaturedHeadline";
import FeaturedSurface from "./FeaturedSurface";
import CategorySelector from "./CategorySelector";

const Onboarding = () => {
  const [showDialog, setShowDialog] = useState(false);

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
  const interestedEventCategories = useStoreState(
    (state) => state.interestedEventCategories
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
  const selectedResourceCategories = useStoreState(
    (state) => state.interestedResourceCategories
  );
  const addInterestedResourceCategory = useStoreActions(
    (actions) => actions.addInterestedResourceCategory
  );
  const removeInterestedResourceCategory = useStoreActions(
    (actions) => actions.removeInterestedResourceCategory
  );
  const addInterestedEventCategory = useStoreActions(
    (actions) => actions.addInterestedEventCategory
  );
  const removeInterestedEventCategory = useStoreActions(
    (actions) => actions.removeInterestedEventCategory
  );

  const location = useStoreState((state) => state.location);
  const setLocation = useStoreActions((actions) => actions.setLocation);

  useEffect(() => {
    async function fetchData() {
      await fetchResourceCategories();
      await fetchEventCategories();
    }
    fetchData();
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

  const handleChangeResourceCategory = (category) => {
    let categoryId = category.id;
    console.log("Category ID", categoryId);
    if (interestedResourceCategories.includes(categoryId)) {
      removeInterestedResourceCategory(categoryId);
    } else addInterestedResourceCategory(categoryId);
  };

  const handleChangeEventCategory = (category) => {
    if (interestedEventCategories.includes(category.id)) {
      removeInterestedEventCategory(category.id);
    } else {
      addInterestedEventCategory(category.id);
    }
  };

  const handleSelectCategory = (category, type) => {
    let selectedCategories =
      type === "event" ? interestedEventCategories : interestedEventCategories;
    let setSelectedCategories =
      type === "event"
        ? setInterestedEventCategories
        : setInterestedResourceCategories;
    if (selectedCategories.includes(category)) {
      setSelectedCategories(
        selectedCategories.filter((item) => item.id !== category.id)
      );
    } else {
      setSelectedCategories([...selectedCategories, category]);
    }
  };



  const handleStep2Change = () => {
    // setInterestedResourceCategories(selectedResourceCategories);
    setOnboardingStep(2);
  };
  const handleStep3Change = () => {
    // setInterestedEventCategories(selectedEventCategories);
    setOnboardingStep(3);
  };
  const handleStep4Change = () => {
    fetchUserEventsAndResources("all");
    setOnboardingStep(5);
    router.replace("(home)");
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
              Welcome to Your Abriendo Puertas | Opening Doors App
            </Text>
            <Text>
              This app is designed to help you and your family learn and grow
              together. It is a tool to help you learn about your child's
              development and how to support them with resources and advocacy.
            </Text>
            <Text>
              To maximize the benefits of the app, we will ask you a few
              questions to help us understand your family's needs and to
              personalize the resources for you.
            </Text>
            <Text>
              We hope you find it helpful and that it helps you and your family
              grow together.
            </Text>
            <Button
              mode="contained"
              onPress={() => {
                setOnboardingStep(1);
              }}
            >
              Get Started
            </Button>
          </>
        )}
        {onboardingStep === 1 && (
          <>
            <Text>Step {onboardingStep}</Text>
            <Text variant="headlineLarge" style={{ color: "black" }}>
              {interestedResourceCategories.length < 3
                ? `Select ${
                    3 - interestedResourceCategories.length
                  } or more categories that interest you`
                : "Great! You're all set!"}
            </Text>
            <Text>
              This will help us personalize the content for you and your family.
            </Text>
            {interestedResourceCategories.length < 0 &&
              interestedResourceCategories.map((category) => (
                <Text>{category.name}</Text>
              ))}
            <CategorySelector
              categories={resourceCategories}
              selectedCategories={interestedResourceCategories}
              onSelectCategory={(category) =>
                handleChangeResourceCategory(category)
              }
            />
            <Button
              mode="contained"
              disabled={interestedResourceCategories.length < 3}
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
              {interestedEventCategories.length < 3
                ? `Select ${
                    3 - interestedEventCategories.length
                  } or more types of events that interest you`
                : "Great! You're all set!"}
            </Text>
            <Text>This will help us personalize the events you are shown</Text>
            <CategorySelector
              categories={eventCategories}
              selectedCategories={interestedEventCategories}
              onSelectCategory={(category) =>
                handleChangeEventCategory(category)
              }
            />
            <Button
              mode="contained"
              disabled={interestedEventCategories.length < 3}
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
