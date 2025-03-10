import React, { useState, useEffect } from 'react';
import { View, StyleSheet, FlatList, Image, TouchableOpacity, Dimensions } from 'react-native';
import { Text, Avatar, Button, Appbar, useTheme, ActivityIndicator, Chip } from 'react-native-paper';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

// Import components
import Tweet from '../../components/Tweet';

// Mock data for user profile
const MOCK_USER = {
  id: 'user1',
  name: 'John Doe',
  username: 'johndoe',
  avatar: 'https://randomuser.me/api/portraits/men/1.jpg',
  verified: true,
  banner: 'https://picsum.photos/800/300',
  bio: 'iOS Dev | React Native enthusiast | Building cool stuff with @reactnative | Photography lover',
  location: 'San Francisco, CA',
  url: 'github.com/johndoe',
  joinDate: 'Joined September 2012',
  following: 456,
  followers: 1024,
  tweets: [
    {
      id: '1',
      user: {
        id: 'user1',
        name: 'John Doe',
        username: 'johndoe',
        avatar: 'https://randomuser.me/api/portraits/men/1.jpg',
        verified: true,
      },
      content: 'Just setting up my Twitter clone! #react-native #ios',
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
        id: 'user1',
        name: 'John Doe',
        username: 'johndoe',
        avatar: 'https://randomuser.me/api/portraits/men/1.jpg',
        verified: true,
      },
      content: 'Working on a new React Native project today. Loving the new features in the latest version!',
      images: ['https://picsum.photos/500/300?random=3'],
      createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
      stats: {
        comments: 12,
        retweets: 8,
        likes: 42,
      },
    },
  ],
};

const ProfileScreen = ({ navigation, route }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('tweets');
  const theme = useTheme();
  const insets = useSafeAreaInsets();
  const windowWidth = Dimensions.get('window').width;

  useEffect(() => {
    // Simulate fetching user data
    setTimeout(() => {
      setUser(MOCK_USER);
      setLoading(false);
    }, 1000);
  }, [route.params?.userId]);

  const handleTweetPress = (tweetId) => {
    navigation.navigate('TweetDetail', { tweetId });
  };

  const handleBackPress = () => {
    navigation.goBack();
  };

  const renderHeader = () => {
    if (!user) return null;

    return (
      <View style={styles.profileContainer}>
        {/* Banner Image */}
        <Image source={{ uri: user.banner }} style={styles.bannerImage} />
        
        {/* Avatar */}
        <View style={styles.avatarContainer}>
          <Avatar.Image
            source={{ uri: user.avatar }}
            size={80}
            style={styles.avatar}
          />
        </View>
        
        {/* Edit Profile Button */}
        <View style={styles.editButtonContainer}>
          <Button
            mode="outlined"
            style={styles.editButton}
            color={theme.colors.primary}
            labelStyle={styles.editButtonLabel}
          >
            Edit profile
          </Button>
        </View>
        
        {/* User Info */}
        <View style={styles.userInfoContainer}>
          <View style={styles.nameContainer}>
            <Text style={styles.name}>{user.name}</Text>
            {user.verified && (
              <Icon name="check-decagram" size={18} color={theme.colors.primary} style={styles.verifiedIcon} />
            )}
          </View>
          <Text style={styles.username}>@{user.username}</Text>
          
          {user.bio && <Text style={styles.bio}>{user.bio}</Text>}
          
          <View style={styles.metadataContainer}>
            {user.location && (
              <View style={styles.metadataItem}>
                <Icon name="map-marker-outline" size={16} color="#657786" />
                <Text style={styles.metadataText}>{user.location}</Text>
              </View>
            )}
            
            {user.url && (
              <View style={styles.metadataItem}>
                <Icon name="link-variant" size={16} color="#657786" />
                <Text style={[styles.metadataText, { color: theme.colors.primary }]}>{user.url}</Text>
              </View>
            )}
            
            {user.joinDate && (
              <View style={styles.metadataItem}>
                <Icon name="calendar-outline" size={16} color="#657786" />
                <Text style={styles.metadataText}>{user.joinDate}</Text>
              </View>
            )}
          </View>
          
          <View style={styles.statsContainer}>
            <TouchableOpacity style={styles.statItem}>
              <Text style={styles.statValue}>{user.following}</Text>
              <Text style={styles.statLabel}>Following</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.statItem}>
              <Text style={styles.statValue}>{user.followers}</Text>
              <Text style={styles.statLabel}>Followers</Text>
            </TouchableOpacity>
          </View>
        </View>
        
        {/* Tabs */}
        <View style={styles.tabsContainer}>
          <TouchableOpacity
            style={[
              styles.tab,
              activeTab === 'tweets' && { borderBottomColor: theme.colors.primary }
            ]}
            onPress={() => setActiveTab('tweets')}
          >
            <Text style={[
              styles.tabText,
              activeTab === 'tweets' && { color: theme.colors.primary }
            ]}>
              Tweets
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            style={[
              styles.tab,
              activeTab === 'replies' && { borderBottomColor: theme.colors.primary }
            ]}
            onPress={() => setActiveTab('replies')}
          >
            <Text style={[
              styles.tabText,
              activeTab === 'replies' && { color: theme.colors.primary }
            ]}>
              Tweets & replies
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            style={[
              styles.tab,
              activeTab === 'media' && { borderBottomColor: theme.colors.primary }
            ]}
            onPress={() => setActiveTab('media')}
          >
            <Text style={[
              styles.tabText,
              activeTab === 'media' && { color: theme.colors.primary }
            ]}>
              Media
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            style={[
              styles.tab,
              activeTab === 'likes' && { borderBottomColor: theme.colors.primary }
            ]}
            onPress={() => setActiveTab('likes')}
          >
            <Text style={[
              styles.tabText,
              activeTab === 'likes' && { color: theme.colors.primary }
            ]}>
              Likes
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  const renderItem = ({ item }) => (
    <Tweet
      tweet={item}
      onPress={() => handleTweetPress(item.id)}
      onProfilePress={() => {}}
    />
  );

  if (loading) {
    return (
      <View style={[styles.container, { paddingTop: insets.top }]}>
        <Appbar.Header style={styles.header}>
          <Appbar.BackAction onPress={handleBackPress} />
          <Appbar.Content title="Profile" />
        </Appbar.Header>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={theme.colors.primary} />
        </View>
      </View>
    );
  }

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <Appbar.Header style={styles.header}>
        <Appbar.BackAction onPress={handleBackPress} />
        <Appbar.Content title="Profile" />
      </Appbar.Header>
      
      <FlatList
        data={user?.tweets || []}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={renderHeader}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
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
  },
  profileContainer: {
    backgroundColor: '#fff',
  },
  bannerImage: {
    width: '100%',
    height: 150,
  },
  avatarContainer: {
    marginTop: -40,
    marginLeft: 16,
    borderRadius: 40,
    borderWidth: 4,
    borderColor: '#fff',
    backgroundColor: '#fff',
    width: 88,
    height: 88,
  },
  avatar: {
    backgroundColor: '#fff',
  },
  editButtonContainer: {
    position: 'absolute',
    top: 160,
    right: 16,
  },
  editButton: {
    borderColor: '#1DA1F2',
    borderRadius: 20,
  },
  editButtonLabel: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  userInfoContainer: {
    padding: 16,
  },
  nameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  verifiedIcon: {
    marginLeft: 4,
  },
  username: {
    fontSize: 16,
    color: '#657786',
    marginBottom: 12,
  },
  bio: {
    fontSize: 16,
    marginBottom: 12,
    lineHeight: 22,
  },
  metadataContainer: {
    flexDirection: 'column',
    marginBottom: 12,
  },
  metadataItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 12,
    marginBottom: 4,
  },
  metadataText: {
    fontSize: 14,
    color: '#657786',
    marginLeft: 4,
  },
  statsContainer: {
    flexDirection: 'row',
  },
  statItem: {
    flexDirection: 'row',
    marginRight: 12,
  },
  statValue: {
    fontSize: 14,
    fontWeight: 'bold',
    marginRight: 4,
  },
  statLabel: {
    fontSize: 14,
    color: '#657786',
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
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  tabText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#657786',
  },
  separator: {
    height: 0.5,
    backgroundColor: '#E1E8ED',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ProfileScreen;