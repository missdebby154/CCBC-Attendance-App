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
      // Clear navigation stack and go to SplashScreen (initial screen)
      navigation.reset({
        index: 0,
        routes: [{ name: 'Splash' }],
      });
    } catch (error) {
      console.error('Logout error:', error);
      Alert.alert('Error', 'Failed to log out. Please try again.');
    }
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

  return (
    <LinearGradient colors={['#003366', '#336699']} style={styles.background}>
      <View style={styles.container}>
        {/* --- Profile Card at Top --- */}
        <View style={styles.card}>
          <FontAwesome5 name="user-circle" size={120} color="#003366" />
          <Text style={styles.name}>{user.fullName}</Text>
          <Text style={styles.info}>📞 {user.phone}</Text>
          <Text style={styles.roleTag}>{user.role}</Text>
        </View>

        {/* --- Profile Options Section --- */}
        <View style={styles.section}>
          <TouchableOpacity style={styles.option} onPress={() => navigation.navigate('EditProfile')}>
            <Ionicons name="person-outline" size={22} color="#003366" />
            <Text style={styles.optionText}>Edit Profile</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.option} onPress={() => navigation.navigate('Settings')}>
            <Ionicons name="settings-outline" size={22} color="#003366" />
            <Text style={styles.optionText}>Settings</Text>
          </TouchableOpacity>

          {/* New: Help */}
          <TouchableOpacity style={styles.option} onPress={() => navigation.navigate('Help')}>
            <Ionicons name="help-circle-outline" size={22} color="#003366" />
            <Text style={styles.optionText}>Help</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.option} onPress={() => navigation.navigate('PrivacyPolicy')}>
            <MaterialIcons name="privacy-tip" size={22} color="#003366" />
            <Text style={styles.optionText}>Privacy Policy</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.option} onPress={() => navigation.navigate('About')}>
            <Ionicons name="information-circle-outline" size={22} color="#003366" />
            <Text style={styles.optionText}>About App</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.option, { borderBottomWidth: 0 }]} onPress={handleLogout}>
            <MaterialIcons name="logout" size={22} color="#cc0000" />
            <Text style={[styles.optionText, { color: '#cc0000' }]}>Logout</Text>
          </TouchableOpacity>
        </View>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    paddingTop: 60,
    alignItems: 'center',
  },
  container: {
    width: '90%',
    flex: 1,
    alignItems: 'center',
  },
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
    marginBottom: 25,
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
    paddingVertical: 10,
    elevation: 4,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderColor: '#eee',
  },
  optionText: {
    fontSize: 17,
    color: '#003366',
    marginLeft: 15,
  },
});
