// CategorySelector.tsx
import React, { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { Chip } from 'react-native-paper';
import { Category } from '../types/types';
import ChipCard from './ChipCard';

interface CategorySelectorProps {
  categories: Category[];
  selectedCategories: Category[];
  onSelectCategory: (category: Category) => void;
}

const CategorySelector: React.FC<CategorySelectorProps> = ({
  categories,
  selectedCategories,
  onSelectCategory,
}) => {


  return (
    <ChipCard>
      {categories.map((category) => (        
        <Chip
          key={category.id}
          onPress={() => { onSelectCategory(category)}}
          elevated
          compact
          style={styles.chip}
          showSelectedOverlay={true}
          selected={selectedCategories.includes(category.id)}
        >
          {category.name}
        </Chip>
      ))}
    </ChipCard>
  );
};

const styles = StyleSheet.create({
  chipCard: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 12,
    marginVertical: 20,
  },
  chip: {
    margin: 6,
  },
});

export default CategorySelector;
