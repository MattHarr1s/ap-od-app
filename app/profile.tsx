import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Drawer } from "react-native-paper";
import { useAuth0 } from "react-native-auth0";
import { Button } from "react-native-paper";
import { ProgressBar } from "react-native-paper";
import { TextInput } from "react-native-paper";
import { type } from "ramda";

type Profile = {
  created_at: string;
  identities: [
    {
      connection: string;
      provider: string;
      user_id: string;
      isSocial: boolean;
    }
  ];
  name: string;
  nickname: string;
  phone_number: string;
  phone_verified: boolean;
  picture: string;
  updated_at: string;
  user_id: string;
  last_ip: string;
  last_login: string;
  logins_count: number;
  blocked_for: [];
  guardian_authenticators: [];
  passkeys: [];
  zip: string;
};

const Profile = () => {
  const { user, error } = useAuth0();
  const [zip, setZip] = useState("");
  const [newProfile, setNewProfile] = useState<Profile | null>(null);
  useEffect(() => {
    if (user) {
      const userProfile: Profile = {
        created_at: "",
        identities: [
          {
            connection: "",
            provider: "",
            user_id: "",
            isSocial: false,
          },
        ],
        name: user?.name || "",
        nickname: "",
        phone_number: "",
        phone_verified: false,
        picture: "",
        updated_at: "",
        user_id: "",
        last_ip: "",
        last_login: "",
        logins_count: 0,
        blocked_for: [],
        guardian_authenticators: [],
        passkeys: [],
        zip: "",
      };
      setNewProfile(userProfile);
      console.log(user);
    }
  }, [user]);

  return (
    <>
      {user && (
        <>
          <Text>Logged in as {user.name}</Text>
          <TextInput
            label="Name"
            value={newProfile?.name}
            onChangeText={(text) => setZip(text)}
          />
        </>
      )}
      {!user && <Text>Not logged in</Text>}
      {error && <Text>{error.message}</Text>}
    </>
  );
};

const ProfileScreen = () => {
  const {
    authorize,
    sendSMSCode,
    authorizeWithSMS,
    clearSession,
    user,
    error,
    getCredentials,
    isLoading,
  } = useAuth0();

  const [phoneNumber, setPhoneNumber] = useState("");
  const [codeSent, setCodeSent] = useState(false);
  const [showLoader, setShowLoader] = useState(false);
  const [code, setCode] = useState("");

  const authenticate = async () => {
    if (codeSent) {
      authenticateWithCode();
    } else {
      try {
        setShowLoader(true);
        await sendSMSCode({ phoneNumber: `+1${phoneNumber}`});
       
        setTimeout(() => {
          setShowLoader(false);
          setCodeSent(true);
        }, 5000);
      } catch (e) {
        setCodeSent(false);
        console.log(e);
      }
    }
  };

  const authenticateWithCode = async () => {
    try {
      setShowLoader(true);
      await authorizeWithSMS({ phoneNumber: `+1${phoneNumber}`, code: code });
      setCodeSent(false);
      setTimeout(() => {
        setShowLoader(false);
      }, 5000);
    } catch (e) {
      console.log(e);
    }
  };

  if (isLoading || showLoader) {
    return <ProgressBar indeterminate={true} visible={true} />;
  }

  return (
    <Drawer.Section title="Profile">
      {!user && (
        <>
          <TextInput
            label="Phone Number"
            value={phoneNumber}
            onChangeText={(text) => setPhoneNumber(text)}
          />
          {codeSent && (
            <TextInput
              label="Code"
              value={code}
              onChangeText={(text) => setCode(text)}
            />
          )}
          <Button mode="contained" onPress={() => authenticate()}>
            {codeSent ? 'Get Code' : 
            'Log In'}
          </Button>
        </>
      )}
      {user && (
        <Button mode="contained" onPress={() => clearSession()}>
          Log Out
        </Button>
      )}
      <Profile />

      {/* {user ? (
        <View style={styles.container}>
          <Text style={styles.title}>Welcome {user.name}!</Text>
          <Text>Your email is {user.email}</Text>
        </View>
      ) : (
        <View style={styles.container}>
          <Text style={styles.title}>Welcome!</Text>
          <Text>Please log in to view your profile</Text>
        </View>
      )} */}
    </Drawer.Section>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
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
});

export default ProfileScreen;
