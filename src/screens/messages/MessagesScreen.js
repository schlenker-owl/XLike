import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

// Import components
import MessagesHeader from '../../components/messages/MessagesHeader';
import MessageSearch from '../../components/messages/MessageSearch';
import ConversationsList from '../../components/messages/ConversationsList';
import NewMessageFAB from '../../components/messages/NewMessageFAB';

// Sample conversations data
const CONVERSATIONS = [
  { 
    id: '1', 
    user: {
      id: 'user1',
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
      id: 'user2',
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
      id: 'user3',
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
      id: 'user4',
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
  const insets = useSafeAreaInsets();
  const [searchQuery, setSearchQuery] = useState('');
  const [conversations, setConversations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  
  // Simulate fetching conversations
  useEffect(() => {
    fetchConversations();
  }, []);
  
  const fetchConversations = () => {
    // Simulate network delay
    setTimeout(() => {
      setConversations(CONVERSATIONS);
      setLoading(false);
    }, 1000);
  };
  
  const handleSearchChange = (query) => {
    setSearchQuery(query);
    
    // Filter conversations based on search query
    if (query.trim() === '') {
      setConversations(CONVERSATIONS);
    } else {
      const filteredConversations = CONVERSATIONS.filter(
        conversation => 
          conversation.user.name.toLowerCase().includes(query.toLowerCase()) ||
          conversation.user.username.toLowerCase().includes(query.toLowerCase()) ||
          conversation.lastMessage.toLowerCase().includes(query.toLowerCase())
      );
      setConversations(filteredConversations);
    }
  };
  
  const handleSearchFocus = () => {
    // Handle search focus if needed
    console.log('Search focused');
  };
  
  const handleRefresh = () => {
    setRefreshing(true);
    // Simulate network delay
    setTimeout(() => {
      fetchConversations();
      setRefreshing(false);
    }, 1000);
  };
  
  const handleConversationPress = (conversation) => {
    // Navigate to conversation detail
    navigation.navigate('ConversationDetail', { 
      conversationId: conversation.id,
      userName: conversation.user.name,
      isGroup: conversation.user.isGroup
    });
  };
  
  const handleProfilePress = () => {
    navigation.navigate('Profile');
  };
  
  const handleSettingsPress = () => {
    navigation.navigate('MessageSettings');
  };
  
  const handleNewMessage = () => {
    navigation.navigate('NewMessage');
  };
  
  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <MessagesHeader
        onProfilePress={handleProfilePress}
        onSettingsPress={handleSettingsPress}
      />
      
      <MessageSearch
        searchQuery={searchQuery}
        onChangeSearch={handleSearchChange}
        onFocus={handleSearchFocus}
      />
      
      <ConversationsList
        conversations={conversations}
        loading={loading}
        refreshing={refreshing}
        onRefresh={handleRefresh}
        onConversationPress={handleConversationPress}
      />
      
      <NewMessageFAB onPress={handleNewMessage} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

export default MessagesScreen;