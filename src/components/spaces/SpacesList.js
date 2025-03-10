import React from 'react';
import { FlatList, StyleSheet, View, Text } from 'react-native';
import LiveSpaceCard from './LiveSpaceCard';
import ScheduledSpaceCard from './ScheduledSpaceCard';

const SpacesList = ({ 
  spaces, 
  type = 'live', // 'live' or 'scheduled'
  onSpacePress,
  onJoinPress,
  onReminderPress,
  onSharePress,
  onHostPress,
  maxItems,
  emptyMessage = 'No spaces available'
}) => {
  // If maxItems is provided, limit the number of spaces shown
  const displaySpaces = maxItems ? spaces.slice(0, maxItems) : spaces;
  
  const renderItem = ({ item }) => {
    if (type === 'live') {
      return (
        <LiveSpaceCard
          space={item}
          onPress={() => onSpacePress && onSpacePress(item)}
          onJoinPress={onJoinPress}
          onHostPress={onHostPress}
        />
      );
    } else {
      return (
        <ScheduledSpaceCard
          space={item}
          onPress={() => onSpacePress && onSpacePress(item)}
          onReminderPress={onReminderPress}
          onSharePress={onSharePress}
          onHostPress={onHostPress}
        />
      );
    }
  };
  
  if (displaySpaces.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>{emptyMessage}</Text>
      </View>
    );
  }
  
  return (
    <FlatList
      data={displaySpaces}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
      contentContainerStyle={styles.listContainer}
      scrollEnabled={false}
    />
  );
};

const styles = StyleSheet.create({
  listContainer: {
    paddingVertical: 8,
  },
  emptyContainer: {
    padding: 16,
    alignItems: 'center',
  },
  emptyText: {
    color: '#657786',
    fontSize: 16,
  },
});

export default SpacesList;