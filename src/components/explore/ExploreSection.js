import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Text, useTheme } from 'react-native-paper';

const ExploreSection = ({ 
  title, 
  children, 
  onSeeMorePress, 
  showSeeMore = false,
  containerStyle
}) => {
  const theme = useTheme();
  
  return (
    <View style={[styles.container, containerStyle]}>
      <View style={styles.header}>
        <Text style={styles.title}>{title}</Text>
        
        {showSeeMore && (
          <TouchableOpacity onPress={onSeeMorePress}>
            <Text style={[styles.seeMoreText, { color: theme.colors.primary }]}>
              See more
            </Text>
          </TouchableOpacity>
        )}
      </View>
      
      <View style={styles.content}>
        {children}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    marginBottom: 8,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  seeMoreText: {
    fontSize: 14,
  },
  content: {
    // Content styling will depend on children
  },
});

export default ExploreSection;