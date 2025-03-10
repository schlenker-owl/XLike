import React, { useState } from 'react';
import { View, StyleSheet, KeyboardAvoidingView, Platform, Image } from 'react-native';
import { TextInput, Button, Text, Title, useTheme } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const theme = useTheme();

  const handleLogin = async () => {
    if (!email || !password) {
      // Show error
      return;
    }

    setIsLoading(true);
    // Here you would connect to your authentication service
    // For now, we'll just simulate a login
    setTimeout(() => {
      setIsLoading(false);
      // After successful login, you would update the auth state
    }, 1500);
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardAvoidingView}
      >
        <View style={styles.logoContainer}>
          <Icon name="twitter" size={60} color={theme.colors.primary} />
        </View>

        <Title style={styles.title}>Log in to Twitter</Title>

        <TextInput
          label="Email or username"
          value={email}
          onChangeText={setEmail}
          style={styles.input}
          autoCapitalize="none"
          keyboardType="email-address"
          mode="outlined"
          theme={{ roundness: 10 }}
        />

        <TextInput
          label="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry={!passwordVisible}
          style={styles.input}
          mode="outlined"
          theme={{ roundness: 10 }}
          right={
            <TextInput.Icon
              name={passwordVisible ? 'eye-off' : 'eye'}
              onPress={() => setPasswordVisible(!passwordVisible)}
              color={theme.colors.placeholder}
            />
          }
        />

        <Button
          mode="contained"
          onPress={handleLogin}
          style={styles.loginButton}
          loading={isLoading}
          disabled={isLoading}
          labelStyle={styles.buttonLabel}
        >
          Log in
        </Button>

        <View style={styles.forgotPasswordContainer}>
          <Text style={styles.forgotPassword}>Forgot password?</Text>
        </View>

        <View style={styles.signupContainer}>
          <Text style={styles.signupText}>Don't have an account?</Text>
          <Text 
            style={[styles.signupLink, { color: theme.colors.primary }]}
            onPress={() => navigation.navigate('Signup')}
          >
            Sign up
          </Text>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  keyboardAvoidingView: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    marginBottom: 16,
  },
  loginButton: {
    marginTop: 10,
    paddingVertical: 8,
    borderRadius: 30,
  },
  buttonLabel: {
    fontSize: 16,
    fontWeight: '600',
  },
  forgotPasswordContainer: {
    alignItems: 'center',
    marginTop: 15,
  },
  forgotPassword: {
    fontSize: 14,
    color: '#1DA1F2',
  },
  signupContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  signupText: {
    marginRight: 5,
  },
  signupLink: {
    fontWeight: '600',
  },
});

export default LoginScreen;