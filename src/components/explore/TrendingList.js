import React from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { Divider } from 'react-native-paper';
import TrendingItem from './TrendingItem';

const TrendingList = ({ 
  trends, 
  onTrendPress, 
  onMorePress,
  maxItems
}) => {
  // If maxItems is provided, limit the number of trends shown
  const displayTrends = maxItems ? trends.slice(0, maxItems) : trends;
  
  return (
    <FlatList
      data={displayTrends}
      renderItem={({ item }) => (
        <TrendingItem
          item={item}
          onPress={() => onTrendPress(item)}
          onMorePress={onMorePress}
        />
      )}
      keyExtractor={item => item.id}
      scrollEnabled={false}
      ItemSeparatorComponent={() => <Divider />}
      contentContainerStyle={styles.container}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
  },
});

export default TrendingList;