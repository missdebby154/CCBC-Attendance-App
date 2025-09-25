import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

export default function ProfileScreen() {
  const user = {
    fullName: 'Deborah Owusu',
    phone: '+233 20 123 4567',
    role: 'Church Member',
  };

  return (
    <LinearGradient colors={['#003366', '#336699']} style={styles.background}>
      <View style={styles.card}>
        <FontAwesome5 name="user-circle" size={120} color="#003366" />
        <Text style={styles.name}>{user.fullName}</Text>
        <Text style={styles.info}>📞 {user.phone}</Text>
        <Text style={styles.roleTag}>{user.role}</Text>
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
    width: '85%',
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 30,
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  name: {
    fontSize: 26,
    fontWeight: 'bold',
    marginTop: 20,
    color: '#003366',
  },
  info: {
    fontSize: 18,
    marginTop: 10,
    color: '#333',
  },
  roleTag: {
    marginTop: 15,
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
    backgroundColor: '#cc0000',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    overflow: 'hidden',
  },
});