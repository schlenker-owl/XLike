import React from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import NewsItem from './NewsItem';

const NewsList = ({ 
  news, 
  onNewsPress,
  maxItems
}) => {
  // If maxItems is provided, limit the number of news shown
  const displayNews = maxItems ? news.slice(0, maxItems) : news;
  
  return (
    <FlatList
      data={displayNews}
      renderItem={({ item }) => (
        <NewsItem
          item={item}
          onPress={() => onNewsPress(item)}
        />
      )}
      keyExtractor={item => item.id}
      scrollEnabled={false}
      contentContainerStyle={styles.container}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 8,
    backgroundColor: '#fff',
  },
});

export default NewsList;