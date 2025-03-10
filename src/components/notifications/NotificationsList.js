import React from 'react';
import { FlatList, StyleSheet, View, ActivityIndicator } from 'react-native';
import { Divider, useTheme } from 'react-native-paper';
import NotificationItem from './NotificationItem';
import EmptyNotifications from './EmptyNotifications';

const NotificationsList = ({
  notifications,
  loading,
  refreshing,
  onRefresh,
  onNotificationPress,
  onUserPress,
  emptyType,
}) => {
  const theme = useTheme();

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={theme.colors.primary} />
      </View>
    );
  }

  const renderItem = ({ item }) => (
    <NotificationItem
      notification={item}
      onPress={onNotificationPress}
      onUserPress={onUserPress}
    />
  );

  return (
    <FlatList
      data={notifications}
      renderItem={renderItem}
      keyExtractor={item => item.id}
      ItemSeparatorComponent={() => <Divider />}
      refreshing={refreshing}
      onRefresh={onRefresh}
      ListEmptyComponent={() => <EmptyNotifications type={emptyType} />}
      contentContainerStyle={notifications.length === 0 ? styles.emptyList : null}
    />
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyList: {
    flexGrow: 1,
  },
});

export default NotificationsList;