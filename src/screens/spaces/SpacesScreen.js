import React from 'react';
import { View, StyleSheet, FlatList, TouchableOpacity, ScrollView } from 'react-native';
import { Text, Card, Avatar, Button, useTheme, Divider, Searchbar } from 'react-native-paper';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

// Sample live spaces data
const LIVE_SPACES = [
  { 
    id: '1', 
    title: 'React Native Development in 2025', 
    hosts: [
      { name: 'John Doe', avatar: 'https://randomuser.me/api/portraits/men/1.jpg' },
      { name: 'Jane Smith', avatar: 'https://randomuser.me/api/portraits/women/1.jpg' }
    ],
    participants: 245,
    isLive: true,
  },
  { 
    id: '2', 
    title: 'iOS Design Trends', 
    hosts: [
      { name: 'Alex Johnson', avatar: 'https://randomuser.me/api/portraits/men/2.jpg' }
    ],
    participants: 128,
    isLive: true,
  },
];

// Sample scheduled spaces data
const SCHEDULED_SPACES = [
  { 
    id: '3', 
    title: 'Mobile App Security Discussion', 
    hosts: [
      { name: 'Emma Williams', avatar: 'https://randomuser.me/api/portraits/women/2.jpg' },
      { name: 'Mike Brown', avatar: 'https://randomuser.me/api/portraits/men/3.jpg' }
    ],
    scheduledFor: 'Tomorrow, 10:00 AM',
  },
  { 
    id: '4', 
    title: 'UI/UX Best Practices', 
    hosts: [
      { name: 'Sarah Parker', avatar: 'https://randomuser.me/api/portraits/women/3.jpg' }
    ],
    scheduledFor: 'Mar 12, 2:00 PM',
  },
];

const SpacesScreen = ({ navigation }) => {
  const theme = useTheme();
  const insets = useSafeAreaInsets();
  const [searchQuery, setSearchQuery] = React.useState('');

  const onChangeSearch = query => setSearchQuery(query);

  const renderLiveSpaceItem = ({ item }) => (
    <Card style={styles.spaceCard}>
      <Card.Content>
        <View style={styles.liveIndicatorContainer}>
          <View style={styles.liveIndicator} />
          <Text style={styles.liveText}>LIVE</Text>
          <Text style={styles.participantsText}>{item.participants} listening</Text>
        </View>
        
        <Text style={styles.spaceTitle}>{item.title}</Text>
        
        <View style={styles.hostsContainer}>
          <View style={styles.avatarsContainer}>
            {item.hosts.map((host, index) => (
              <Avatar.Image 
                key={index}
                source={{ uri: host.avatar }} 
                size={28}
                style={[styles.hostAvatar, { marginLeft: index > 0 ? -10 : 0 }]}
              />
            ))}
          </View>
          
          <Text style={styles.hostsText}>
            Hosted by {item.hosts.map(host => host.name).join(', ')}
          </Text>
        </View>
        
        <Button 
          mode="contained" 
          style={styles.joinButton}
          labelStyle={styles.joinButtonLabel}
          onPress={() => console.log(`Join space ${item.id}`)}
        >
          Join
        </Button>
      </Card.Content>
    </Card>
  );

  const renderScheduledSpaceItem = ({ item }) => (
    <Card style={styles.spaceCard}>
      <Card.Content>
        <Text style={styles.scheduledText}>{item.scheduledFor}</Text>
        
        <Text style={styles.spaceTitle}>{item.title}</Text>
        
        <View style={styles.hostsContainer}>
          <View style={styles.avatarsContainer}>
            {item.hosts.map((host, index) => (
              <Avatar.Image 
                key={index}
                source={{ uri: host.avatar }} 
                size={28}
                style={[styles.hostAvatar, { marginLeft: index > 0 ? -10 : 0 }]}
              />
            ))}
          </View>
          
          <Text style={styles.hostsText}>
            Hosted by {item.hosts.map(host => host.name).join(', ')}
          </Text>
        </View>
        
        <View style={styles.scheduledActionsContainer}>
          <Button 
            mode="outlined" 
            style={styles.reminderButton}
            labelStyle={styles.reminderButtonLabel}
            onPress={() => console.log(`Set reminder for ${item.id}`)}
          >
            Set reminder
          </Button>
          
          <Button 
            mode="text" 
            style={styles.shareButton}
            labelStyle={styles.shareButtonLabel}
            onPress={() => console.log(`Share space ${item.id}`)}
          >
            <Icon name="share-variant-outline" size={20} color={theme.colors.primary} />
          </Button>
        </View>
      </Card.Content>
    </Card>
  );

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Spaces</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
          <Avatar.Image source={{ uri: 'https://randomuser.me/api/portraits/men/1.jpg' }} size={32} />
        </TouchableOpacity>
      </View>
      
      <View style={styles.searchContainer}>
        <Searchbar
          placeholder="Search Spaces"
          onChangeText={onChangeSearch}
          value={searchQuery}
          style={styles.searchBar}
          iconColor={theme.colors.primary}
        />
      </View>
      
      <ScrollView>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Happening now</Text>
        </View>
        
        <FlatList
          data={LIVE_SPACES}
          renderItem={renderLiveSpaceItem}
          keyExtractor={item => item.id}
          scrollEnabled={false}
          ItemSeparatorComponent={() => <View style={styles.spaceSeparator} />}
        />
        
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Upcoming</Text>
          <TouchableOpacity>
            <Text style={styles.seeMoreText}>See more</Text>
          </TouchableOpacity>
        </View>
        
        <FlatList
          data={SCHEDULED_SPACES}
          renderItem={renderScheduledSpaceItem}
          keyExtractor={item => item.id}
          scrollEnabled={false}
          ItemSeparatorComponent={() => <View style={styles.spaceSeparator} />}
        />
      </ScrollView>
      
      <Button
        mode="contained"
        style={styles.createSpaceButton}
        labelStyle={styles.createSpaceButtonLabel}
        icon="microphone"
        onPress={() => console.log('Create new space')}
      >
        Create a Space
      </Button>
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
  searchContainer: {
    padding: 10,
    backgroundColor: '#fff',
  },
  searchBar: {
    elevation: 0,
    borderRadius: 20,
    backgroundColor: '#EFF3F4',
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  seeMoreText: {
    color: '#1DA1F2',
  },
  spaceCard: {
    marginHorizontal: 16,
    marginBottom: 8,
    elevation: 0,
    borderWidth: 1,
    borderColor: '#EFF3F4',
    borderRadius: 12,
  },
  liveIndicatorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  liveIndicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'red',
    marginRight: 6,
  },
  liveText: {
    color: 'red',
    fontWeight: 'bold',
    fontSize: 12,
    marginRight: 6,
  },
  participantsText: {
    color: '#657786',
    fontSize: 12,
  },
  scheduledText: {
    color: '#657786',
    fontSize: 14,
    marginBottom: 8,
  },
  spaceTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  hostsContainer: {
    marginBottom: 12,
  },
  avatarsContainer: {
    flexDirection: 'row',
    marginBottom: 4,
  },
  hostAvatar: {
    borderWidth: 2,
    borderColor: '#fff',
  },
  hostsText: {
    color: '#657786',
    fontSize: 14,
  },
  joinButton: {
    borderRadius: 20,
  },
  joinButtonLabel: {
    fontSize: 14,
  },
  scheduledActionsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  reminderButton: {
    borderRadius: 20,
    flex: 1,
    marginRight: 8,
  },
  reminderButtonLabel: {
    fontSize: 14,
  },
  shareButton: {
    borderRadius: 20,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  shareButtonLabel: {
    fontSize: 14,
  },
  spaceSeparator: {
    height: 8,
  },
  createSpaceButton: {
    margin: 16,
    borderRadius: 30,
  },
  createSpaceButtonLabel: {
    fontSize: 16,
  },
});

export default SpacesScreen;