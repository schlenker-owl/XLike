import React from 'react';
import { FlatList, StyleSheet, View, ActivityIndicator } from 'react-native';
import { Divider, useTheme } from 'react-native-paper';
import ConversationItem from './ConversationItem';
import EmptyMessages from './EmptyMessages';

const ConversationsList = ({
  conversations,
  loading,
  refreshing,
  onRefresh,
  onConversationPress,
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
    <ConversationItem
      conversation={item}
      onPress={onConversationPress}
    />
  );
  
  return (
    <FlatList
      data={conversations}
      renderItem={renderItem}
      keyExtractor={item => item.id}
      ItemSeparatorComponent={() => <Divider />}
      refreshing={refreshing}
      onRefresh={onRefresh}
      ListEmptyComponent={<EmptyMessages />}
      contentContainerStyle={conversations.length === 0 ? styles.emptyContainer : null}
    />
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyContainer: {
    flexGrow: 1,
  },
});

export default ConversationsList;