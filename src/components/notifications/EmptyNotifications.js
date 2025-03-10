import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, useTheme } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const EmptyNotifications = ({ type = 'all' }) => {
  const theme = useTheme();
  
  // Different messages based on the type (all or mentions)
  const getMessage = () => {
    if (type === 'mentions') {
      return {
        icon: 'at',
        title: 'Nothing to see here — yet',
        description: 'When someone mentions you, you\'ll find it here.',
      };
    } else {
      return {
        icon: 'bell-outline',
        title: 'No notifications yet',
        description: 'When someone interacts with you or your posts, you\'ll see it here.',
      };
    }
  };
  
  const message = getMessage();

  return (
    <View style={styles.container}>
      <Icon name={message.icon} size={60} color="#657786" style={styles.icon} />
      <Text style={styles.title}>{message.title}</Text>
      <Text style={styles.description}>{message.description}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
  },
  icon: {
    marginBottom: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'center',
  },
  description: {
    fontSize: 16,
    color: '#657786',
    textAlign: 'center',
    lineHeight: 22,
  },
});

export default EmptyNotifications;