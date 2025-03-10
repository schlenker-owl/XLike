import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { ActivityIndicator, useTheme } from 'react-native-paper';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

// Import components
import SpaceDetails from '../../components/spaces/SpaceDetails';

// Sample spaces data - in a real app, you would fetch this from your API
const SPACES = [
  { 
    id: '1', 
    title: 'React Native Development in 2025', 
    hosts: [
      { id: 'host1', name: 'John Doe', avatar: 'https://randomuser.me/api/portraits/men/1.jpg' },
      { id: 'host2', name: 'Jane Smith', avatar: 'https://randomuser.me/api/portraits/women/1.jpg' }
    ],
    participants: 245,
    tags: ['technology', 'programming', 'mobile development'],
    description: 'Join us for an in-depth discussion on the future of React Native development. We will cover the latest features, best practices, and what to expect in 2025.',
    isLive: true,
  },
  { 
    id: '3', 
    title: 'Mobile App Security Discussion', 
    hosts: [
      { id: 'host4', name: 'Emma Williams', avatar: 'https://randomuser.me/api/portraits/women/2.jpg' },
      { id: 'host5', name: 'Mike Brown', avatar: 'https://randomuser.me/api/portraits/men/3.jpg' }
    ],
    scheduledFor: 'Tomorrow, 10:00 AM',
    tags: ['security', 'mobile', 'development'],
    description: 'Security experts discuss the latest trends and best practices in mobile app security. Learn how to protect your users and their data.',
  },
];

const SpaceDetailScreen = ({ navigation, route }) => {
  const theme = useTheme();
  const insets = useSafeAreaInsets();
  const [space, setSpace] = useState(null);
  const [loading, setLoading] = useState(true);
  
  const spaceId = route.params?.spaceId;

  // Simulate fetching space details
  useEffect(() => {
    if (spaceId) {
      // In a real app, you would fetch the space details from an API
      setTimeout(() => {
        const foundSpace = SPACES.find(s => s.id === spaceId);
        setSpace(foundSpace);
        setLoading(false);
      }, 1000);
    }
  }, [spaceId]);

  const handleBackPress = () => {
    navigation.goBack();
  };

  const handleJoinPress = (space) => {
    console.log('Join space:', space);
    // Join the space (would typically launch audio)
  };

  const handleReminderPress = (space) => {
    console.log('Set reminder for space:', space);
    // Set a reminder for the space
  };

  const handleSharePress = (space) => {
    console.log('Share space:', space);
    // Share the space
  };

  const handleHostPress = (host) => {
    console.log('Host profile pressed:', host);
    navigation.navigate('Profile', { userId: host.id });
  };

  if (loading) {
    return (
      <View style={[styles.loadingContainer, { paddingTop: insets.top }]}>
        <ActivityIndicator size="large" color={theme.colors.primary} />
      </View>
    );
  }

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <SpaceDetails
        space={space}
        onBackPress={handleBackPress}
        onJoinPress={handleJoinPress}
        onReminderPress={handleReminderPress}
        onSharePress={handleSharePress}
        onHostPress={handleHostPress}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
});

export default SpaceDetailScreen;