import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import colors from '../constants/colors'; // Make sure this file exists

// Sample data – you can replace this with real records later
const attendanceData = [
  { id: '1', date: '2025-09-20', status: 'Present' },
  { id: '2', date: '2025-09-21', status: 'Absent' },
  { id: '3', date: '2025-09-22', status: 'Present' },
];

export default function ReportScreen() {
  const renderItem = ({ item }) => (
    <View style={styles.record}>
      <Text style={styles.date}>{item.date}</Text>
      <Text style={[styles.status, item.status === 'Present' ? styles.present : styles.absent]}>
        {item.status}
      </Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Attendance Report</Text>
      <FlatList
        data={attendanceData}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    padding: 20,
  },
  title: {
    fontSize: 24,
    color: colors.primaryBlue,
    marginBottom: 20,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  record: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderColor: '#ccc',
  },
  date: {
    fontSize: 16,
    color: colors.textDark,
  },
  status: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  present: {
    color: colors.primaryBlue,
  },
  absent: {
    color: colors.primaryRed,
  },
});