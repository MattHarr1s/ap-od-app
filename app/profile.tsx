import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Drawer } from 'react-native-paper';

const ProfileScreen = () => {
  return (
    <Drawer.Section title="Some title">
      <Drawer.Item label="First Item" />
      <Drawer.Item label="Second Item" />
   </Drawer.Section>
    
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
});

export default ProfileScreen;
