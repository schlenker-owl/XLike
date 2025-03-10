import React from 'react';
import { View, StyleSheet, FlatList, TouchableOpacity, ScrollView } from 'react-native';
import { Text, Searchbar, Chip, Card, Title, Paragraph, useTheme, Divider } from 'react-native-paper';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

// Sample trending data
const TRENDING_TOPICS = [
  { id: '1', topic: 'Technology', hashtag: '#ReactNative', count: '125K Posts' },
  { id: '2', topic: 'Sports', hashtag: '#NBA', count: '58.5K Posts' },
  { id: '3', topic: 'Entertainment', hashtag: '#Movies', count: '30.2K Posts' },
  { id: '4', topic: 'Politics', hashtag: '#Election2024', count: '245K Posts' },
  { id: '5', topic: 'Science', hashtag: '#SpaceX', count: '18.7K Posts' },
];

// Sample news data
const NEWS_STORIES = [
  { id: '1', title: 'Latest tech trends for 2025', source: 'Tech News', time: '2h ago', image: 'https://picsum.photos/700/400?random=1' },
  { id: '2', title: 'React Native 2.0 announcement', source: 'Mobile Dev', time: '4h ago', image: 'https://picsum.photos/700/400?random=2' },
];

const ExploreScreen = ({ navigation }) => {
  const theme = useTheme();
  const insets = useSafeAreaInsets();
  const [searchQuery, setSearchQuery] = React.useState('');

  const onChangeSearch = query => setSearchQuery(query);

  const categories = ['For you', 'Trending', 'News', 'Sports', 'Entertainment'];

  const renderTrendingItem = ({ item }) => (
    <TouchableOpacity style={styles.trendingItem}>
      <Text style={styles.trendingTopic}>{item.topic}</Text>
      <Text style={styles.trendingHashtag}>{item.hashtag}</Text>
      <Text style={styles.trendingCount}>{item.count}</Text>
    </TouchableOpacity>
  );

  const renderNewsItem = ({ item }) => (
    <Card style={styles.newsCard}>
      <Card.Cover source={{ uri: item.image }} />
      <Card.Content>
        <Title style={styles.newsTitle}>{item.title}</Title>
        <View style={styles.newsMetaContainer}>
          <Text style={styles.newsSource}>{item.source}</Text>
          <Text style={styles.newsTime}> · {item.time}</Text>
        </View>
      </Card.Content>
    </Card>
  );

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <View style={styles.searchContainer}>
        <Searchbar
          placeholder="Search X"
          onChangeText={onChangeSearch}
          value={searchQuery}
          style={styles.searchBar}
          iconColor={theme.colors.primary}
        />
      </View>
      
      <ScrollView style={styles.categoriesScrollView} horizontal showsHorizontalScrollIndicator={false}>
        {categories.map((category, index) => (
          <Chip
            key={index}
            style={styles.categoryChip}
            textStyle={{ color: index === 0 ? 'white' : 'black' }}
            mode="flat"
            selected={index === 0}
            onPress={() => console.log(`${category} pressed`)}
          >
            {category}
          </Chip>
        ))}
      </ScrollView>
      
      <ScrollView>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>What's happening</Text>
        </View>
        
        <FlatList
          data={TRENDING_TOPICS}
          renderItem={renderTrendingItem}
          keyExtractor={item => item.id}
          scrollEnabled={false}
          ItemSeparatorComponent={() => <Divider />}
        />
        
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>News for you</Text>
        </View>
        
        <FlatList
          data={NEWS_STORIES}
          renderItem={renderNewsItem}
          keyExtractor={item => item.id}
          scrollEnabled={false}
          ItemSeparatorComponent={() => <View style={styles.newsSeparator} />}
        />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
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
  categoriesScrollView: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: '#fff',
  },
  categoryChip: {
    marginRight: 8,
  },
  sectionHeader: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#fff',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  trendingItem: {
    padding: 16,
    backgroundColor: '#fff',
  },
  trendingTopic: {
    fontSize: 13,
    color: '#657786',
  },
  trendingHashtag: {
    fontSize: 16,
    fontWeight: 'bold',
    marginVertical: 4,
  },
  trendingCount: {
    fontSize: 13,
    color: '#657786',
  },
  newsCard: {
    marginHorizontal: 16,
    marginVertical: 8,
    elevation: 0,
    borderWidth: 0,
  },
  newsTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 8,
  },
  newsMetaContainer: {
    flexDirection: 'row',
    marginTop: 4,
  },
  newsSource: {
    color: '#657786',
    fontSize: 14,
  },
  newsTime: {
    color: '#657786',
    fontSize: 14,
  },
  newsSeparator: {
    height: 8,
  },
});

export default ExploreScreen;