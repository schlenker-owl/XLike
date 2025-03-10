import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// Import navigation components
import BottomTabNavigator from './BottomTabNavigator';

// Import auth screens
import LoginScreen from '../screens/auth/LoginScreen';
import SignupScreen from '../screens/auth/SignupScreen';

// Import main screens that aren't in the bottom tabs
import ProfileScreen from '../screens/profile/ProfileScreen';
// import TweetDetailScreen from '../screens/main/TweetDetailScreen';
import NewTweetScreen from '../screens/main/NewTweetScreen';
// import SettingsScreen from '../screens/main/SettingsScreen';
// import ListsScreen from '../screens/main/ListsScreen';
import BookmarksScreen from '../screens/main/BookmarksScreen';

const Stack = createStackNavigator();

const AppNavigator = () => {
  // For demo purposes, we'll start with a logged-in state
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {!isLoggedIn ? (
          // Auth Stack
          <>
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Signup" component={SignupScreen} />
          </>
        ) : (
          // Main App Stack
          <>
            <Stack.Screen name="Main" component={BottomTabNavigator} />
            <Stack.Screen name="Profile" component={ProfileScreen} />
            {/* <Stack.Screen name="TweetDetail" component={TweetDetailScreen} /> */}
            {/* <Stack.Screen name="Settings" component={SettingsScreen} /> */}
            {/* <Stack.Screen name="Lists" component={ListsScreen} /> */}
            <Stack.Screen name="Bookmarks" component={BookmarksScreen} />
            <Stack.Screen 
              name="NewTweet" 
              component={NewTweetScreen}
              options={{
                presentation: 'modal',
                animationEnabled: true,
              }}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;