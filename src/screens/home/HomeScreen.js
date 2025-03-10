import React, { useState, useEffect } from 'react';
import { View, StyleSheet, StatusBar } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

// Import components
import HomeHeader from '../../components/home/HomeHeader';
import TweetList from '../../components/home/TweetList';
import NewTweetFAB from '../../components/home/NewTweetFAB';

// Sample tweet data - in a real app, this would come from an API
const SAMPLE_TWEETS = [
  {
    id: '1',
    user: {
      id: 'user1',
      name: 'John Doe',
      username: 'johndoe',
      avatar: 'https://randomuser.me/api/portraits/men/1.jpg',
      verified: true,
    },
    content: 'Just setting up my Twitter clone with React Native! #reactnative #twitter #clone',
    images: [],
    createdAt: new Date(Date.now() - 25 * 60 * 1000), // 25 minutes ago
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
    content: 'This React Native Twitter clone is looking great! Check out the UI components and smooth animations. #mobiledev',
    images: ['https://picsum.photos/500/300'],
    createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
    stats: {
      comments: 8,
      retweets: 4,
      likes: 16,
    },
  },
  {
    id: '3',
    user: {
      id: 'user3',
      name: 'Tech Insider',
      username: 'techinsider',
      avatar: 'https://randomuser.me/api/portraits/men/2.jpg',
      verified: true,
    },
    content: 'Breaking: New features coming to iOS 16! Apple announces exciting updates for developers.',
    images: ['https://picsum.photos/500/300?random=1'],
    createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), // 1 day ago
    stats: {
      comments: 42,
      retweets: 128,
      likes: 507,
    },
  },
  {
    id: '4',
    user: {
      id: 'user4',
      name: 'React Native',
      username: 'reactnative',
      avatar: 'https://randomuser.me/api/portraits/men/3.jpg',
      verified: true,
    },
    content: 'React Native 0.72 is out now with many performance improvements and new features!',
    images: ['https://picsum.photos/500/300?random=2'],
    createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // 3 days ago
    stats: {
      comments: 87,
      retweets: 234,
      likes: 876,
    },
  },
];

const HomeScreen = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  const [selectedTabIndex, setSelectedTabIndex] = useState(0);
  const [tweets, setTweets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const tabs = ["For you", "Following"];

  // Simulating data fetching
  useEffect(() => {
    // In a real app, you would fetch data from an API
    const fetchData = async () => {
      try {
        // Simulate network delay
        setTimeout(() => {
          setTweets(SAMPLE_TWEETS);
          setLoading(false);
        }, 1000);
      } catch (error) {
        console.error('Error fetching tweets:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleRefresh = () => {
    setRefreshing(true);
    // In a real app, you would fetch fresh data from an API
    setTimeout(() => {
      setTweets(SAMPLE_TWEETS);
      setRefreshing(false);
    }, 1000);
  };

  const handleTweetPress = (tweetId) => {
    navigation.navigate('TweetDetail', { tweetId });
  };

  const handleProfilePress = (userId) => {
    navigation.navigate('Profile', { userId });
  };

  const handleNewTweet = () => {
    navigation.navigate('NewTweet');
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <StatusBar barStyle="dark-content" />
      
      <HomeHeader
        onProfilePress={() => navigation.navigate('Profile')}
        tabs={tabs}
        selectedTabIndex={selectedTabIndex}
        onTabPress={setSelectedTabIndex}
      />
      
      <TweetList
        tweets={tweets}
        loading={loading}
        refreshing={refreshing}
        onRefresh={handleRefresh}
        onTweetPress={handleTweetPress}
        onProfilePress={handleProfilePress}
      />
      
      <NewTweetFAB onPress={handleNewTweet} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

export default HomeScreen;