// AttendanceScreen.js
import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  Modal,
  FlatList,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { FontAwesome5 } from '@expo/vector-icons';
import { auth, db } from '../configs/firebaseconfig';
import { doc, getDoc, collection, addDoc, serverTimestamp } from 'firebase/firestore';

const SERVICE_TYPES = [
  'Sunday — First Service',
  'Sunday — Second Service',
  'Wednesday — Prayer Meeting',
  'Friday — Fire for Fire',
  'Special Program / Event',
];

export default function AttendanceScreen({ navigation }) {
  const [status, setStatus] = useState('Present'); // 'Present' or 'Absent'
  const [service, setService] = useState(SERVICE_TYPES[0]);
  const [saving, setSaving] = useState(false);
  const [loadingProfile, setLoadingProfile] = useState(true);
  const [profile, setProfile] = useState({ fullName: '', phone: '' });
  const [pickerVisible, setPickerVisible] = useState(false);
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    // update displayed time each minute
    const t = setInterval(() => setNow(new Date()), 60 * 1000);
    loadProfile();
    return () => clearInterval(t);
  }, []);

  const loadProfile = async () => {
    try {
      setLoadingProfile(true);
      const user = auth.currentUser;
      if (!user) {
        setProfile({ fullName: '', phone: '' });
        return;
      }
      const userRef = doc(db, 'users', user.uid);
      const snap = await getDoc(userRef);
      if (snap.exists()) {
        const data = snap.data();
        setProfile({
          fullName: data.fullName || user.displayName || '',
          phone: data.phone || data.phoneNumber || (user.email ? user.email.replace('@ccbc.com', '') : ''),
        });
      } else {
        setProfile({
          fullName: user.displayName || '',
          phone: user.email ? user.email.replace('@ccbc.com', '') : '',
        });
      }
    } catch (err) {
      console.error('loadProfile error', err);
    } finally {
      setLoadingProfile(false);
    }
  };

  const formatDate = (d) => d.toLocaleDateString();
  const formatTime = (d) => d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  const handleSave = async () => {
    const user = auth.currentUser;
    if (!user) {
      Alert.alert('Not signed in', 'Please log in to mark attendance.');
      return;
    }

    setSaving(true);

    try {
      const payload = {
        uid: user.uid,
        fullName: profile.fullName || '',
        phone: profile.phone || '',
        date: formatDate(now),
        time: formatTime(now),
        service,
        status,
        createdAt: serverTimestamp(),
      };

      await addDoc(collection(db, 'attendance'), payload);

      Alert.alert('Saved', `Attendance marked as "${status}" for "${service}".`);
      // Optionally navigate to Report to view entries
      navigation.navigate('Report');
    } catch (err) {
      console.error('save attendance error', err);
      Alert.alert('Error', 'Could not save attendance. Try again.');
    } finally {
      setSaving(false);
    }
  };

  if (loadingProfile) {
    return (
      <LinearGradient colors={['#003366', '#336699']} style={styles.loadingBg}>
        <ActivityIndicator size="large" color="#fff" />
      </LinearGradient>
    );
  }

  return (
    <LinearGradient colors={['#003366', '#336699']} style={styles.background}>
      <View style={styles.container}>
        <View style={styles.card}>
          <FontAwesome5 name="calendar-check" size={72} color="#003366" />
          <Text style={styles.label}>Date</Text>
          <Text style={styles.value}>{formatDate(now)}</Text>

          <Text style={[styles.label, { marginTop: 12 }]}>Time</Text>
          <Text style={styles.value}>{formatTime(now)}</Text>

          <Text style={[styles.label, { marginTop: 12 }]}>Service Type</Text>
          <TouchableOpacity style={styles.pickerButton} onPress={() => setPickerVisible(true)}>
            <Text style={styles.pickerText}>{service}</Text>
          </TouchableOpacity>

          <Text style={[styles.label, { marginTop: 12 }]}>Status</Text>
          <View style={styles.statusRow}>
            <TouchableOpacity
              style={[styles.statusButton, status === 'Present' && styles.statusActive]}
              onPress={() => setStatus('Present')}
            >
              <Text style={[styles.statusText, status === 'Present' && styles.statusTextActive]}>Present</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.statusButton, status === 'Absent' && styles.statusActive]}
              onPress={() => setStatus('Absent')}
            >
              <Text style={[styles.statusText, status === 'Absent' && styles.statusTextActive]}>Absent</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={styles.saveButton} onPress={handleSave} disabled={saving}>
            {saving ? <ActivityIndicator color="#fff" /> : <Text style={styles.saveButtonText}>Save Attendance</Text>}
          </TouchableOpacity>
        </View>

        <View style={styles.infoCard}>
          <Text style={styles.infoTitle}>Marked by</Text>
          <Text style={styles.infoText}>{profile.fullName || '—'}</Text>
          <Text style={styles.infoText}>{profile.phone || '—'}</Text>
        </View>
      </View>

      {/* Service picker modal */}
      <Modal visible={pickerVisible} animationType="slide" transparent>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Select Service Type</Text>
            <FlatList
              data={SERVICE_TYPES}
              keyExtractor={(i) => i}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.modalItem}
                  onPress={() => {
                    setService(item);
                    setPickerVisible(false);
                  }}
                >
                  <Text style={styles.modalItemText}>{item}</Text>
                </TouchableOpacity>
              )}
            />
            <TouchableOpacity style={styles.modalClose} onPress={() => setPickerVisible(false)}>
              <Text style={styles.modalCloseText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  background: { flex: 1 },
  loadingBg: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  container: { padding: 20, paddingTop: 34 },
  card: {
    backgroundColor: '#fff',
    borderRadius: 14,
    padding: 18,
    alignItems: 'center',
    elevation: 5,
    marginBottom: 16,
  },
  label: { fontSize: 13, color: '#6b7278', marginTop: 8 },
  value: { fontSize: 18, fontWeight: '700', color: '#003366' },
  pickerButton: {
    width: '100%',
    backgroundColor: '#f7f9fb',
    paddingVertical: 12,
    paddingHorizontal: 14,
    borderRadius: 10,
    marginTop: 6,
  },
  pickerText: { color: '#003366', fontWeight: '600' },
  statusRow: { flexDirection: 'row', marginTop: 8 },
  statusButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#cbd6e6',
    marginHorizontal: 8,
    backgroundColor: '#fff',
  },
  statusActive: { backgroundColor: '#003366' },
  statusText: { color: '#003366', fontWeight: '700' },
  statusTextActive: { color: '#fff' },
  saveButton: {
    marginTop: 18,
    backgroundColor: '#cc0000',
    paddingVertical: 12,
    paddingHorizontal: 26,
    borderRadius: 12,
    alignItems: 'center',
    width: '100%',
  },
  saveButtonText: { color: '#fff', fontWeight: '700', fontSize: 16 },
  infoCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 14,
    elevation: 3,
    alignItems: 'center',
  },
  infoTitle: { color: '#666', fontSize: 13 },
  infoText: { color: '#003366', fontWeight: '700', marginTop: 6 },

  modalOverlay: {
    flex: 1,
    backgroundColor: '#00000044',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 16,
    borderTopLeftRadius: 14,
    borderTopRightRadius: 14,
    maxHeight: '60%',
  },
  modalTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#003366',
    marginBottom: 8,
  },
  modalItem: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderColor: '#eee',
  },
  modalItemText: {
    fontSize: 15,
    color: '#222',
  },
  modalClose: {
    paddingVertical: 12,
    alignItems: 'center',
  },
  modalCloseText: {
    color: '#003366',
    fontWeight: '700',
  },
});
