import React from 'react';
import { View, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Text, useTheme } from 'react-native-paper';

const SpaceCategoryTabs = ({ 
  categories, 
  selectedIndex, 
  onCategoryPress 
}) => {
  const theme = useTheme();
  
  return (
    <ScrollView 
      horizontal 
      showsHorizontalScrollIndicator={false}
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
    >
      {categories.map((category, index) => (
        <TouchableOpacity
          key={index}
          style={[
            styles.tabButton,
            selectedIndex === index && { borderBottomColor: theme.colors.primary }
          ]}
          onPress={() => onCategoryPress(index)}
        >
          <Text
            style={[
              styles.tabText,
              selectedIndex === index && {
                color: 'black',
                fontWeight: 'bold',
              }
            ]}
          >
            {category}
          </Text>
        </TouchableOpacity>
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
    paddingHorizontal: 16,
  },
  tabButton: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  tabText: {
    fontSize: 15,
    color: '#657786',
  },
});

export default SpaceCategoryTabs;