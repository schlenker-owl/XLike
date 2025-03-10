import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Platform, KeyboardAvoidingView } from 'react-native';
import { Text, TextInput, Button, Avatar, useTheme, Divider } from 'react-native-paper';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const MAX_TWEET_LENGTH = 280;

const NewTweetScreen = ({ navigation }) => {
  const [tweetText, setTweetText] = useState('');
  const [images, setImages] = useState([]);
  const theme = useTheme();
  const insets = useSafeAreaInsets();

  const handleClose = () => {
    navigation.goBack();
  };

  const handleSendTweet = () => {
    // Here you would send the tweet data to your backend
    console.log('Tweet content:', tweetText);
    console.log('Images:', images);
    navigation.goBack();
  };

  const handleAddImage = () => {
    // This is where you would integrate with the image picker
    console.log('Add image');
  };

  const remainingChars = MAX_TWEET_LENGTH - tweetText.length;
  const isDisabled = tweetText.trim().length === 0;

  return (
    <KeyboardAvoidingView
      style={[styles.container, { paddingTop: insets.top }]}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <View style={styles.header}>
        <TouchableOpacity onPress={handleClose}>
          <Text>Cancel</Text>
        </TouchableOpacity>
        <Button
          mode="contained"
          onPress={handleSendTweet}
          disabled={isDisabled}
          style={[
            styles.tweetButton,
            { backgroundColor: isDisabled ? theme.twitter.lightGray : theme.colors.primary }
          ]}
          labelStyle={styles.tweetButtonLabel}
        >
          Post
        </Button>
      </View>
      
      <Divider />
      
      <View style={styles.composeTweetContainer}>
        <Avatar.Image
          source={{ uri: 'https://randomuser.me/api/portraits/men/1.jpg' }}
          size={40}
        />
        
        <View style={styles.inputContainer}>
          <TextInput
            multiline
            placeholder="What's happening?"
            value={tweetText}
            onChangeText={setTweetText}
            style={styles.tweetInput}
            maxLength={MAX_TWEET_LENGTH}
          />
        </View>
      </View>
      
      <View style={styles.footer}>
        <View style={styles.actionsContainer}>
          <TouchableOpacity style={styles.actionButton} onPress={handleAddImage}>
            <Icon name="image-outline" size={22} color={theme.colors.primary} />
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.actionButton}>
            <Icon name="gif" size={22} color={theme.colors.primary} />
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.actionButton}>
            <Icon name="poll" size={22} color={theme.colors.primary} />
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.actionButton}>
            <Icon name="emoticon-outline" size={22} color={theme.colors.primary} />
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.actionButton}>
            <Icon name="calendar-outline" size={22} color={theme.colors.primary} />
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.actionButton}>
            <Icon name="map-marker-outline" size={22} color={theme.colors.primary} />
          </TouchableOpacity>
        </View>
        
        <View style={styles.charCountContainer}>
          {remainingChars <= 20 && (
            <Text style={[
              styles.charCount,
              remainingChars <= 0 ? styles.charCountExceeded : null
            ]}>
              {remainingChars}
            </Text>
          )}
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  tweetButton: {
    borderRadius: 20,
  },
  tweetButtonLabel: {
    fontSize: 14,
    paddingHorizontal: 8,
  },
  composeTweetContainer: {
    flexDirection: 'row',
    padding: 16,
  },
  inputContainer: {
    flex: 1,
    marginLeft: 12,
  },
  tweetInput: {
    backgroundColor: 'transparent',
    fontSize: 16,
    minHeight: 100,
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 16,
    backgroundColor: '#fff',
    borderTopWidth: 0.5,
    borderTopColor: '#E1E8ED',
  },
  actionsContainer: {
    flexDirection: 'row',
  },
  actionButton: {
    marginRight: 20,
  },
  charCountContainer: {
    position: 'absolute',
    right: 16,
    bottom: 16,
  },
  charCount: {
    color: '#657786',
  },
  charCountExceeded: {
    color: 'red',
  },
});

export default NewTweetScreen;