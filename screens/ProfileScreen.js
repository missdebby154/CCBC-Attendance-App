// ProfileScreen.js
import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { FontAwesome5, Ionicons, MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { auth, db } from '../configs/firebaseconfig';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';

export default function ProfileScreen({ navigation }) {
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        setUserProfile(null);
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const userDocRef = doc(db, 'users', user.uid);
        const userSnap = await getDoc(userDocRef);

        if (userSnap.exists()) {
          setUserProfile(userSnap.data());
        } else {
          setUserProfile({
            fullName: user.displayName || 'Unknown User',
            phone: user.email ? user.email.replace('@ccbc.com', '') : user.uid,
            role: 'Church Member',
          });
        }
      } catch (err) {
        console.error('Error fetching profile:', err);
        setUserProfile({
          fullName: 'Unknown User',
          phone: '—',
          role: 'Church Member',
        });
      } finally {
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigation.reset({
        index: 0,
        routes: [{ name: 'Splash' }],
      });
    } catch (error) {
      console.error('Logout error:', error);
      Alert.alert('Error', 'Failed to log out. Please try again.');
    }
  };

  // Navigate to Profile folder screens
  const goTo = (screenName) => {
    navigation.navigate('Profile', { screen: screenName });
  };

  if (loading) {
    return (
      <LinearGradient colors={['#003366', '#336699']} style={styles.background}>
        <ActivityIndicator size="large" color="#fff" />
      </LinearGradient>
    );
  }

  const user = {
    fullName: userProfile?.fullName || 'Deborah Owusu',
    phone: userProfile?.phoneNumber || userProfile?.phone || '+233 20 123 4567',
    role: userProfile?.role || 'Church Member',
  };

  const menuList = [
    { key: 'EditProfile', label: 'Edit Profile', icon: <Ionicons name="person-outline" size={28} color="#003366" /> },
    { key: 'Settings', label: 'Settings', icon: <Ionicons name="settings-outline" size={28} color="#003366" /> },
    { key: 'Help', label: 'Help', icon: <Ionicons name="help-circle-outline" size={28} color="#003366" /> },
    { key: 'Privacy', label: 'Privacy', icon: <MaterialIcons name="privacy-tip" size={28} color="#003366" /> },
    { key: 'About', label: 'About', icon: <Ionicons name="information-circle-outline" size={28} color="#003366" /> },
    { key: 'Logout', label: 'Logout', icon: <MaterialIcons name="logout" size={28} color="#cc0000" />, danger: true },
  ];

  return (
    <LinearGradient colors={['#003366', '#336699']} style={styles.background}>
      <View style={styles.container}>
        {/* Profile Card */}
        <View style={styles.card}>
          <FontAwesome5 name="user-circle" size={120} color="#003366" />
          <Text style={styles.name}>{user.fullName}</Text>
          <Text style={styles.info}>📞 {user.phone}</Text>
          <Text style={styles.roleTag}>{user.role}</Text>
        </View>

        {/* Menu List */}
        <View style={styles.section}>
          {menuList.map((m) => (
            <TouchableOpacity
              key={m.key}
              style={[styles.option, m.danger && styles.logoutOption]}
              activeOpacity={0.75}
              onPress={() => (m.key === 'Logout' ? handleLogout() : goTo(m.key))}
            >
              <View style={styles.iconWrapper}>{m.icon}</View>
              <Text style={[styles.optionText, m.danger && { color: '#cc0000' }]}>
                {m.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Footer Note */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>Developed by Deborah Apobona</Text>
        </View>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  background: { flex: 1, paddingTop: 60, alignItems: 'center' },
  container: { width: '90%', flex: 1, alignItems: 'center' },
  card: {
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 20,
    paddingVertical: 30,
    paddingHorizontal: 20,
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    marginBottom: 18,
  },
  name: { fontSize: 26, fontWeight: 'bold', marginTop: 20, color: '#003366' },
  info: { fontSize: 18, marginTop: 10, color: '#333' },
  roleTag: {
    marginTop: 15,
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
    backgroundColor: '#cc0000',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  section: {
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 15,
    paddingVertical: 6,
    elevation: 4,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 18,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderColor: '#eee',
  },
  iconWrapper: { width: 36, alignItems: 'center' },
  optionText: {
    fontSize: 19,
    color: '#003366',
    marginLeft: 18,
    fontWeight: '600',
  },
  logoutOption: { borderBottomWidth: 0 },
  footer: {
    marginTop: 20,
    paddingVertical: 12,
    borderTopWidth: 1,
    borderColor: '#ffffff55',
    width: '100%',
    alignItems: 'center',
  },
  footerText: {
    color: '#fff',
    fontSize: 14,
    fontStyle: 'italic',
  },
});
