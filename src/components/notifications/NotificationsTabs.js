import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Text, useTheme } from 'react-native-paper';

const NotificationsTabs = ({ 
  tabs, 
  selectedIndex, 
  onTabPress 
}) => {
  const theme = useTheme();
  
  return (
    <View style={styles.container}>
      {tabs.map((tab, index) => (
        <TouchableOpacity
          key={index}
          style={[
            styles.tab,
            selectedIndex === index && styles.selectedTab
          ]}
          onPress={() => onTabPress(index)}
        >
          <Text
            style={[
              styles.tabText,
              selectedIndex === index && styles.selectedTabText
            ]}
          >
            {tab}
          </Text>
          {selectedIndex === index && (
            <View style={[styles.indicator, { backgroundColor: theme.colors.primary }]} />
          )}
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderBottomWidth: 0.5,
    borderBottomColor: '#E1E8ED',
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 14,
    position: 'relative',
  },
  selectedTab: {},
  tabText: {
    fontSize: 16,
    color: '#657786',
  },
  selectedTabText: {
    color: '#000',
    fontWeight: 'bold',
  },
  indicator: {
    position: 'absolute',
    bottom: 0,
    height: 4,
    width: 60,
    borderRadius: 2,
  },
});

export default NotificationsTabs;