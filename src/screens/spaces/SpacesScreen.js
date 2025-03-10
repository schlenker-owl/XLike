import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView, RefreshControl } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from 'react-native-paper';

// Import components
import SpacesHeader from '../../components/spaces/SpacesHeader';
import SpaceSearch from '../../components/spaces/SpaceSearch';
import SpaceCategoryTabs from '../../components/spaces/SpaceCategoryTabs';
import SpacesSection from '../../components/spaces/SpacesSection';
import SpacesList from '../../components/spaces/SpacesList';
import CreateSpaceButton from '../../components/spaces/CreateSpaceButton';

// Sample data for spaces
const LIVE_SPACES = [
  { 
    id: '1', 
    title: 'React Native Development in 2025', 
    hosts: [
      { id: 'host1', name: 'John Doe', avatar: 'https://randomuser.me/api/portraits/men/1.jpg' },
      { id: 'host2', name: 'Jane Smith', avatar: 'https://randomuser.me/api/portraits/women/1.jpg' }
    ],
    participants: 245,
    tags: ['technology', 'programming'],
    isLive: true,
  },
  { 
    id: '2', 
    title: 'iOS Design Trends', 
    hosts: [
      { id: 'host3', name: 'Alex Johnson', avatar: 'https://randomuser.me/api/portraits/men/2.jpg' }
    ],
    participants: 128,
    tags: ['design', 'iOS'],
    isLive: true,
  },
];

const SCHEDULED_SPACES = [
  { 
    id: '3', 
    title: 'Mobile App Security Discussion', 
    hosts: [
      { id: 'host4', name: 'Emma Williams', avatar: 'https://randomuser.me/api/portraits/women/2.jpg' },
      { id: 'host5', name: 'Mike Brown', avatar: 'https://randomuser.me/api/portraits/men/3.jpg' }
    ],
    scheduledFor: 'Tomorrow, 10:00 AM',
    tags: ['security', 'mobile'],
  },
  { 
    id: '4', 
    title: 'UI/UX Best Practices', 
    hosts: [
      { id: 'host6', name: 'Sarah Parker', avatar: 'https://randomuser.me/api/portraits/women/3.jpg' }
    ],
    scheduledFor: 'Mar 12, 2:00 PM',
    tags: ['design', 'UX'],
  },
  { 
    id: '5', 
    title: 'React Native vs Flutter Debate', 
    hosts: [
      { id: 'host7', name: 'David Wilson', avatar: 'https://randomuser.me/api/portraits/men/4.jpg' },
      { id: 'host8', name: 'Lisa Thompson', avatar: 'https://randomuser.me/api/portraits/women/4.jpg' }
    ],
    scheduledFor: 'Next Week, 5:00 PM',
    tags: ['development', 'mobile'],
  },
];

const SpacesScreen = ({ navigation }) => {
  const theme = useTheme();
  const insets = useSafeAreaInsets();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategoryIndex, setSelectedCategoryIndex] = useState(0);
  const [liveSpaces, setLiveSpaces] = useState([]);
  const [scheduledSpaces, setScheduledSpaces] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  
  const categories = ['For you', 'Live', 'Upcoming', 'Following', 'Technology'];

  // Simulate fetching data
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    // In a real app, you would fetch from an API
    setLiveSpaces(LIVE_SPACES);
    setScheduledSpaces(SCHEDULED_SPACES);
  };

  const handleRefresh = () => {
    setRefreshing(true);
    // Simulate network request
    setTimeout(() => {
      fetchData();
      setRefreshing(false);
    }, 1000);
  };

  const handleSearchChange = (query) => {
    setSearchQuery(query);
  };

  const handleSearchSubmit = () => {
    console.log('Search submitted:', searchQuery);
    // In a real app, you would search for spaces
  };

  const handleSearchFocus = () => {
    // Navigate to search screen when search bar is tapped
    console.log('Search focused');
  };

  const handleCategoryPress = (index) => {
    setSelectedCategoryIndex(index);
    // In a real app, you would fetch different content based on category
  };

  const handleSpacePress = (space) => {
    console.log('Space pressed:', space);
    // Navigate to space details
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

  const handleCreateSpace = () => {
    console.log('Create new space');
    // Navigate to create space screen
  };

  const handleSeeMoreLive = () => {
    console.log('See more live spaces');
    // Navigate to full live spaces screen
  };

  const handleSeeMoreUpcoming = () => {
    console.log('See more upcoming spaces');
    // Navigate to full upcoming spaces screen
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <SpacesHeader
        onProfilePress={() => navigation.navigate('Profile')}
        onSearchPress={handleSearchFocus}
      />
      
      <SpaceSearch
        searchQuery={searchQuery}
        onChangeSearch={handleSearchChange}
        onSubmit={handleSearchSubmit}
        onFocus={handleSearchFocus}
      />
      
      <SpaceCategoryTabs
        categories={categories}
        selectedIndex={selectedCategoryIndex}
        onCategoryPress={handleCategoryPress}
      />
      
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={handleRefresh}
            colors={[theme.colors.primary]}
            tintColor={theme.colors.primary}
          />
        }
        style={styles.scrollView}
      >
        {/* Live Spaces Section */}
        <SpacesSection
          title="Happening now"
          showSeeMore={liveSpaces.length > 2}
          onSeeMorePress={handleSeeMoreLive}
        >
          <SpacesList
            spaces={liveSpaces}
            type="live"
            onSpacePress={handleSpacePress}
            onJoinPress={handleJoinPress}
            onHostPress={handleHostPress}
            emptyMessage="No live spaces right now"
          />
        </SpacesSection>
        
        {/* Scheduled Spaces Section */}
        <SpacesSection
          title="Upcoming"
          showSeeMore={scheduledSpaces.length > 2}
          onSeeMorePress={handleSeeMoreUpcoming}
          containerStyle={styles.upcomingSection}
        >
          <SpacesList
            spaces={scheduledSpaces}
            type="scheduled"
            onSpacePress={handleSpacePress}
            onReminderPress={handleReminderPress}
            onSharePress={handleSharePress}
            onHostPress={handleHostPress}
            maxItems={3}
            emptyMessage="No upcoming spaces scheduled"
          />
        </SpacesSection>
      </ScrollView>
      
      <CreateSpaceButton onPress={handleCreateSpace} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F9FA',
  },
  scrollView: {
    flex: 1,
  },
  upcomingSection: {
    marginTop: 8,
  },
});

export default SpacesScreen;