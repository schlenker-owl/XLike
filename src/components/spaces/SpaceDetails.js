import React from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Text, Card, Avatar, Button, Chip, useTheme } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const SpaceDetails = ({
  space,
  onBackPress,
  onJoinPress,
  onReminderPress,
  onSharePress,
  onHostPress,
}) => {
  const theme = useTheme();
  const isLive = space?.isLive;
  
  if (!space) {
    return null;
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={onBackPress} style={styles.backButton}>
          <Icon name="arrow-left" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Space</Text>
        <TouchableOpacity 
          style={styles.shareButton}
          onPress={() => onSharePress && onSharePress(space)}
        >
          <Icon name="share-variant-outline" size={24} color="#000" />
        </TouchableOpacity>
      </View>
      
      <ScrollView style={styles.scrollView}>
        <Card style={styles.card}>
          <Card.Content>
            {/* Status Indicator */}
            {isLive ? (
              <View style={styles.statusContainer}>
                <View style={styles.liveIndicator} />
                <Text style={styles.liveText}>LIVE</Text>
                <Text style={styles.listenersText}>
                  {space.participants} listening
                </Text>
              </View>
            ) : (
              <Text style={styles.scheduledText}>
                {space.scheduledFor}
              </Text>
            )}
            
            {/* Title */}
            <Text style={styles.title}>{space.title}</Text>
            
            {/* Tags */}
            {space.tags && space.tags.length > 0 && (
              <View style={styles.tagsContainer}>
                {space.tags.map((tag, index) => (
                  <Chip 
                    key={index} 
                    style={styles.tagChip}
                    textStyle={styles.tagText}
                  >
                    {tag}
                  </Chip>
                ))}
              </View>
            )}
            
            {/* Hosts */}
            <Text style={styles.hostsTitle}>Hosted by</Text>
            
            {space.hosts.map((host, index) => (
              <TouchableOpacity 
                key={index}
                style={styles.hostContainer}
                onPress={() => onHostPress && onHostPress(host)}
              >
                <Avatar.Image 
                  source={{ uri: host.avatar }} 
                  size={40}
                />
                <View style={styles.hostInfo}>
                  <Text style={styles.hostName}>{host.name}</Text>
                  <Text style={styles.hostUsername}>@{host.name.toLowerCase().replace(' ', '')}</Text>
                </View>
              </TouchableOpacity>
            ))}
            
            {/* Action Button */}
            {isLive ? (
              <Button 
                mode="contained" 
                style={[styles.actionButton, { backgroundColor: theme.colors.primary }]}
                labelStyle={styles.actionButtonLabel}
                onPress={() => onJoinPress && onJoinPress(space)}
              >
                Join this Space
              </Button>
            ) : (
              <Button 
                mode="outlined" 
                style={styles.actionButton}
                labelStyle={[styles.actionButtonLabel, { color: theme.colors.primary }]}
                onPress={() => onReminderPress && onReminderPress(space)}
                icon="bell-outline"
              >
                Set a reminder
              </Button>
            )}
            
            {/* Description (if any) */}
            {space.description && (
              <Text style={styles.description}>{space.description}</Text>
            )}
          </Card.Content>
        </Card>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F9FA',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 0.5,
    borderBottomColor: '#E1E8ED',
  },
  backButton: {
    padding: 4,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  shareButton: {
    padding: 4,
  },
  scrollView: {
    flex: 1,
  },
  card: {
    margin: 16,
    borderRadius: 12,
    elevation: 1,
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
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
  listenersText: {
    color: '#657786',
    fontSize: 12,
  },
  scheduledText: {
    color: '#657786',
    fontSize: 14,
    marginBottom: 12,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 16,
    lineHeight: 28,
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 16,
  },
  tagChip: {
    marginRight: 8,
    marginBottom: 8,
    backgroundColor: '#EFF3F4',
  },
  tagText: {
    fontSize: 12,
  },
  hostsTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  hostContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  hostInfo: {
    marginLeft: 12,
  },
  hostName: {
    fontSize: 16,
    fontWeight: '500',
  },
  hostUsername: {
    fontSize: 14,
    color: '#657786',
  },
  actionButton: {
    borderRadius: 20,
    marginTop: 16,
    marginBottom: 16,
  },
  actionButtonLabel: {
    fontSize: 16,
    paddingVertical: 2,
  },
  description: {
    fontSize: 16,
    lineHeight: 22,
    color: '#14171A',
  },
});

export default SpaceDetails;