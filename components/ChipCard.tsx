//generate chipcard reuseable component like the view in CategorySelector.tsx

import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Chip } from 'react-native-paper';

//the component take children as props
interface ChipCardProps {
  children: React.ReactNode;
}

//the component return a view with style and children
const ChipCard: React.FC<ChipCardProps> = ({ children }) => {
  return <View style={styles.chipCard}>{children}</View>;
};

//style for the view
const styles = StyleSheet.create({
  chipCard: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 12,
    marginVertical: 20,
  },
});

export default ChipCard;