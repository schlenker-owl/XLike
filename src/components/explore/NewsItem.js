import React from 'react';
import { StyleSheet } from 'react-native';
import { Card, Title, Text, useTheme } from 'react-native-paper';

const NewsItem = ({ 
  item, 
  onPress
}) => {
  const theme = useTheme();
  
  return (
    <Card 
      style={styles.card}
      onPress={onPress}
    >
      <Card.Cover source={{ uri: item.image }} style={styles.cardImage} />
      <Card.Content style={styles.contentContainer}>
        <Title style={styles.title}>{item.title}</Title>
        <Text style={styles.meta}>
          {item.source} · {item.time}
        </Text>
      </Card.Content>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    marginHorizontal: 16,
    marginVertical: 8,
    borderRadius: 12,
    elevation: 0,
    borderWidth: 0.5,
    borderColor: '#E1E8ED',
    overflow: 'hidden',
  },
  cardImage: {
    height: 160,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  contentContainer: {
    paddingVertical: 12,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 6,
  },
  meta: {
    fontSize: 14,
    color: '#657786',
  },
});

export default NewsItem;