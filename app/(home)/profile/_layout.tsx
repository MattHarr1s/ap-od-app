import React, { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { Platform, StyleSheet, Image } from "react-native";
import { Link, Redirect, router, useNavigation } from "expo-router";
import { Button, ListIconProps, Surface } from "react-native-paper";
import { useAuth0 } from "react-native-auth0";
import { List, Text } from "react-native-paper";
import { View } from "react-native";
import { useStoreState, useStoreActions } from "easy-peasy";
import CategorySelector from "../../../components/CategorySelector";
import LocationSelector from "../../../components/LocationSelector";
import ProfileForm from "../../../components/forms/ProfileForm";
import { AccordionGroup } from "react-native-paper/lib/typescript/components/List/List";
import * as Location from "expo-location";
import { ScrollView } from "react-native-gesture-handler";
import CardSurface from "../../../components/CardSurface";

interface CustomArrowProps {
  isExpanded: boolean;
}

const CustomArrow = (props: CustomArrowProps) => {
  if (props.isExpanded) {
    return <List.Icon {...props} icon="chevron-down" color="white" />;
  }
  return <List.Icon {...props} icon="chevron-up" color="white" />;
};

const ProfileScreen = () => {
  const navigation = useNavigation();

  const { authorize, clearSession, user, error, getCredentials, isLoading } =
    useAuth0();

  const [showDialog, setShowDialog] = useState(false);
  const [loading, setLoading] = useState(false);
  const setOnboardingStep = useStoreActions(
    (actions) => actions.setOnboardingStep
  );
  const eventCategories = useStoreState((state) => state.eventCategories);
  const resourceCategories = useStoreState((state) => state.resourceCategories);

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
  // const setCredentials = useStoreActions((actions) => actions.setCredentials);
  const resetOnboarding: () => void = () => {
    setInterestedEventCategories([]);
    setInterestedResourceCategories([]);
    setOnboardingStep(1);
    router.replace("/");
  };

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

  const onSelectLocation = async () => {
    try {
      let enabled = await Location.hasServicesEnabledAsync();
      setLoading(true);
      if (!enabled) {
        setShowDialog(true);
      } else {
        let data = await Location.getLastKnownPositionAsync();
        setLocation(data?.coords);
        setLoading(false);
      }
    } catch (e) {
      console.log("Error", e);
    }
  };

  if (isLoading) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }
  return (
    <View style={styles.container}>
      <List.Section>
        <ScrollView>
          <View style={styles.accordionSeparator}>
            <List.Accordion
              title="My Selected Resource Categories"
              titleStyle={{ color: "white" }}
              left={(props) => (
                <List.Icon
                  {...props}
                  color="white"
                  icon="newspaper-variant-multiple"
                />
              )}
              right={(props) => <CustomArrow {...props} />}
            >
              <CategorySelector
                selectedCategories={interestedResourceCategories}
                onSelectCategory={(category) =>
                  handleChangeResourceCategory(category)
                }
                categories={resourceCategories}
              />
            </List.Accordion>
          </View>
          <View style={styles.accordionSeparator}>
            <List.Accordion
              title="My Selected Event Categories"
              titleStyle={{ color: "white" }}
              left={(props) => (
                <List.Icon {...props} color="white" icon="calendar-multiple" />
              )}
              right={(props) => <CustomArrow {...props} />}
            >
              <CategorySelector
                selectedCategories={interestedEventCategories}
                onSelectCategory={(category) =>
                  handleChangeEventCategory(category)
                }
                categories={eventCategories}
              />
            </List.Accordion>
          </View>
          <View style={styles.accordionSeparator}>
            <List.Accordion
              title="My Location"
              titleStyle={{ color: "white" }}
              left={(props) => (
                <List.Icon {...props} color="white" icon="map-marker" />
              )}
              right={(props) => <CustomArrow {...props} />}
            >
              <LocationSelector
                location={location}
                loading={loading}
                onRequestLocation={onSelectLocation}
              />
            </List.Accordion>
          </View>
          <View style={styles.accordionSeparator}>
            <List.Accordion
              title="My AP-OD Account"
              titleStyle={{ color: "white" }}
              left={(props) => (
                <List.Icon {...props} color="white" icon="map-marker" />
              )}
              right={(props) => <CustomArrow {...props} />}
            >
              <Text>My AP-OD Account</Text>
              {user ? (
                <>
                  {console.log(user)}
                  <ProfileForm user={user} />
                  <Button
                    mode="contained"
                    onPress={() => {
                      clearSession();
                    }}
                  >
                    Log Out
                  </Button>
                </>
              ) : (
                <>
                  <Button
                    mode="contained"
                    onPress={() => {
                      resetOnboarding();
                    }}
                  >
                    Restart Onboarding
                  </Button>
                  <Button
                    mode="contained"
                    onPress={() => {
                      authorize({
                        additionalParameters: { ui_locales: "en-US,es-ES" },
                      });
                    }}
                  >
                    Log In
                  </Button>
                </>
              )}
            </List.Accordion>
          </View>
        </ScrollView>
      </List.Section>

      <StatusBar style="auto" />
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    padding: 24,
    flex: 1,
    flexDirection: "column",
    alignItems: "stretch",
    justifyContent: "space-between",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  text: {
    fontSize: 30,
    fontWeight: "bold",
    color: "black",
    textAlign: "center",
    width: "100%",
    height: "100%",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "100%",
  },
  accordionSeparator: {
    marginVertical: 15,
  },

  buttonOne: {
    width: "80%",
    height: 100,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgb(122,39,121)",
    color: "white",
    borderRadius: 30,
    fontSize: 30,
  },
  buttonTwo: {
    width: "80%",
    height: 100,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#db4028",
    color: "white",
    borderRadius: 30,
    fontSize: 30,
  },
});
