import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Text, Card, Avatar, Button, useTheme } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const ScheduledSpaceCard = ({ 
  space, 
  onPress,
  onReminderPress,
  onSharePress,
  onHostPress
}) => {
  const theme = useTheme();
  
  return (
    <Card style={styles.card} onPress={onPress}>
      <Card.Content>
        {/* Scheduled Time */}
        <Text style={styles.scheduledText}>
          {space.scheduledFor}
        </Text>
        
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
        
        {/* Action Buttons */}
        <View style={styles.actionsContainer}>
          <Button 
            mode="outlined" 
            style={styles.reminderButton}
            labelStyle={[styles.reminderButtonLabel, { color: theme.colors.primary }]}
            onPress={() => onReminderPress && onReminderPress(space)}
            icon="bell-outline"
          >
            Set reminder
          </Button>
          
          <TouchableOpacity 
            style={styles.shareButton}
            onPress={() => onSharePress && onSharePress(space)}
          >
            <Icon 
              name="share-variant-outline" 
              size={22} 
              color={theme.colors.primary} 
            />
          </TouchableOpacity>
        </View>
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
  scheduledText: {
    color: '#657786',
    fontSize: 14,
    marginBottom: 8,
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
  actionsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  reminderButton: {
    flex: 1,
    borderRadius: 20,
    marginRight: 12,
    borderColor: '#1DA1F2',
  },
  reminderButtonLabel: {
    fontSize: 14,
  },
  shareButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default ScheduledSpaceCard;