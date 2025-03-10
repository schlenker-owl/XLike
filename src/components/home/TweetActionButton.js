import React from 'react';
import { TouchableOpacity, StyleSheet, View } from 'react-native';
import { Text, useTheme } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const TweetActionButton = ({ 
  icon, 
  count, 
  onPress, 
  active = false,
  activeColor,
  size = 16,
}) => {
  const theme = useTheme();
  
  // Determine the color of the icon based on the active state
  const iconColor = active 
    ? activeColor || theme.colors.primary 
    : theme.twitter.lightGray;
  
  return (
    <TouchableOpacity 
      style={styles.actionButton} 
      onPress={onPress}
      activeOpacity={0.7}
    >
      <Icon name={icon} size={size} color={iconColor} />
      {count !== undefined && (
        <Text 
          style={[
            styles.actionText, 
            active && { color: activeColor || theme.colors.primary }
          ]}
        >
          {count}
        </Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 4,
  },
  actionText: {
    marginLeft: 4,
    fontSize: 12,
    color: '#657786',
  },
});

export default TweetActionButton;