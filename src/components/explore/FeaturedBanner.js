import React from 'react';
import { StyleSheet, ImageBackground, View, TouchableOpacity } from 'react-native';
import { Text, useTheme } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const FeaturedBanner = ({ 
  item, 
  onPress 
}) => {
  const theme = useTheme();
  
  return (
    <TouchableOpacity 
      style={styles.container}
      onPress={() => onPress && onPress(item)}
      activeOpacity={0.9}
    >
      <ImageBackground
        source={{ uri: item.image }}
        style={styles.backgroundImage}
        imageStyle={styles.backgroundImageStyle}
      >
        <View style={styles.overlay}>
          <View style={styles.contentContainer}>
            <Text style={styles.category}>{item.category}</Text>
            <Text style={styles.title}>{item.title}</Text>
            <View style={styles.metaContainer}>
              <Text style={styles.time}>{item.time} · </Text>
              <Text style={styles.source}>{item.source}</Text>
            </View>
          </View>
          
          <TouchableOpacity 
            style={styles.moreButton}
            onPress={(e) => {
              e.stopPropagation();
              console.log('More options for banner');
            }}
            hitSlop={{ top: 10, right: 10, bottom: 10, left: 10 }}
          >
            <Icon name="dots-horizontal" size={20} color="#FFFFFF" />
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 200,
    marginHorizontal: 16,
    marginVertical: 12,
    borderRadius: 12,
    overflow: 'hidden',
  },
  backgroundImage: {
    width: '100%',
    height: '100%',
    justifyContent: 'flex-end',
  },
  backgroundImageStyle: {
    borderRadius: 12,
  },
  overlay: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    padding: 16,
  },
  contentContainer: {
    flex: 1,
  },
  category: {
    color: '#FFFFFF',
    fontSize: 12,
    opacity: 0.9,
    marginBottom: 4,
  },
  title: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 6,
  },
  metaContainer: {
    flexDirection: 'row',
  },
  time: {
    color: '#FFFFFF',
    fontSize: 12,
    opacity: 0.9,
  },
  source: {
    color: '#FFFFFF',
    fontSize: 12,
    opacity: 0.9,
  },
  moreButton: {
    alignSelf: 'flex-start',
    marginLeft: 10,
  },
});

export default FeaturedBanner;