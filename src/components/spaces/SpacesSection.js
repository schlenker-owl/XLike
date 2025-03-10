import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Text, useTheme } from 'react-native-paper';

const SpacesSection = ({ 
  title, 
  onSeeMorePress, 
  showSeeMore = false,
  children,
  containerStyle
}) => {
  const theme = useTheme();
  
  return (
    <View style={[styles.container, containerStyle]}>
      <View style={styles.headerContainer}>
        <Text style={styles.title}>{title}</Text>
        
        {showSeeMore && (
          <TouchableOpacity onPress={onSeeMorePress}>
            <Text style={[styles.seeMoreText, { color: theme.colors.primary }]}>
              See more
            </Text>
          </TouchableOpacity>
        )}
      </View>
      
      <View style={styles.contentContainer}>
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
  headerContainer: {
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
  contentContainer: {
    // Content styling will be handled by the children components
  },
});

export default SpacesSection;