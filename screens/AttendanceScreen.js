import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, Alert } from 'react-native';
import colors from '../constants/colors'; // Make sure this file exists

export default function AttendanceScreen() {
  const [status, setStatus] = useState(null); // 'Present' or 'Absent'

  const markAttendance = (value) => {
    setStatus(value);
    Alert.alert('Attendance Marked', `You are marked as ${value}`);
    // You can later send this to a backend or store locally
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Mark Your Attendance</Text>

      <View style={styles.buttonContainer}>
        <Button
          title="Present"
          color={colors.primaryBlue}
          onPress={() => markAttendance('Present')}
        />
      </View>

      <View style={styles.buttonContainer}>
        <Button
          title="Absent"
          color={colors.primaryRed}
          onPress={() => markAttendance('Absent')}
        />
      </View>

      {status && (
        <Text style={styles.statusText}>
          Status: <Text style={{ fontWeight: 'bold' }}>{status}</Text>
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    padding: 20,
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    color: colors.primaryBlue,
    marginBottom: 30,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  buttonContainer: {
    marginVertical: 10,
  },
  statusText: {
    marginTop: 30,
    fontSize: 18,
    textAlign: 'center',
    color: colors.textDark,
  },
});