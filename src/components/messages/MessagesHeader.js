import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Text, Avatar, useTheme } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const MessagesHeader = ({ 
  onProfilePress,
  onSettingsPress,
  avatarUri = 'https://randomuser.me/api/portraits/men/1.jpg'
}) => {
  const theme = useTheme();
  
  return (
    <View style={styles.container}>
      <View style={styles.leftContainer}>
        <TouchableOpacity onPress={onProfilePress}>
          <Avatar.Image
            source={{ uri: avatarUri }}
            size={32}
          />
        </TouchableOpacity>
        <Text style={styles.title}>Messages</Text>
      </View>
      
      <TouchableOpacity onPress={onSettingsPress}>
        <Icon name="cog-outline" size={24} color="#000" />
      </TouchableOpacity>
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
  leftContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 16,
  },
});

export default MessagesHeader;