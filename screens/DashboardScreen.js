import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { FontAwesome5, MaterialIcons, Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import * as Animatable from 'react-native-animatable';

const screenHeight = Dimensions.get('window').height;

export default function DashboardScreen({ navigation }) {
  const [isInChurch, setIsInChurch] = useState(true);

  const handleAttendance = () => {
    navigation.navigate('Attendance');
  };

  return (
    <LinearGradient colors={['#e6f0ff', '#ffffff']} style={styles.background}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Welcome to CCBC</Text>
        <Text style={styles.verse}>
          “I was glad when they said unto me, Let us go into the house of the Lord.” — Psalm 122:1
        </Text>
        <Text style={styles.subHeader}>“Shalom” — Peace be unto you</Text>
      </View>

      <View style={styles.container}>
        <Animatable.View animation="fadeInUp" delay={100} style={styles.fullBlock}>
          <TouchableOpacity style={styles.iconBlock} onPress={() => navigation.navigate('Profile')}>
            <FontAwesome5 name="user-circle" size={70} color="#003366" />
            <Text style={styles.iconLabel}>Profile</Text>
          </TouchableOpacity>
        </Animatable.View>

        <Animatable.View animation="fadeInUp" delay={200} style={styles.fullBlock}>
          <TouchableOpacity style={styles.iconBlock} onPress={() => navigation.navigate('Announcements')}>
            <MaterialIcons name="announcement" size={70} color="#cc0000" />
            <Text style={styles.iconLabel}>Announcements</Text>
          </TouchableOpacity>
        </Animatable.View>

        <Animatable.View animation="fadeInUp" delay={300} style={styles.fullBlock}>
          <TouchableOpacity style={styles.iconBlock} onPress={() => navigation.navigate('Report')}>
            <Ionicons name="stats-chart" size={70} color="#006600" />
            <Text style={styles.iconLabel}>Reports</Text>
          </TouchableOpacity>
        </Animatable.View>
      </View>

      <Animatable.View animation="fadeInUp" delay={400}>
        <TouchableOpacity style={styles.attendanceButton} onPress={handleAttendance}>
          <FontAwesome5 name="check-circle" size={24} color="#fff" style={{ marginRight: 10 }} />
          <Text style={styles.buttonText}>Mark Attendance</Text>
        </TouchableOpacity>
      </Animatable.View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  header: {
    paddingTop: 60,
    paddingBottom: 20,
    alignItems: 'center',
  },
  headerText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#003366',
    textAlign: 'center',
  },
  verse: {
    fontSize: 14,
    fontStyle: 'italic',
    color: '#666',
    marginTop: 8,
    marginHorizontal: 20,
    textAlign: 'center',
  },
  subHeader: {
    fontSize: 14,
    fontStyle: 'italic',
    color: '#555',
    marginTop: 4,
  },
  container: {
    flex: 1,
    paddingVertical: 10,
    paddingBottom: 20, // extra space for button
  },
  fullBlock: {
    flex: 0.9, // slightly reduced to make space
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconBlock: {
    height: screenHeight / 5.5, // reduced height
    width: '85%',
    backgroundColor: '#fff',
    borderRadius: 20,
    elevation: 5,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  iconLabel: {
    marginTop: 10,
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  attendanceButton: {
    flexDirection: 'row',
    backgroundColor: '#003366',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    width: '85%',
    alignSelf: 'center',
    elevation: 6,
    shadowColor: '#003366',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 6,
    marginBottom: 20,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
  },
});