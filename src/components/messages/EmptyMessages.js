import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Button, useTheme } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const EmptyMessages = ({ onNewMessagePress }) => {
  const theme = useTheme();
  
  return (
    <View style={styles.container}>
      <Icon name="message-outline" size={60} color="#657786" style={styles.icon} />
      <Text style={styles.title}>No messages yet</Text>
      <Text style={styles.description}>
        When you start a new conversation, it will appear here. Direct Messages are private conversations between you and other people on X.
      </Text>
      
      {onNewMessagePress && (
        <Button
          mode="contained"
          style={[styles.button, { backgroundColor: theme.colors.primary }]}
          labelStyle={styles.buttonLabel}
          onPress={onNewMessagePress}
        >
          Start a conversation
        </Button>
      )}
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
    marginBottom: 24,
  },
  button: {
    borderRadius: 20,
  },
  buttonLabel: {
    fontSize: 14,
    paddingHorizontal: 8,
  },
});

export default EmptyMessages;