import React from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { Text, Appbar, useTheme, Divider } from 'react-native-paper';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

// Import components
import Tweet from '../../components/Tweet';

// Sample bookmark data
const BOOKMARKED_TWEETS = [
  {
    id: '1',
    user: {
      id: 'user1',
      name: 'John Doe',
      username: 'johndoe',
      avatar: 'https://randomuser.me/api/portraits/men/1.jpg',
      verified: true,
    },
    content: 'This is an important tweet that I want to save for later. #important #bookmark',
    images: [],
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
    stats: {
      comments: 5,
      retweets: 2,
      likes: 10,
    },
  },
  {
    id: '2',
    user: {
      id: 'user2',
      name: 'Jane Smith',
      username: 'janesmith',
      avatar: 'https://randomuser.me/api/portraits/women/1.jpg',
      verified: false,
    },
    content: 'Here\'s a great resource for React Native developers. Check out this tutorial!',
    images: ['https://picsum.photos/500/300'],
    createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000), // 5 days ago
    stats: {
      comments: 8,
      retweets: 15,
      likes: 42,
    },
  },
];

const BookmarksScreen = ({ navigation }) => {
  const theme = useTheme();
  const insets = useSafeAreaInsets();

  const handleTweetPress = (tweetId) => {
    navigation.navigate('TweetDetail', { tweetId });
  };

  const handleProfilePress = (userId) => {
    navigation.navigate('Profile', { userId });
  };

  const renderItem = ({ item }) => (
    <Tweet
      tweet={item}
      onPress={() => handleTweetPress(item.id)}
      onProfilePress={() => handleProfilePress(item.user.id)}
    />
  );

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <Appbar.Header style={styles.header}>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content title="Bookmarks" />
        <Appbar.Action icon="dots-vertical" onPress={() => {}} />
      </Appbar.Header>
      
      {BOOKMARKED_TWEETS.length > 0 ? (
        <FlatList
          data={BOOKMARKED_TWEETS}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          ItemSeparatorComponent={() => <Divider />}
        />
      ) : (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyTitle}>Save Tweets for later</Text>
          <Text style={styles.emptyText}>
            Don't let the good ones fly away! Bookmark Tweets to easily find them again in the future.
          </Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    backgroundColor: '#fff',
    elevation: 0,
    shadowOpacity: 0,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
  },
  emptyTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  emptyText: {
    fontSize: 16,
    color: '#657786',
    textAlign: 'center',
    lineHeight: 22,
  },
});

export default BookmarksScreen;