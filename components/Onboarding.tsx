import React, { useState, useEffect } from "react";
import { View } from "react-native";
import { Text, Button, Surface, Card, Chip } from "react-native-paper";
import { StyleSheet } from "react-native";
import { useStoreState, useStoreActions, useStoreDispatch } from "easy-peasy";
import FeaturedHeadline from "./FeaturedHeadline";
import FeaturedSurface from "./FeaturedSurface";
const Onboarding = () => {
  const [selectedCategories, setSelectedCategories] = useState([]);
  const onboardingStep = useStoreState((state) => state.onboardingStep);
  const setOnboardingStep = useStoreActions(
    (actions) => actions.setOnboardingStep
  );
  const dispatch = useStoreDispatch();
  const resourceTaxonomies = useStoreState((state) => state.resourceTaxonomies);
  const fetchResourceTaxonomies = useStoreActions(
    (actions) => actions.fetchResourceTaxonomies
  );
  const resourceCategories = useStoreState((state) => state.resourceCategories);
  const fetchResourceCategories = useStoreActions(
    (actions) => actions.fetchResourceCategories
  );

  useEffect(() => {
    fetchResourceCategories();
  }, []);


  return (
    <>
      {onboardingStep === 0 && (
        <Surface elevation={4} style={styles.surface}>
          <Text>Step {onboardingStep}</Text>
          <Text variant="headlineLarge" style={{color: "black"}}>
            Welcome to the Abriendo Puertas | Opening Doors App
          </Text>
          <Text>
            This app is designed to help you and your family learn and grow
            together. It is a tool to help you learn about your child's
            development and how to support them. It also has information about
            your rights and how to advocate for your family and community. This
            app is for you and your family to use together. It is a resource for
            you to use at your own pace. We hope you find it helpful and that it
            helps you and your family grow together.
          </Text>
          <Text>
            To maximize the benefits of the app, we will ask you a few questions
            to help us understand your family's needs and to personalize the
            content for you.
          </Text>
          <Button mode="contained" onPress={() => setOnboardingStep(1)}>
            Get Started
          </Button>
        </Surface>
      )}
      {onboardingStep === 1 && (
        <Surface elevation={4} style={styles.surface}>
          <Text>Step {onboardingStep}</Text>
          <Text variant="headlineLarge" style={{color: "black"}}>
           Please Select A Few Categories of Resources That Interest You
          </Text>
          <Text>
            This will help us personalize the content for you and your family.
          </Text>
          <View style={styles.chipCard}>
            {resourceCategories?.map((category) => (
              <Chip key={category.id} onPress={() => console.log(category)} showSelectedOverlay={true} elevated={true} compact={true}>
                {category.name}
              </Chip>
            ))}
          </View>

          
          <Button mode="contained" onPress={() => setOnboardingStep(2)}>
            Next
          </Button>
        </Surface>
      )}
      {onboardingStep === 2 && (
        <View>
          <Text>Step 3 Content</Text>
        </View>
      )}
      {onboardingStep === 3 && (
        <View>
          <Text>Step 4 Content</Text>

          <Button
            title="Finish"
            onPress={() => console.log("Onboarding finished!")}
          />
        </View>
      )}
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
    padding: 10,
    height: "auto",
  },
  chipCard: {
    flexDirection: 'row',
    flexWrap: 'wrap',   
    paddingHorizontal: 12,   
  },
  chip:{    
    margin: 6,
  }
});
