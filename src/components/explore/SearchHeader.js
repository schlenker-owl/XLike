import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Searchbar, Avatar, useTheme } from 'react-native-paper';

const SearchHeader = ({ 
  searchQuery, 
  onChangeSearch, 
  onProfilePress,
  onFocus,
  avatarUri = 'https://randomuser.me/api/portraits/men/1.jpg'
}) => {
  const theme = useTheme();
  
  return (
    <View style={styles.container}>
      <View style={styles.searchBarContainer}>
        <Searchbar
          placeholder="Search X"
          onChangeText={onChangeSearch}
          value={searchQuery}
          style={styles.searchBar}
          iconColor={theme.colors.primary}
          onFocus={onFocus}
        />
      </View>
      
      <TouchableOpacity onPress={onProfilePress}>
        <Avatar.Image source={{ uri: avatarUri }} size={32} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: '#fff',
  },
  searchBarContainer: {
    flex: 1,
    marginRight: 12,
  },
  searchBar: {
    elevation: 0,
    borderRadius: 20,
    backgroundColor: '#EFF3F4',
    height: 40,
  },
});

export default SearchHeader;