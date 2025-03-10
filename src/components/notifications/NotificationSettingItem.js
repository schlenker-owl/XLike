import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Text, Switch, useTheme } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const NotificationSettingsItem = ({
  title,
  description,
  iconName,
  value,
  onValueChange,
  onPress,
  switchVisible = true,
}) => {
  const theme = useTheme();
  
  return (
    <TouchableOpacity 
      style={styles.container} 
      onPress={onPress}
      disabled={!onPress}
    >
      <View style={[styles.iconContainer, { backgroundColor: theme.colors.primary + '20' }]}>
        <Icon name={iconName} size={22} color={theme.colors.primary} />
      </View>
      
      <View style={styles.contentContainer}>
        <Text style={styles.title}>{title}</Text>
        {description && <Text style={styles.description}>{description}</Text>}
      </View>
      
      {switchVisible && (
        <Switch
          value={value}
          onValueChange={onValueChange}
          color={theme.colors.primary}
        />
      )}
      
      {!switchVisible && onPress && (
        <Icon name="chevron-right" size={20} color="#657786" />
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#fff',
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  contentContainer: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: '500',
  },
  description: {
    fontSize: 14,
    color: '#657786',
    marginTop: 2,
  },
});

export default NotificationSettingsItem;