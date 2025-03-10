import React, { useState } from 'react';
import { View, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { Text, Avatar, useTheme, Divider } from 'react-native-paper';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

// Sample notifications data
const ALL_NOTIFICATIONS = [
  { 
    id: '1', 
    type: 'like',
    user: {
      name: 'John Doe',
      avatar: 'https://randomuser.me/api/portraits/men/1.jpg',
    },
    content: 'liked your tweet',
    time: '2h',
    tweetText: 'React Native is awesome! #ReactNative #MobileDev',
  },
  { 
    id: '2', 
    type: 'retweet',
    user: {
      name: 'Jane Smith',
      avatar: 'https://randomuser.me/api/portraits/women/1.jpg',
    },
    content: 'retweeted your tweet',
    time: '5h',
    tweetText: 'Just launched my new app! Check it out.',
  },
  { 
    id: '3', 
    type: 'follow',
    user: {
      name: 'Alex Johnson',
      avatar: 'https://randomuser.me/api/portraits/men/2.jpg',
    },
    content: 'followed you',
    time: '1d',
  },
  { 
    id: '4', 
    type: 'mention',
    user: {
      name: 'Emma Williams',
      avatar: 'https://randomuser.me/api/portraits/women/2.jpg',
    },
    content: 'mentioned you',
    time: '2d',
    tweetText: 'Hey @user! What do you think about this new React Native feature?',
  },
];

const NotificationsScreen = ({ navigation }) => {
  const theme = useTheme();
  const insets = useSafeAreaInsets();
  const [selectedTab, setSelectedTab] = useState('all');
  const [notifications, setNotifications] = useState(ALL_NOTIFICATIONS);

  const tabs = [
    { key: 'all', label: 'All' },
    { key: 'mentions', label: 'Mentions' },
  ];

  const handleTabChange = (tabKey) => {
    setSelectedTab(tabKey);
    if (tabKey === 'all') {
      setNotifications(ALL_NOTIFICATIONS);
    } else if (tabKey === 'mentions') {
      setNotifications(ALL_NOTIFICATIONS.filter(notif => notif.type === 'mention'));
    }
  };

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'like':
        return { name: 'heart', color: 'red' };
      case 'retweet':
        return { name: 'repeat', color: 'green' };
      case 'follow':
        return { name: 'account-plus', color: theme.colors.primary };
      case 'mention':
        return { name: 'at', color: theme.colors.primary };
      default:
        return { name: 'bell', color: theme.colors.primary };
    }
  };

  const renderNotificationItem = ({ item }) => {
    const icon = getNotificationIcon(item.type);
    
    return (
      <TouchableOpacity 
        style={styles.notificationItem}
        onPress={() => {
          if (item.type === 'follow') {
            navigation.navigate('Profile', { userId: item.user.id });
          } else {
            navigation.navigate('TweetDetail', { tweetId: item.id });
          }
        }}
      >
        <View style={styles.iconContainer}>
          <Icon name={icon.name} size={20} color={icon.color} />
        </View>
        
        <View style={styles.notificationContent}>
          <View style={styles.userInfo}>
            <Avatar.Image source={{ uri: item.user.avatar }} size={40} />
            <View style={styles.textContent}>
              <Text style={styles.userName}>{item.user.name} <Text style={styles.action}>{item.content}</Text></Text>
              
              {item.tweetText && (
                <Text style={styles.tweetText} numberOfLines={2}>
                  {item.tweetText}
                </Text>
              )}
            </View>
          </View>
          
          <Text style={styles.time}>{item.time}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Notifications</Text>
        <TouchableOpacity>
          <Icon name="cog-outline" size={24} color="#000" />
        </TouchableOpacity>
      </View>
      
      <View style={styles.tabsContainer}>
        {tabs.map((tab) => (
          <TouchableOpacity
            key={tab.key}
            style={[
              styles.tab,
              selectedTab === tab.key && styles.selectedTab
            ]}
            onPress={() => handleTabChange(tab.key)}
          >
            <Text style={[
              styles.tabLabel,
              selectedTab === tab.key && styles.selectedTabLabel
            ]}>
              {tab.label}
            </Text>
            {selectedTab === tab.key && <View style={styles.indicator} />}
          </TouchableOpacity>
        ))}
      </View>
      
      <FlatList
        data={notifications}
        renderItem={renderNotificationItem}
        keyExtractor={item => item.id}
        ItemSeparatorComponent={() => <Divider />}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  tabsContainer: {
    flexDirection: 'row',
    borderBottomWidth: 0.5,
    borderBottomColor: '#E1E8ED',
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 12,
    position: 'relative',
  },
  selectedTab: {},
  tabLabel: {
    fontSize: 16,
    color: '#657786',
  },
  selectedTabLabel: {
    color: '#000',
    fontWeight: 'bold',
  },
  indicator: {
    position: 'absolute',
    bottom: 0,
    height: 4,
    width: 30,
    backgroundColor: '#1DA1F2',
    borderRadius: 2,
  },
  listContent: {
    paddingBottom: 20,
  },
  notificationItem: {
    flexDirection: 'row',
    padding: 16,
  },
  iconContainer: {
    marginRight: 12,
    width: 20,
    alignItems: 'center',
  },
  notificationContent: {
    flex: 1,
  },
  userInfo: {
    flexDirection: 'row',
  },
  textContent: {
    flex: 1,
    marginLeft: 12,
  },
  userName: {
    fontWeight: 'bold',
    marginBottom: 4,
    flexShrink: 1,
  },
  action: {
    fontWeight: 'normal',
    color: '#657786',
  },
  tweetText: {
    color: '#657786',
  },
  time: {
    fontSize: 12,
    color: '#657786',
    marginTop: 4,
    alignSelf: 'flex-end',
  },
});

export default NotificationsScreen;