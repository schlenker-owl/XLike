import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Avatar, useTheme } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const HomeHeader = ({ 
  onProfilePress, 
  tabs,
  selectedTabIndex,
  onTabPress
}) => {
  const theme = useTheme();

  return (
    <View style={styles.header}>
      <TouchableOpacity 
        style={styles.profileButton}
        onPress={onProfilePress}
      >
        <Avatar.Image source={{ uri: 'https://randomuser.me/api/portraits/men/1.jpg' }} size={32} />
      </TouchableOpacity>
      
      <View style={styles.tabsContainer}>
        {tabs.map((tab, index) => (
          <TouchableOpacity 
            key={index}
            style={[
              styles.tab, 
              selectedTabIndex === index && styles.selectedTab
            ]}
            onPress={() => onTabPress(index)}
          >
            <Text style={[
              styles.tabText,
              selectedTabIndex === index && styles.selectedTabText
            ]}>
              {tab}
            </Text>
            {selectedTabIndex === index && (
              <View style={[styles.indicator, { backgroundColor: theme.colors.primary }]} />
            )}
          </TouchableOpacity>
        ))}
      </View>
      
      <TouchableOpacity onPress={() => console.log('Settings pressed')}>
        <Icon name="cog-outline" size={24} color={theme.colors.primary} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#fff',
    borderBottomWidth: 0.5,
    borderBottomColor: '#E1E8ED',
  },
  profileButton: {
    padding: 8,
  },
  tabsContainer: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'center',
  },
  tab: {
    paddingHorizontal: 16,
    alignItems: 'center',
    height: 42,
    justifyContent: 'center',
  },
  selectedTab: {
    position: 'relative',
  },
  tabText: {
    fontSize: 15,
    fontWeight: '500',
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
    width: 30,
    borderRadius: 2,
  },
});

export default HomeHeader;