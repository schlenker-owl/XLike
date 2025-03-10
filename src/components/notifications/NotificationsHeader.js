import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Text, useTheme } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const NotificationsHeader = ({ 
  onSettingsPress,
  onProfilePress
}) => {
  const theme = useTheme();
  
  return (
    <View style={styles.container}>
      <View style={styles.headerLeft}>
        {onProfilePress && (
          <TouchableOpacity 
            style={styles.profileButton} 
            onPress={onProfilePress}
          >
            <Icon name="account-circle" size={26} color={theme.colors.primary} />
          </TouchableOpacity>
        )}
        <Text style={styles.title}>Notifications</Text>
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
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileButton: {
    marginRight: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default NotificationsHeader;