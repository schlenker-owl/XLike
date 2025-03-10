import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Text, Card, Avatar, Button, useTheme } from 'react-native-paper';

const LiveSpaceCard = ({ 
  space, 
  onPress,
  onJoinPress,
  onHostPress
}) => {
  const theme = useTheme();
  
  return (
    <Card style={styles.card} onPress={onPress}>
      <Card.Content>
        {/* Live Indicator */}
        <View style={styles.liveIndicatorContainer}>
          <View style={styles.liveIndicator} />
          <Text style={styles.liveText}>LIVE</Text>
          <Text style={styles.participantsText}>
            {space.participants} listening
          </Text>
        </View>
        
        {/* Space Title */}
        <Text style={styles.title} numberOfLines={2}>
          {space.title}
        </Text>
        
        {/* Hosts */}
        <View style={styles.hostsContainer}>
          <View style={styles.hostAvatarsContainer}>
            {space.hosts.map((host, index) => (
              <TouchableOpacity 
                key={index} 
                onPress={() => onHostPress && onHostPress(host)}
                style={[
                  styles.hostAvatarWrapper,
                  { zIndex: space.hosts.length - index }
                ]}
              >
                <Avatar.Image 
                  source={{ uri: host.avatar }} 
                  size={30}
                  style={styles.hostAvatar}
                />
              </TouchableOpacity>
            ))}
          </View>
          
          <Text style={styles.hostsText} numberOfLines={1}>
            Hosted by {space.hosts.map(host => host.name).join(', ')}
          </Text>
        </View>
        
        {/* Join Button */}
        <Button 
          mode="contained" 
          style={[styles.joinButton, { backgroundColor: theme.colors.primary }]}
          labelStyle={styles.joinButtonLabel}
          onPress={() => onJoinPress && onJoinPress(space)}
        >
          Join
        </Button>
      </Card.Content>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    marginHorizontal: 16,
    marginVertical: 8,
    borderRadius: 12,
    elevation: 1,
    backgroundColor: '#fff',
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
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
    lineHeight: 24,
  },
  hostsContainer: {
    marginBottom: 16,
  },
  hostAvatarsContainer: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  hostAvatarWrapper: {
    marginRight: -10,
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
    paddingHorizontal: 8,
  },
});

export default LiveSpaceCard;