import React from 'react';
import { FlatList, StyleSheet, View, RefreshControl, ActivityIndicator } from 'react-native';
import { useTheme, Divider, Text } from 'react-native-paper';
import HomeTweet from './HomeTweet';

const TweetList = ({ 
  tweets, 
  loading, 
  refreshing, 
  onRefresh, 
  onTweetPress, 
  onProfilePress,
  ListHeaderComponent,
  ListEmptyComponent
}) => {
  const theme = useTheme();

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={theme.colors.primary} />
      </View>
    );
  }

  const renderItem = ({ item }) => (
    <HomeTweet
      tweet={item}
      onPress={() => onTweetPress(item.id)}
      onProfilePress={onProfilePress}
    />
  );

  const renderEmpty = () => {
    if (ListEmptyComponent) {
      return ListEmptyComponent;
    }
    
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>No tweets to display</Text>
      </View>
    );
  };

  return (
    <FlatList
      data={tweets}
      renderItem={renderItem}
      keyExtractor={item => item.id}
      ItemSeparatorComponent={() => <Divider />}
      ListHeaderComponent={ListHeaderComponent}
      ListEmptyComponent={renderEmpty}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
          colors={[theme.colors.primary]}
          tintColor={theme.colors.primary}
        />
      }
      contentContainerStyle={tweets.length === 0 ? styles.emptyList : null}
    />
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  emptyText: {
    fontSize: 16,
    color: '#657786',
  },
  emptyList: {
    flexGrow: 1,
  },
});

export default TweetList;