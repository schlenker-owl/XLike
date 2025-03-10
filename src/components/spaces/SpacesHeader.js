import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Text, Avatar, useTheme } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const SpacesHeader = ({ 
  onProfilePress,
  onSearchPress,
  avatarUri = 'https://randomuser.me/api/portraits/men/1.jpg'
}) => {
  const theme = useTheme();
  
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Spaces</Text>
      
      <View style={styles.actionsContainer}>
        <TouchableOpacity 
          style={styles.searchButton}
          onPress={onSearchPress}
        >
          <Icon name="magnify" size={24} color="#000" />
        </TouchableOpacity>
        
        <TouchableOpacity onPress={onProfilePress}>
          <Avatar.Image 
            source={{ uri: avatarUri }} 
            size={32} 
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#fff',
    borderBottomWidth: 0.5,
    borderBottomColor: '#E1E8ED',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  actionsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  searchButton: {
    marginRight: 16,
  },
});

export default SpacesHeader;