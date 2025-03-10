import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

// Import components
import NotificationsHeader from '../../components/notifications/NotificationsHeader';
import NotificationsTabs from '../../components/notifications/NotificationsTabs';
import NotificationsList from '../../components/notifications/NotificationsList';

// Sample notifications data
const ALL_NOTIFICATIONS = [
  { 
    id: '1', 
    type: 'like',
    user: {
      id: 'user1',
      name: 'John Doe',
      avatar: 'https://randomuser.me/api/portraits/men/1.jpg',
      verified: true,
    },
    content: 'liked your tweet',
    time: '2h',
    tweetText: 'React Native is awesome! #ReactNative #MobileDev',
  },
  { 
    id: '2', 
    type: 'retweet',
    user: {
      id: 'user2',
      name: 'Jane Smith',
      avatar: 'https://randomuser.me/api/portraits/women/1.jpg',
      verified: false,
    },
    content: 'retweeted your tweet',
    time: '5h',
    tweetText: 'Just launched my new app! Check it out.',
  },
  { 
    id: '3', 
    type: 'follow',
    user: {
      id: 'user3',
      name: 'Alex Johnson',
      avatar: 'https://randomuser.me/api/portraits/men/2.jpg',
      verified: false,
    },
    content: 'followed you',
    time: '1d',
  },
  { 
    id: '4', 
    type: 'mention',
    user: {
      id: 'user4',
      name: 'Emma Williams',
      avatar: 'https://randomuser.me/api/portraits/women/2.jpg',
      verified: true,
    },
    content: 'mentioned you',
    time: '2d',
    tweetText: 'Hey @user! What do you think about this new React Native feature?',
  },
  { 
    id: '5', 
    type: 'reply',
    user: {
      id: 'user5',
      name: 'David Wilson',
      avatar: 'https://randomuser.me/api/portraits/men/3.jpg',
      verified: false,
    },
    content: 'replied to your tweet',
    time: '3d',
    tweetText: 'I agree with your thoughts on React Native. It\'s definitely revolutionizing mobile development!',
  },
];

const NotificationsScreen = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  const [selectedTabIndex, setSelectedTabIndex] = useState(0);
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  
  const tabs = ['All', 'Mentions'];

  // Simulate fetching notifications
  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = () => {
    // Simulate network request delay
    setTimeout(() => {
      filterNotifications(selectedTabIndex);
      setLoading(false);
    }, 1000);
  };

  const filterNotifications = (tabIndex) => {
    if (tabIndex === 0) {
      // All notifications
      setNotifications(ALL_NOTIFICATIONS);
    } else {
      // Only mentions
      setNotifications(ALL_NOTIFICATIONS.filter(notification => notification.type === 'mention'));
    }
  };

  const handleTabPress = (index) => {
    setSelectedTabIndex(index);
    setLoading(true);
    
    // Simulate filtering delay
    setTimeout(() => {
      filterNotifications(index);
      setLoading(false);
    }, 500);
  };

  const handleRefresh = () => {
    setRefreshing(true);
    // Simulate network request delay
    setTimeout(() => {
      fetchNotifications();
      setRefreshing(false);
    }, 1000);
  };

  const handleNotificationPress = (notification) => {
    // Handle navigation based on notification type
    if (notification.type === 'follow') {
      navigation.navigate('Profile', { userId: notification.user.id });
    } else {
      // For likes, retweets, mentions, replies - navigate to the tweet
      navigation.navigate('TweetDetail', { tweetId: notification.id });
    }
  };

  const handleUserPress = (user) => {
    navigation.navigate('Profile', { userId: user.id });
  };

  const handleSettingsPress = () => {
    navigation.navigate('Settings');
  };

  const handleProfilePress = () => {
    navigation.navigate('Profile');
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <NotificationsHeader
        onSettingsPress={handleSettingsPress}
        onProfilePress={handleProfilePress}
      />
      
      <NotificationsTabs
        tabs={tabs}
        selectedIndex={selectedTabIndex}
        onTabPress={handleTabPress}
      />
      
      <NotificationsList
        notifications={notifications}
        loading={loading}
        refreshing={refreshing}
        onRefresh={handleRefresh}
        onNotificationPress={handleNotificationPress}
        onUserPress={handleUserPress}
        emptyType={selectedTabIndex === 0 ? 'all' : 'mentions'}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

export default NotificationsScreen;