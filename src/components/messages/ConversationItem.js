import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Text, Avatar, useTheme } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const ConversationItem = ({ 
  conversation, 
  onPress
}) => {
  const theme = useTheme();
  
  return (
    <TouchableOpacity 
      style={styles.container}
      onPress={() => onPress && onPress(conversation)}
      activeOpacity={0.7}
    >
      <Avatar.Image
        source={{ uri: conversation.user.avatar }}
        size={50}
      />
      
      <View style={styles.contentContainer}>
        <View style={styles.headerContainer}>
          <View style={styles.nameContainer}>
            <Text style={styles.userName} numberOfLines={1}>
              {conversation.user.name}
              {conversation.user.verified && (
                <Icon name="check-decagram" size={14} color={theme.colors.primary} style={styles.verifiedIcon} />
              )}
            </Text>
            
            {conversation.user.isGroup && (
              <View style={styles.groupBadge}>
                <Text style={styles.groupLabel}>Group</Text>
              </View>
            )}
          </View>
          
          <Text style={styles.time}>{conversation.time}</Text>
        </View>
        
        <View style={styles.messageContainer}>
          <Text 
            style={[
              styles.lastMessage,
              conversation.unread && styles.unreadMessage
            ]}
            numberOfLines={2}
          >
            {conversation.lastMessage}
          </Text>
          
          {conversation.unread && (
            <View style={[styles.unreadIndicator, { backgroundColor: theme.colors.primary }]} />
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 16,
    backgroundColor: '#fff',
  },
  contentContainer: {
    flex: 1,
    marginLeft: 12,
  },
  headerContainer: {
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
    marginRight: 4,
  },
  verifiedIcon: {
    marginLeft: 2,
  },
  groupBadge: {
    backgroundColor: '#EFF3F4',
    borderRadius: 4,
    paddingHorizontal: 6,
    paddingVertical: 2,
    marginLeft: 6,
  },
  groupLabel: {
    fontSize: 12,
    color: '#657786',
  },
  time: {
    color: '#657786',
    fontSize: 14,
  },
  messageContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  lastMessage: {
    color: '#657786',
    fontSize: 15,
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
    marginLeft: 6,
  },
});

export default ConversationItem;