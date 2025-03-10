import React, { useState } from 'react';
import { View, StyleSheet, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { TextInput, Button, Text, Title, useTheme, HelperText } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const SignupScreen = ({ navigation }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [errors, setErrors] = useState({});
  const theme = useTheme();

  const validateInputs = () => {
    const newErrors = {};
    
    if (!name) newErrors.name = 'Name is required';
    if (!email) newErrors.email = 'Email is required';
    if (email && !/\S+@\S+\.\S+/.test(email)) newErrors.email = 'Email is invalid';
    if (!username) newErrors.username = 'Username is required';
    if (username && username.length < 4) newErrors.username = 'Username must be at least 4 characters';
    if (!password) newErrors.password = 'Password is required';
    if (password && password.length < 8) newErrors.password = 'Password must be at least 8 characters';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSignup = async () => {
    if (!validateInputs()) return;

    setIsLoading(true);
    // Here you would connect to your authentication service
    // For now, we'll just simulate a signup
    setTimeout(() => {
      setIsLoading(false);
      // After successful signup, you would navigate to login or home
      navigation.navigate('Login');
    }, 1500);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.keyboardAvoidingView}
        >
          <View style={styles.logoContainer}>
            <Icon name="twitter" size={50} color={theme.colors.primary} />
          </View>

          <Title style={styles.title}>Create your account</Title>

          <TextInput
            label="Name"
            value={name}
            onChangeText={setName}
            style={styles.input}
            mode="outlined"
            theme={{ roundness: 10 }}
            error={!!errors.name}
          />
          {errors.name && <HelperText type="error">{errors.name}</HelperText>}

          <TextInput
            label="Email"
            value={email}
            onChangeText={setEmail}
            style={styles.input}
            autoCapitalize="none"
            keyboardType="email-address"
            mode="outlined"
            theme={{ roundness: 10 }}
            error={!!errors.email}
          />
          {errors.email && <HelperText type="error">{errors.email}</HelperText>}

          <TextInput
            label="Username"
            value={username}
            onChangeText={setUsername}
            style={styles.input}
            autoCapitalize="none"
            mode="outlined"
            theme={{ roundness: 10 }}
            error={!!errors.username}
          />
          {errors.username && <HelperText type="error">{errors.username}</HelperText>}

          <TextInput
            label="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={!passwordVisible}
            style={styles.input}
            mode="outlined"
            theme={{ roundness: 10 }}
            error={!!errors.password}
            right={
              <TextInput.Icon
                name={passwordVisible ? 'eye-off' : 'eye'}
                onPress={() => setPasswordVisible(!passwordVisible)}
                color={theme.colors.placeholder}
              />
            }
          />
          {errors.password && <HelperText type="error">{errors.password}</HelperText>}

          <Text style={styles.termsText}>
            By signing up, you agree to our Terms, Privacy Policy, and Cookie Use.
          </Text>

          <Button
            mode="contained"
            onPress={handleSignup}
            style={styles.signupButton}
            loading={isLoading}
            disabled={isLoading}
            labelStyle={styles.buttonLabel}
          >
            Sign up
          </Button>

          <View style={styles.loginContainer}>
            <Text style={styles.loginText}>Already have an account?</Text>
            <Text
              style={[styles.loginLink, { color: theme.colors.primary }]}
              onPress={() => navigation.navigate('Login')}
            >
              Log in
            </Text>
          </View>
        </KeyboardAvoidingView>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContent: {
    flexGrow: 1,
  },
  keyboardAvoidingView: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    marginBottom: 8,
  },
  termsText: {
    fontSize: 12,
    color: '#657786',
    marginTop: 10,
    marginBottom: 15,
    textAlign: 'center',
  },
  signupButton: {
    marginTop: 10,
    paddingVertical: 8,
    borderRadius: 30,
  },
  buttonLabel: {
    fontSize: 16,
    fontWeight: '600',
  },
  loginContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
    marginBottom: 20,
  },
  loginText: {
    marginRight: 5,
  },
  loginLink: {
    fontWeight: '600',
  },
});

export default SignupScreen;