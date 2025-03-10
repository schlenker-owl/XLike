import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView, RefreshControl } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from 'react-native-paper';

// Import components
import SearchHeader from '../../components/explore/SearchHeader';
import CategoryTabs from '../../components/explore/CategoryTabs';
import ExploreSection from '../../components/explore/ExploreSection';
import TrendingList from '../../components/explore/TrendingList';
import NewsList from '../../components/explore/NewsList';

// Sample data
const TRENDING_TOPICS = [
  { id: '1', topic: 'Technology', hashtag: '#ReactNative', count: '125K Posts' },
  { id: '2', topic: 'Sports', hashtag: '#NBA', count: '58.5K Posts' },
  { id: '3', topic: 'Entertainment', hashtag: '#Movies', count: '30.2K Posts' },
  { id: '4', topic: 'Politics', hashtag: '#Election2024', count: '245K Posts' },
  { id: '5', topic: 'Science', hashtag: '#SpaceX', count: '18.7K Posts' },
];

const NEWS_STORIES = [
  { id: '1', title: 'Latest tech trends for 2025', source: 'Tech News', time: '2h ago', image: 'https://picsum.photos/700/400?random=1' },
  { id: '2', title: 'React Native 2.0 announcement', source: 'Mobile Dev', time: '4h ago', image: 'https://picsum.photos/700/400?random=2' },
  { id: '3', title: 'AI advancements in mobile development', source: 'AI Today', time: '6h ago', image: 'https://picsum.photos/700/400?random=3' },
];

const ExploreScreen = ({ navigation }) => {
  const theme = useTheme();
  const insets = useSafeAreaInsets();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategoryIndex, setSelectedCategoryIndex] = useState(0);
  const [refreshing, setRefreshing] = useState(false);
  const [trends, setTrends] = useState([]);
  const [news, setNews] = useState([]);
  
  const categories = ['For you', 'Trending', 'News', 'Sports', 'Entertainment'];

  // Simulate fetching data
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    // In a real app, you would fetch from an API
    setTrends(TRENDING_TOPICS);
    setNews(NEWS_STORIES);
  };

  const handleRefresh = () => {
    setRefreshing(true);
    // Simulate network request
    setTimeout(() => {
      fetchData();
      setRefreshing(false);
    }, 1000);
  };

  const handleSearchChange = (query) => {
    setSearchQuery(query);
  };

  const handleSearchFocus = () => {
    // Navigate to search screen when search bar is tapped
    // navigation.navigate('SearchScreen', { initialQuery: searchQuery });
    console.log('Search focused');
  };

  const handleCategoryPress = (index) => {
    setSelectedCategoryIndex(index);
    // In a real app, you would fetch different content based on category
  };

  const handleTrendPress = (trend) => {
    console.log('Trend pressed:', trend);
    // Navigate to trend details or search results
  };

  const handleNewsPress = (newsItem) => {
    console.log('News pressed:', newsItem);
    // Navigate to news details
  };

  const handleMorePress = (item) => {
    console.log('More options for:', item);
    // Show options modal for the item
  };

  const handleSeeMoreTrends = () => {
    console.log('See more trends');
    // Navigate to full trends screen
  };

  const handleSeeMoreNews = () => {
    console.log('See more news');
    // Navigate to full news screen
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <SearchHeader
        searchQuery={searchQuery}
        onChangeSearch={handleSearchChange}
        onProfilePress={() => navigation.navigate('Profile')}
        onFocus={handleSearchFocus}
      />
      
      <CategoryTabs
        categories={categories}
        selectedIndex={selectedCategoryIndex}
        onCategoryPress={handleCategoryPress}
      />
      
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={handleRefresh}
            colors={[theme.colors.primary]}
            tintColor={theme.colors.primary}
          />
        }
      >
        <ExploreSection
          title="What's happening"
          showSeeMore={true}
          onSeeMorePress={handleSeeMoreTrends}
        >
          <TrendingList
            trends={trends}
            onTrendPress={handleTrendPress}
            onMorePress={handleMorePress}
            maxItems={5}
          />
        </ExploreSection>
        
        <ExploreSection
          title="News for you"
          showSeeMore={true}
          onSeeMorePress={handleSeeMoreNews}
          containerStyle={styles.newsSection}
        >
          <NewsList
            news={news}
            onNewsPress={handleNewsPress}
            maxItems={3}
          />
        </ExploreSection>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F9FA',
  },
  newsSection: {
    marginTop: 8,
  },
});

export default ExploreScreen;