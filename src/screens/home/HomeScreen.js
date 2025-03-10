import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, StatusBar } from 'react-native';
import { Avatar, FAB, Appbar, useTheme, Divider } from 'react-native-paper';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

// Sample tweet data
const SAMPLE_TWEETS = [
  { id: '1', content: 'This is a sample tweet 1', user: 'User 1' },
  { id: '2', content: 'This is a sample tweet 2', user: 'User 2' },
  { id: '3', content: 'This is a sample tweet 3', user: 'User 3' },
  { id: '4', content: 'This is a sample tweet 4', user: 'User 4' },
  { id: '5', content: 'This is a sample tweet 5', user: 'User 5' },
];

const HomeScreen = ({ navigation }) => {
  const theme = useTheme();
  const insets = useSafeAreaInsets();
  const [selectedTabIndex, setSelectedTabIndex] = useState(0);
  const tabs = ["For you", "Following"];

  const renderHeader = () => (
    <Appbar.Header style={styles.header}>
      <TouchableOpacity 
        style={styles.profileButton}
        onPress={() => navigation.navigate('Profile')}
      >
        <Avatar.Image source={{ uri: 'https://randomuser.me/api/portraits/men/1.jpg' }} size={32} />
      </TouchableOpacity>
      
      <View style={styles.tabsContainer}>
        {tabs.map((tab, index) => (
          <TouchableOpacity 
            key={index}
            style={[
              styles.tab, 
              selectedTabIndex === index && styles.selectedTab
            ]}
            onPress={() => setSelectedTabIndex(index)}
          >
            <Text style={[
              styles.tabText,
              selectedTabIndex === index && styles.selectedTabText
            ]}>
              {tab}
            </Text>
            {selectedTabIndex === index && <View style={styles.indicator} />}
          </TouchableOpacity>
        ))}
      </View>
      
      <TouchableOpacity>
        <Icon name="cog-outline" size={24} color={theme.colors.primary} />
      </TouchableOpacity>
    </Appbar.Header>
  );

  const renderItem = ({ item }) => (
    <TouchableOpacity 
      style={styles.tweetContainer}
      onPress={() => navigation.navigate('TweetDetail', { tweetId: item.id })}
    >
      <Avatar.Image source={{ uri: `https://randomuser.me/api/portraits/men/${parseInt(item.id)}.jpg` }} size={50} />
      <View style={styles.tweetContent}>
        <Text style={styles.userName}>{item.user}</Text>
        <Text>{item.content}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <StatusBar barStyle="dark-content" />
      
      {renderHeader()}
      
      <FlatList
        data={SAMPLE_TWEETS}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        ItemSeparatorComponent={() => <Divider />}
      />
      
      <FAB
        style={[styles.fab, { backgroundColor: theme.colors.primary }]}
        icon="plus"
        color="#fff"
        onPress={() => navigation.navigate('NewTweet')}
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
    backgroundColor: '#fff',
    elevation: 0,
    shadowOpacity: 0,
    justifyContent: 'space-between',
  },
  profileButton: {
    padding: 8,
  },
  tabsContainer: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'center',
  },
  tab: {
    paddingHorizontal: 16,
    alignItems: 'center',
    height: 42,
    justifyContent: 'center',
  },
  selectedTab: {
    position: 'relative',
  },
  tabText: {
    fontSize: 15,
    fontWeight: '500',
    color: '#657786',
  },
  selectedTabText: {
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
  tweetContainer: {
    flexDirection: 'row',
    padding: 16,
  },
  tweetContent: {
    marginLeft: 12,
    flex: 1,
  },
  userName: {
    fontWeight: 'bold',
    marginBottom: 4,
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  },
});

export default HomeScreen;