import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Searchbar, useTheme } from 'react-native-paper';

const MessageSearch = ({ 
  searchQuery, 
  onChangeSearch, 
  onFocus 
}) => {
  const theme = useTheme();
  
  return (
    <View style={styles.container}>
      <Searchbar
        placeholder="Search Direct Messages"
        onChangeText={onChangeSearch}
        value={searchQuery}
        style={styles.searchBar}
        iconColor={theme.colors.primary}
        onFocus={onFocus}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 12,
    backgroundColor: '#fff',
    borderBottomWidth: 0.5,
    borderBottomColor: '#E1E8ED',
  },
  searchBar: {
    elevation: 0,
    borderRadius: 20,
    backgroundColor: '#EFF3F4',
    height: 40,
  },
});

export default MessageSearch;