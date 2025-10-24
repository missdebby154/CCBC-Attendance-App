import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import * as ImagePicker from 'expo-image-picker';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { getFirestore, doc, setDoc } from 'firebase/firestore';
import { auth } from '../configs/firebaseconfig';

const EditProfile = () => {
  const [profileImage, setProfileImage] = useState(null);
  const [fullName, setFullName] = useState('');
  const [maritalStatus, setMaritalStatus] = useState('');
  const [gender, setGender] = useState('');
  const [dob, setDob] = useState('');
  const [homeAddress, setHomeAddress] = useState('');
  const [occupation, setOccupation] = useState('');
  const [department, setDepartment] = useState('');
  const [notes, setNotes] = useState('');
  const [loading, setLoading] = useState(false);

  // Pick image from gallery
  const pickImage = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permissionResult.granted) {
      alert('Permission to access camera roll is required!');
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.7,
    });

    if (!result.canceled) {
      setProfileImage(result.assets[0].uri);
    }
  };

  // Upload image to Firebase Storage
  const uploadImage = async (uri, userId) => {
    const response = await fetch(uri);
    const blob = await response.blob();
    const storage = getStorage();
    const storageRef = ref(storage, `profileImages/${userId}.jpg`);
    await uploadBytes(storageRef, blob);
    const downloadURL = await getDownloadURL(storageRef);
    return downloadURL;
  };

  // Save profile to Firestore
  const saveProfile = async () => {
    try {
      setLoading(true);
      const user = auth.currentUser;
      if (!user) return;

      let imageUrl = '';
      if (profileImage) {
        imageUrl = await uploadImage(profileImage, user.uid);
      }

      const db = getFirestore();
      await setDoc(doc(db, 'users', user.uid), {
        fullName,
        maritalStatus,
        gender,
        dob,
        homeAddress,
        occupation,
        department,
        notes,
        profileImage: imageUrl,
        updatedAt: new Date(),
      });

      Alert.alert('Success', 'Profile updated successfully!');
    } catch (err) {
      console.error(err);
      Alert.alert('Error', 'Failed to save profile.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <LinearGradient colors={['#003366', '#00509e', '#0073e6']} style={styles.background}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.topTitle}>Enter Your Details</Text>

        {/* Profile Picture */}
        <View style={styles.pictureContainer}>
          <Image
            source={profileImage ? { uri: profileImage } : { uri: 'https://via.placeholder.com/100' }}
            style={styles.profilePic}
          />
          <TouchableOpacity style={styles.cameraButton} onPress={pickImage}>
            <Ionicons name="camera" size={20} color="#fff" />
          </TouchableOpacity>
        </View>

        {/* Form Fields */}
        <View style={styles.form}>
          <Text style={styles.label}>Full Name</Text>
          <TextInput style={styles.input} placeholder="Enter full name" value={fullName} onChangeText={setFullName} />

          <Text style={styles.label}>Marital Status</Text>
          <TextInput style={styles.input} placeholder="Enter marital status" value={maritalStatus} onChangeText={setMaritalStatus} />

          <Text style={styles.label}>Gender</Text>
          <TextInput style={styles.input} placeholder="Enter gender" value={gender} onChangeText={setGender} />

          <Text style={styles.label}>Date of Birth</Text>
          <TextInput style={styles.input} placeholder="DD/MM/YYYY" value={dob} onChangeText={setDob} />

          <Text style={styles.label}>Home Address</Text>
          <TextInput style={styles.input} placeholder="Enter home address" value={homeAddress} onChangeText={setHomeAddress} />

          <Text style={styles.label}>Occupation</Text>
          <TextInput style={styles.input} placeholder="Enter occupation" value={occupation} onChangeText={setOccupation} />

          <Text style={styles.label}>Department</Text>
          <TextInput style={styles.input} placeholder="Enter department" value={department} onChangeText={setDepartment} />

          <Text style={styles.label}>Other Notes</Text>
          <TextInput
            style={[styles.input, { height: 80 }]}
            placeholder="Additional notes"
            multiline
            value={notes}
            onChangeText={setNotes}
          />

          <TouchableOpacity style={styles.saveButton} onPress={saveProfile} disabled={loading}>
            {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.saveButtonText}>Save Changes</Text>}
          </TouchableOpacity>
        </View>

        {/* Footer Note */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>© 2025 Deborah Apobona. All rights reserved.</Text>
        </View>
      </ScrollView>
    </LinearGradient>
  );
};

export default EditProfile;

const styles = StyleSheet.create({
  background: { flex: 1 },
  container: { padding: 20, paddingBottom: 40 },
  topTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 20,
  },
  pictureContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  profilePic: { width: 120, height: 120, borderRadius: 60 },
  cameraButton: {
    position: 'absolute',
    bottom: 0,
    right: 60 - 15,
    backgroundColor: '#003366',
    padding: 6,
    borderRadius: 20,
  },
  form: {},
  label: { fontSize: 14, fontWeight: 'bold', color: '#fff', marginBottom: 5, marginTop: 10 },
  input: { backgroundColor: '#fff', borderRadius: 8, paddingHorizontal: 15, paddingVertical: 10, fontSize: 14, elevation: 2 },
  saveButton: { backgroundColor: '#003366', paddingVertical: 15, borderRadius: 12, marginTop: 30, alignItems: 'center' },
  saveButtonText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
  footer: { borderTopWidth: 1, borderColor: '#ffffff55', marginTop: 30, paddingVertical: 15, alignItems: 'center' },
  footerText: { fontSize: 14, color: '#fff', fontStyle: 'italic' },
});
