import React from 'react';
import { View, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Text, Avatar, useTheme } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

// Helper function to format time
const formatTime = (date) => {
  const now = new Date();
  const diff = (now - date) / 1000 / 60; // diff in minutes

  if (diff < 1) return 'now';
  if (diff < 60) return `${Math.floor(diff)}m`;
  if (diff < 24 * 60) return `${Math.floor(diff / 60)}h`;
  
  // If it's from a different year
  if (date.getFullYear() !== now.getFullYear()) {
    return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
  }
  
  // If it's from this year but not today
  return `${date.getMonth() + 1}/${date.getDate()}`;
};

// Helper function to format numbers
const formatNumber = (num) => {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + 'M';
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'K';
  }
  return num.toString();
};

const HomeTweet = ({ tweet, onPress, onProfilePress }) => {
  const theme = useTheme();
  
  return (
    <TouchableOpacity style={styles.container} onPress={onPress} activeOpacity={0.8}>
      <TouchableOpacity onPress={() => onProfilePress(tweet.user.id)}>
        <Avatar.Image
          source={{ uri: tweet.user.avatar }}
          size={48}
          style={styles.avatar}
        />
      </TouchableOpacity>
      
      <View style={styles.contentContainer}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => onProfilePress(tweet.user.id)}>
            <Text style={styles.name} numberOfLines={1}>
              {tweet.user.name}
              {tweet.user.verified && (
                <Icon name="check-decagram" size={14} color={theme.colors.primary} style={styles.verifiedIcon} />
              )}
            </Text>
          </TouchableOpacity>
          <Text style={styles.username}>@{tweet.user.username}</Text>
          <Text style={styles.dot}>·</Text>
          <Text style={styles.time}>{formatTime(tweet.createdAt)}</Text>
          
          <TouchableOpacity style={styles.moreButton}>
            <Icon name="dots-horizontal" size={16} color={theme.twitter.lightGray} />
          </TouchableOpacity>
        </View>
        
        <Text style={styles.content}>{tweet.content}</Text>
        
        {tweet.images && tweet.images.length > 0 && (
          <Image 
            source={{ uri: tweet.images[0] }} 
            style={styles.image} 
            resizeMode="cover" 
          />
        )}
        
        <View style={styles.actionsContainer}>
          <TouchableOpacity style={styles.actionButton}>
            <Icon name="comment-outline" size={16} color={theme.twitter.lightGray} />
            <Text style={styles.actionText}>{formatNumber(tweet.stats.comments)}</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.actionButton}>
            <Icon name="repeat" size={16} color={theme.twitter.lightGray} />
            <Text style={styles.actionText}>{formatNumber(tweet.stats.retweets)}</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.actionButton}>
            <Icon name="heart-outline" size={16} color={theme.twitter.lightGray} />
            <Text style={styles.actionText}>{formatNumber(tweet.stats.likes)}</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.actionButton}>
            <Icon name="share-outline" size={16} color={theme.twitter.lightGray} />
          </TouchableOpacity>
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
  avatar: {
    marginRight: 12,
  },
  contentContainer: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    marginBottom: 4,
  },
  name: {
    fontWeight: 'bold',
    marginRight: 4,
  },
  verifiedIcon: {
    marginLeft: 2,
  },
  username: {
    color: '#657786',
    marginRight: 4,
  },
  dot: {
    color: '#657786',
    marginHorizontal: 4,
  },
  time: {
    color: '#657786',
  },
  moreButton: {
    marginLeft: 'auto',
  },
  content: {
    marginBottom: 10,
    lineHeight: 20,
  },
  image: {
    width: '100%',
    aspectRatio: 16 / 9,
    borderRadius: 12,
    marginBottom: 10,
  },
  actionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginRight: 32,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionText: {
    marginLeft: 4,
    fontSize: 12,
    color: '#657786',
  },
});

export default HomeTweet;