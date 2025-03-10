import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Button, useTheme } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const EmptyState = ({
  icon,
  title,
  message,
  buttonText,
  onButtonPress,
}) => {
  const theme = useTheme();

  return (
    <View style={styles.container}>
      {icon && (
        <Icon name={icon} size={48} color={theme.colors.primary} style={styles.icon} />
      )}
      
      {title && (
        <Text style={styles.title}>{title}</Text>
      )}
      
      {message && (
        <Text style={styles.message}>{message}</Text>
      )}
      
      {buttonText && onButtonPress && (
        <Button
          mode="contained"
          onPress={onButtonPress}
          style={styles.button}
          labelStyle={styles.buttonLabel}
        >
          {buttonText}
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
    padding: 24,
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
  message: {
    fontSize: 16,
    color: '#657786',
    textAlign: 'center',
    marginBottom: 24,
    lineHeight: 22,
  },
  button: {
    borderRadius: 20,
  },
  buttonLabel: {
    fontSize: 14,
    paddingHorizontal: 8,
  },
});

export default EmptyState;