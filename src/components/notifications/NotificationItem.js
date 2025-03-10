import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Text, Avatar, useTheme } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const NotificationItem = ({ 
  notification, 
  onPress,
  onUserPress
}) => {
  const theme = useTheme();
  
  // Determine icon based on notification type
  const getNotificationIcon = () => {
    switch (notification.type) {
      case 'like':
        return { name: 'heart', color: 'red', backgroundColor: 'rgba(255, 0, 0, 0.1)' };
      case 'retweet':
        return { name: 'repeat', color: 'green', backgroundColor: 'rgba(0, 128, 0, 0.1)' };
      case 'follow':
        return { name: 'account-plus', color: theme.colors.primary, backgroundColor: 'rgba(29, 161, 242, 0.1)' };
      case 'mention':
        return { name: 'at', color: theme.colors.primary, backgroundColor: 'rgba(29, 161, 242, 0.1)' };
      case 'reply':
        return { name: 'comment-outline', color: theme.colors.primary, backgroundColor: 'rgba(29, 161, 242, 0.1)' };
      default:
        return { name: 'bell-outline', color: theme.colors.primary, backgroundColor: 'rgba(29, 161, 242, 0.1)' };
    }
  };
  
  const icon = getNotificationIcon();
  
  return (
    <TouchableOpacity 
      style={styles.container}
      onPress={() => onPress && onPress(notification)}
      activeOpacity={0.7}
    >
      {/* Icon */}
      <View style={[styles.iconContainer, { backgroundColor: icon.backgroundColor }]}>
        <Icon name={icon.name} size={20} color={icon.color} />
      </View>
      
      <View style={styles.contentContainer}>
        {/* User Avatar and Info */}
        <View style={styles.userContainer}>
          <TouchableOpacity onPress={() => onUserPress && onUserPress(notification.user)}>
            <Avatar.Image source={{ uri: notification.user.avatar }} size={40} />
          </TouchableOpacity>
          
          <View style={styles.textContainer}>
            <Text style={styles.userName}>
              <Text style={styles.boldText}>{notification.user.name}</Text>
              {notification.user.verified && (
                <Icon name="check-decagram" size={14} color={theme.colors.primary} style={styles.verifiedIcon} />
              )}
              <Text style={styles.notificationText}> {notification.content}</Text>
            </Text>
            
            {notification.tweetText && (
              <Text style={styles.tweetText} numberOfLines={2}>
                {notification.tweetText}
              </Text>
            )}
          </View>
        </View>
        
        {/* Time */}
        <Text style={styles.timeText}>{notification.time}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 16,
    backgroundColor: '#fff',
  },
  iconContainer: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  contentContainer: {
    flex: 1,
  },
  userContainer: {
    flexDirection: 'row',
  },
  textContainer: {
    flex: 1,
    marginLeft: 12,
  },
  userName: {
    fontSize: 15,
    marginBottom: 4,
    flexWrap: 'wrap',
  },
  boldText: {
    fontWeight: 'bold',
  },
  verifiedIcon: {
    marginLeft: 2,
  },
  notificationText: {
    color: '#657786',
  },
  tweetText: {
    color: '#657786',
    marginTop: 4,
  },
  timeText: {
    fontSize: 13,
    color: '#657786',
    marginTop: 4,
    alignSelf: 'flex-end',
  },
});

export default NotificationItem;