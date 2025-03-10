import React, { useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Text, Appbar, Divider, useTheme } from 'react-native-paper';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

// Import components
import NotificationSettingsItem from '../../components/notifications/NotificationSettingsItem';

const NotificationSettingsScreen = ({ navigation }) => {
  const theme = useTheme();
  const insets = useSafeAreaInsets();
  
  // State for notification settings
  const [settings, setSettings] = useState({
    pushNotifications: true,
    likes: true,
    replies: true,
    retweets: true,
    follows: true,
    mentions: true,
    directMessages: true,
  });

  const handleSettingChange = (setting) => (value) => {
    setSettings({
      ...settings,
      [setting]: value,
    });
  };

  const handleBack = () => {
    navigation.goBack();
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <Appbar.Header style={styles.header}>
        <Appbar.BackAction onPress={handleBack} />
        <Appbar.Content title="Notification settings" />
      </Appbar.Header>
      
      <ScrollView>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Notifications</Text>
          
          <NotificationSettingsItem
            title="Push notifications"
            description="Receive notifications on your device"
            iconName="bell-outline"
            value={settings.pushNotifications}
            onValueChange={handleSettingChange('pushNotifications')}
          />
          
          <Divider />
          
          <NotificationSettingsItem
            title="Email notifications"
            description="Receive notifications via email"
            iconName="email-outline"
            value={false}
            onValueChange={() => {}}
            switchVisible={false}
            onPress={() => console.log('Navigate to email notification settings')}
          />
        </View>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Filter notifications</Text>
          
          <NotificationSettingsItem
            title="Likes"
            iconName="heart-outline"
            value={settings.likes}
            onValueChange={handleSettingChange('likes')}
          />
          
          <Divider />
          
          <NotificationSettingsItem
            title="Replies"
            iconName="comment-outline"
            value={settings.replies}
            onValueChange={handleSettingChange('replies')}
          />
          
          <Divider />
          
          <NotificationSettingsItem
            title="Retweets"
            iconName="repeat"
            value={settings.retweets}
            onValueChange={handleSettingChange('retweets')}
          />
          
          <Divider />
          
          <NotificationSettingsItem
            title="Follows"
            iconName="account-plus-outline"
            value={settings.follows}
            onValueChange={handleSettingChange('follows')}
          />
          
          <Divider />
          
          <NotificationSettingsItem
            title="Mentions"
            iconName="at"
            value={settings.mentions}
            onValueChange={handleSettingChange('mentions')}
          />
          
          <Divider />
          
          <NotificationSettingsItem
            title="Direct messages"
            iconName="message-outline"
            value={settings.directMessages}
            onValueChange={handleSettingChange('directMessages')}
          />
        </View>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Advanced filters</Text>
          
          <NotificationSettingsItem
            title="Quality filters"
            description="Filter out low-quality content"
            iconName="filter-outline"
            value={true}
            onValueChange={() => {}}
          />
          
          <Divider />
          
          <NotificationSettingsItem
            title="Muted accounts"
            description="Notifications from muted accounts"
            iconName="volume-off"
            value={false}
            onValueChange={() => {}}
            switchVisible={false}
            onPress={() => console.log('Navigate to muted accounts')}
          />
        </View>
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
    backgroundColor: '#fff',
    elevation: 0,
    shadowOpacity: 0,
  },
  section: {
    marginBottom: 16,
    backgroundColor: '#fff',
    borderTopWidth: 0.5,
    borderBottomWidth: 0.5,
    borderColor: '#E1E8ED',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
});

export default NotificationSettingsScreen;