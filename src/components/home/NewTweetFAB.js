import React from 'react';
import { StyleSheet } from 'react-native';
import { FAB, useTheme } from 'react-native-paper';

const NewTweetFAB = ({ onPress }) => {
  const theme = useTheme();
  
  return (
    <FAB
      style={[styles.fab, { backgroundColor: theme.colors.primary }]}
      icon="plus"
      color="#fff"
      onPress={onPress}
    />
  );
};

const styles = StyleSheet.create({
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  },
});

export default NewTweetFAB;