import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { Chip, useTheme } from 'react-native-paper';

const CategoryTabs = ({ 
  categories, 
  selectedIndex, 
  onCategoryPress 
}) => {
  const theme = useTheme();
  
  return (
    <ScrollView 
      style={styles.container} 
      horizontal 
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.contentContainer}
    >
      {categories.map((category, index) => (
        <Chip
          key={index}
          style={[
            styles.categoryChip,
            selectedIndex === index && { backgroundColor: theme.colors.primary }
          ]}
          textStyle={{ 
            color: selectedIndex === index ? 'white' : 'black',
            fontWeight: selectedIndex === index ? 'bold' : 'normal'
          }}
          mode="flat"
          selected={selectedIndex === index}
          onPress={() => onCategoryPress(index)}
        >
          {category}
        </Chip>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderBottomWidth: 0.5,
    borderBottomColor: '#E1E8ED',
  },
  contentContainer: {
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  categoryChip: {
    marginRight: 8,
    height: 32,
    borderRadius: 16,
  },
});

export default CategoryTabs;