import React from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

const EditProfile = () => {
  return (
    <LinearGradient colors={['#003366', '#00509e', '#0073e6']} style={styles.background}>
      <ScrollView contentContainerStyle={styles.container}>
        
        {/* Header */}
        <Text style={styles.headerText}>Enter your details</Text>

        {/* Profile Picture */}
        <View style={styles.pictureContainer}>
          <Image
            source={{ uri: 'https://via.placeholder.com/100' }}
            style={styles.profilePic}
          />
          <TouchableOpacity style={styles.cameraButton}>
            <Ionicons name="camera" size={20} color="#fff" />
          </TouchableOpacity>
        </View>

        {/* Form Fields */}
        <View style={styles.form}>
          <Text style={styles.label}>Full Name</Text>
          <TextInput style={styles.input} placeholder="Enter full name" />

          <Text style={styles.label}>Marital Status</Text>
          <TextInput style={styles.input} placeholder="Enter marital status" />

          <Text style={styles.label}>Gender</Text>
          <TextInput style={styles.input} placeholder="Enter gender" />

          <Text style={styles.label}>Date of Birth</Text>
          <TextInput style={styles.input} placeholder="DD/MM/YYYY" />

          <Text style={styles.label}>Home Address</Text>
          <TextInput style={styles.input} placeholder="Enter home address" />

          <Text style={styles.label}>Occupation</Text>
          <TextInput style={styles.input} placeholder="Enter occupation" />

          <Text style={styles.label}>Department</Text>
          <TextInput style={styles.input} placeholder="Enter department" />

          <Text style={styles.label}>Other Notes</Text>
          <TextInput
            style={[styles.input, { height: 80 }]}
            placeholder="Additional notes"
            multiline
          />

          <TouchableOpacity style={styles.saveButton}>
            <Text style={styles.saveButtonText}>Save Changes</Text>
          </TouchableOpacity>
        </View>

        {/* Footer Note */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>Developed by Deborah Apobona</Text>
        </View>
      </ScrollView>
    </LinearGradient>
  );
};

export default EditProfile;

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  container: {
    padding: 20,
    paddingBottom: 40,
  },
  headerText: {
    fontSize: 22,
    fontWeight: '700',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 20,
  },
  pictureContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 30,
  },
  profilePic: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  cameraButton: {
    position: 'absolute',
    bottom: 0,
    right: 120 / 2 - 15,
    backgroundColor: '#003366',
    padding: 6,
    borderRadius: 20,
  },
  form: {},
  label: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 5,
    marginTop: 10,
  },
  input: {
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingHorizontal: 15,
    paddingVertical: 10,
    fontSize: 14,
    elevation: 2,
  },
  saveButton: {
    backgroundColor: '#003366',
    paddingVertical: 15,
    borderRadius: 12,
    marginTop: 30,
    alignItems: 'center',
  },
  saveButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  footer: {
    borderTopWidth: 1,
    borderColor: '#ffffff55',
    marginTop: 30,
    paddingVertical: 15,
    alignItems: 'center',
  },
  footerText: {
    fontSize: 14,
    color: '#fff',
    fontStyle: 'italic',
  },
});
