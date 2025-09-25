import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Image,
  Alert,
  TouchableOpacity,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

export default function SignupScreen({ navigation }) {
  const [fullName, setFullName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');

  const handleSignup = () => {
    if (!fullName || !phoneNumber || !password) {
      Alert.alert('Signup Failed', 'Please fill in all fields.');
    } else {
      navigation.navigate('Dashboard');
    }
  };

  return (
    <LinearGradient
      colors={['#003366', '#990000']}
      style={styles.background}
    >
      <View style={styles.card}>
        <Image
          source={require('../assets/profile-placeholder.png')}
          style={styles.avatar}
        />
        <Text style={styles.title}>Create Account</Text>
        <Text style={styles.subtitle}>Join the CCBC family today</Text>

        <TextInput
          style={styles.input}
          placeholder="Full Name"
          placeholderTextColor="#666"
          value={fullName}
          onChangeText={setFullName}
        />
        <TextInput
          style={styles.input}
          placeholder="Phone Number"
          placeholderTextColor="#666"
          keyboardType="phone-pad"
          value={phoneNumber}
          onChangeText={setPhoneNumber}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor="#666"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />

        <TouchableOpacity style={styles.signupButton} onPress={handleSignup}>
          <LinearGradient
            colors={['#cc0000', '#003366']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.signupGradient}
          >
            <Text style={styles.signupText}>Sign Up</Text>
          </LinearGradient>
        </TouchableOpacity>
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
  signupButton: {
    width: '100%',
    borderRadius: 10,
    overflow: 'hidden',
    marginTop: 10,
  },
  signupGradient: {
    paddingVertical: 12,
    alignItems: 'center',
    borderRadius: 10,
  },
  signupText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});