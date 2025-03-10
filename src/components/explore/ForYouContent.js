import React from 'react';
import { StyleSheet, View } from 'react-native';
import ExploreSection from './ExploreSection';
import TrendingList from './TrendingList';
import NewsList from './NewsList';
import FeaturedBanner from './FeaturedBanner';

const ForYouContent = ({
  trends,
  news,
  featured,
  onTrendPress,
  onNewsPress,
  onFeaturedPress,
  onMorePress,
  onSeeMoreTrends,
  onSeeMoreNews
}) => {
  return (
    <View style={styles.container}>
      {featured && (
        <FeaturedBanner
          item={featured}
          onPress={onFeaturedPress}
        />
      )}
      
      <ExploreSection
        title="What's happening"
        showSeeMore={true}
        onSeeMorePress={onSeeMoreTrends}
      >
        <TrendingList
          trends={trends}
          onTrendPress={onTrendPress}
          onMorePress={onMorePress}
          maxItems={5}
        />
      </ExploreSection>
      
      <ExploreSection
        title="News for you"
        showSeeMore={true}
        onSeeMorePress={onSeeMoreNews}
        containerStyle={styles.newsSection}
      >
        <NewsList
          news={news}
          onNewsPress={onNewsPress}
          maxItems={3}
        />
      </ExploreSection>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  newsSection: {
    marginTop: 8,
  },
});

export default ForYouContent;