import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

export default function AttendanceScreen({ navigation }) {
  const handleConfirm = () => {
    Alert.alert(
      '✅ Attendance Confirmed',
      'Your attendance has been successfully recorded.'
    );
    navigation.navigate('Dashboard');
  };

  return (
    <LinearGradient
      colors={['#003366', '#990000']} // CCBC blue to red
      style={styles.background}
    >
      <View style={styles.overlay}>
        <View style={styles.card}>
          <FontAwesome5 name="check-circle" size={90} color="#003366" />
          <Text style={styles.title}>Mark Attendance</Text>
          <Text style={styles.message}>
            You are at church. Tap below to confirm your attendance.
          </Text>

          <TouchableOpacity style={styles.button} onPress={handleConfirm}>
            <LinearGradient
              colors={['#cc0000', '#003366']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.gradient}
            >
              <Text style={styles.buttonText}>Confirm Attendance</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  card: {
    backgroundColor: '#fff',
    padding: 30,
    borderRadius: 20,
    alignItems: 'center',
    elevation: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    width: '90%',
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#003366',
    marginVertical: 15,
    textAlign: 'center',
  },
  message: {
    fontSize: 16,
    color: '#333',
    textAlign: 'center',
    marginBottom: 30,
  },
  button: {
    width: '100%',
    borderRadius: 12,
    overflow: 'hidden',
  },
  gradient: {
    paddingVertical: 14,
    alignItems: 'center',
    borderRadius: 12,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});