import React from 'react';
import { StyleSheet } from 'react-native';
import { Button, useTheme } from 'react-native-paper';

const CreateSpaceButton = ({ onPress }) => {
  const theme = useTheme();
  
  return (
    <Button
      mode="contained"
      icon="microphone"
      onPress={onPress}
      style={[styles.button, { backgroundColor: theme.colors.primary }]}
      labelStyle={styles.buttonLabel}
    >
      Create a Space
    </Button>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: 30,
    margin: 16,
  },
  buttonLabel: {
    fontSize: 16,
    paddingVertical: 2,
  },
});

export default CreateSpaceButton;