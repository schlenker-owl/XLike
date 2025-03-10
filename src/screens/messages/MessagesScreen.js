import React, { useState } from 'react';
import { View, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { Text, Avatar, Searchbar, useTheme, Divider, FAB } from 'react-native-paper';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

// Sample conversations data
const CONVERSATIONS = [
  { 
    id: '1', 
    user: {
      name: 'John Doe',
      avatar: 'https://randomuser.me/api/portraits/men/1.jpg',
      username: 'johndoe',
      verified: true,
    },
    lastMessage: 'Hey, what do you think about the new React Native update?',
    time: '2h',
    unread: true,
  },
  { 
    id: '2', 
    user: {
      name: 'Jane Smith',
      avatar: 'https://randomuser.me/api/portraits/women/1.jpg',
      username: 'janesmith',
      verified: false,
    },
    lastMessage: 'The project is looking great! Can\'t wait to see the final result.',
    time: '1d',
    unread: false,
  },
  { 
    id: '3', 
    user: {
      name: 'Alex Johnson',
      avatar: 'https://randomuser.me/api/portraits/men/2.jpg',
      username: 'alexj',
      verified: false,
    },
    lastMessage: 'Are we still meeting tomorrow for coffee?',
    time: '2d',
    unread: false,
  },
  { 
    id: '4', 
    user: {
      name: 'Tech Group',
      avatar: 'https://randomuser.me/api/portraits/men/3.jpg',
      username: 'techgroup',
      isGroup: true,
    },
    lastMessage: 'Emma: Has anyone tried the new iOS beta yet?',
    time: '3d',
    unread: true,
  },
];

const MessagesScreen = ({ navigation }) => {
  const theme = useTheme();
  const insets = useSafeAreaInsets();
  const [searchQuery, setSearchQuery] = useState('');
  
  const onChangeSearch = query => setSearchQuery(query);

  const renderConversationItem = ({ item }) => (
    <TouchableOpacity 
      style={styles.conversationItem}
      onPress={() => navigation.navigate('MessageDetail', { conversationId: item.id })}
    >
      <Avatar.Image source={{ uri: item.user.avatar }} size={50} />
      
      <View style={styles.conversationContent}>
        <View style={styles.conversationHeader}>
          <View style={styles.nameContainer}>
            <Text style={styles.userName} numberOfLines={1}>
              {item.user.name}
              {item.user.verified && (
                <Icon name="check-decagram" size={14} color={theme.colors.primary} style={styles.verifiedIcon} />
              )}
            </Text>
            {item.user.isGroup && (
              <Text style={styles.groupLabel}>Group</Text>
            )}
          </View>
          <Text style={styles.time}>{item.time}</Text>
        </View>
        
        <View style={styles.messageContainer}>
          <Text 
            style={[
              styles.lastMessage, 
              item.unread && styles.unreadMessage
            ]} 
            numberOfLines={2}
          >
            {item.lastMessage}
          </Text>
          
          {item.unread && (
            <View style={styles.unreadIndicator} />
          )}
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
            <Avatar.Image source={{ uri: 'https://randomuser.me/api/portraits/men/1.jpg' }} size={32} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Messages</Text>
        </View>
        <TouchableOpacity>
          <Icon name="cog-outline" size={24} color="#000" />
        </TouchableOpacity>
      </View>
      
      <View style={styles.searchContainer}>
        <Searchbar
          placeholder="Search Direct Messages"
          onChangeText={onChangeSearch}
          value={searchQuery}
          style={styles.searchBar}
          iconColor={theme.colors.primary}
        />
      </View>
      
      <FlatList
        data={CONVERSATIONS}
        renderItem={renderConversationItem}
        keyExtractor={item => item.id}
        ItemSeparatorComponent={() => <Divider />}
        contentContainerStyle={styles.listContent}
      />
      
      <FAB
        style={[styles.fab, { backgroundColor: theme.colors.primary }]}
        icon="plus"
        color="#fff"
        onPress={() => navigation.navigate('NewMessage')}
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
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginLeft: 16,
  },
  searchContainer: {
    padding: 10,
    backgroundColor: '#fff',
  },
  searchBar: {
    elevation: 0,
    borderRadius: 20,
    backgroundColor: '#EFF3F4',
  },
  listContent: {
    paddingBottom: 20,
  },
  conversationItem: {
    flexDirection: 'row',
    padding: 16,
  },
  conversationContent: {
    flex: 1,
    marginLeft: 12,
  },
  conversationHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  nameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  userName: {
    fontWeight: 'bold',
    fontSize: 16,
    flex: 1,
  },
  verifiedIcon: {
    marginLeft: 2,
  },
  groupLabel: {
    backgroundColor: '#EFF3F4',
    color: '#657786',
    fontSize: 12,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    marginLeft: 8,
  },
  time: {
    color: '#657786',
    fontSize: 12,
  },
  messageContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  lastMessage: {
    color: '#657786',
    fontSize: 14,
    flex: 1,
  },
  unreadMessage: {
    color: '#000',
    fontWeight: '500',
  },
  unreadIndicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#1DA1F2',
    marginLeft: 4,
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  },
});

export default MessagesScreen;