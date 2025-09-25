import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import colors from '../constants/colors'; // Make sure this file exists

export default function DashboardScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to CCBC Dashboard</Text>

      <View style={styles.buttonContainer}>
        <Button
          title="Mark Attendance"
          color={colors.primaryRed}
          onPress={() => navigation.navigate('Attendance')}
        />
      </View>

      <View style={styles.buttonContainer}>
        <Button
          title="View Reports"
          color={colors.primaryBlue}
          onPress={() => navigation.navigate('Report')}
        />
      </View>

      <View style={styles.buttonContainer}>
        <Button
          title="Logout"
          color={colors.textDark}
          onPress={() => navigation.navigate('Login')}
        />
      </View>
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
});