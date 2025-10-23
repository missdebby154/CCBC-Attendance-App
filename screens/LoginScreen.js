import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Image,
  Alert,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../configs/firebaseconfig';

export default function LoginScreen({ navigation }) {
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  // Helper: detect phone-like input (digits, optional leading +)
  const looksLikePhone = (text) => {
    return /^\+?\d+$/.test(text.trim());
  };

  const handleLogin = async () => {
    if (!identifier || !password) {
      Alert.alert('Login Failed', 'Please enter your phone number (or email) and password.');
      return;
    }

    let emailToUse = '';

    if (looksLikePhone(identifier)) {
      // Convert phone to pseudo-email (same pattern used at signup)
      const numeric = identifier.trim();
      emailToUse = `${numeric}@ccbc.com`;
    } else if (identifier.includes('@')) {
      // If user typed an email, use it directly
      emailToUse = identifier.trim();
    } else {
      Alert.alert(
        'Login Required',
        'Please enter your phone number (digits only) or your registered email to log in.'
      );
      return;
    }

    try {
      setLoading(true);
      await signInWithEmailAndPassword(auth, emailToUse, password);
      navigation.navigate('Dashboard');
    } catch (error) {
      console.error('Login error:', error);
      let message = 'Something went wrong. Please try again.';
      if (error.code === 'auth/user-not-found') {
        message = 'No account found for that phone number or email.';
      } else if (error.code === 'auth/wrong-password') {
        message = 'Incorrect password. Please try again.';
      } else if (error.code === 'auth/invalid-email') {
        message = 'The email address is invalid.';
      } else if (error.code === 'auth/too-many-requests') {
        message = 'Too many unsuccessful attempts. Try again later.';
      }
      Alert.alert('Login Failed', message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <LinearGradient colors={['#003366', '#990000']} style={styles.background}>
      <View style={styles.card}>
        <Image
          source={require('../assets/profile-placeholder.png')}
          style={styles.avatar}
        />
        <Text style={styles.title}>Welcome Back</Text>
        <Text style={styles.subtitle}>We’re glad to see you again</Text>

        <TextInput
          style={styles.input}
          placeholder="Full Name or Phone Number"
          placeholderTextColor="#666"
          value={identifier}
          onChangeText={setIdentifier}
          keyboardType="default"
          autoCapitalize="none"
        />

        <View style={styles.passwordContainer}>
          <TextInput
            style={[styles.input, { flex: 1, marginBottom: 0 }]}
            placeholder="Password"
            placeholderTextColor="#666"
            secureTextEntry={!showPassword}
            value={password}
            onChangeText={setPassword}
            autoCapitalize="none"
            onSubmitEditing={handleLogin}
          />
          <TouchableOpacity
            onPress={() => setShowPassword(!showPassword)}
            style={styles.eyeIcon}
            hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
          >
            <Ionicons
              name={showPassword ? 'eye-off-outline' : 'eye-outline'}
              size={22}
              color="#666"
            />
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={styles.loginButton}
          onPress={handleLogin}
          disabled={loading}
        >
          <LinearGradient
            colors={['#cc0000', '#003366']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={[styles.loginGradient, loading ? { opacity: 0.8 } : null]}
          >
            {loading ? (
              <ActivityIndicator size="small" color="#fff" />
            ) : (
              <Text style={styles.loginText}>Log In</Text>
            )}
          </LinearGradient>
        </TouchableOpacity>

        {/* Sign Up Prompt */}
        <View style={styles.signupPrompt}>
          <Text style={styles.promptText}>Don’t have an account?</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
            <Text style={styles.signupLink}> Sign Up</Text>
          </TouchableOpacity>
        </View>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    backgroundColor: '#fff',
    padding: 25,
    borderRadius: 20,
    width: '85%',
    alignItems: 'center',
    elevation: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
  },
  avatar: {
    width: 90,
    height: 90,
    borderRadius: 45,
    marginBottom: 15,
    backgroundColor: '#eee',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#003366',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#003366',
    backgroundColor: '#fff',
    padding: 12,
    marginBottom: 15,
    borderRadius: 10,
    fontSize: 16,
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    marginBottom: 15,
  },
  eyeIcon: {
    position: 'absolute',
    right: 15,
  },
  loginButton: {
    width: '100%',
    borderRadius: 10,
    overflow: 'hidden',
    marginTop: 10,
  },
  loginGradient: {
    paddingVertical: 12,
    alignItems: 'center',
    borderRadius: 10,
  },
  loginText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  signupPrompt: {
    flexDirection: 'row',
    marginTop: 15,
  },
  promptText: {
    color: '#333',
    fontSize: 14,
  },
  signupLink: {
    color: '#003366',
    fontWeight: 'bold',
    fontSize: 14,
  },
});
