import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Text, useTheme } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const TrendingItem = ({ 
  item, 
  onPress,
  onMorePress
}) => {
  const theme = useTheme();
  
  return (
    <TouchableOpacity 
      style={styles.container}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={styles.content}>
        <Text style={styles.category}>{item.topic}</Text>
        <Text style={styles.hashtag}>{item.hashtag}</Text>
        <Text style={styles.tweetCount}>{item.count}</Text>
      </View>
      
      <TouchableOpacity 
        style={styles.moreButton}
        onPress={() => onMorePress && onMorePress(item)}
        hitSlop={{ top: 10, right: 10, bottom: 10, left: 10 }}
      >
        <Icon name="dots-horizontal" size={16} color={theme.twitter.lightGray} />
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#fff',
  },
  content: {
    flex: 1,
  },
  category: {
    fontSize: 13,
    color: '#657786',
    marginBottom: 2,
  },
  hashtag: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  tweetCount: {
    fontSize: 13,
    color: '#657786',
  },
  moreButton: {
    padding: 4,
  },
});

export default TrendingItem;