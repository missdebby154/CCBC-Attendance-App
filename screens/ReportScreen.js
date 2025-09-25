import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

export default function ReportScreen() {
  const attendanceRecords = [
    { date: '2025-09-01', service: 'Sunday First Service', status: 'Present' },
    { date: '2025-09-03', service: 'Wednesday Prayer Meeting', status: 'Present' },
    { date: '2025-09-06', service: 'Friday Fire for Fire', status: 'Absent' },
    { date: '2025-09-08', service: 'Sunday Second Service', status: 'Present' },
    { date: '2025-09-10', service: 'Wednesday Prayer Meeting', status: 'Present' },
  ];

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <LinearGradient
        colors={['#003366', '#990000']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.header}
      >
        <Ionicons name="stats-chart" size={60} color="#fff" />
        <Text style={styles.headerText}>Attendance Report</Text>
      </LinearGradient>

      {attendanceRecords.map((record, index) => (
        <View key={index} style={styles.card}>
          <View style={styles.cardTop}>
            <Text style={styles.date}>{record.date}</Text>
            <View
              style={[
                styles.statusBadge,
                record.status === 'Present' ? styles.present : styles.absent,
              ]}
            >
              <Text style={styles.statusText}>{record.status}</Text>
            </View>
          </View>
          <Text style={styles.service}>{record.service}</Text>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#f2f2f2',
  },
  header: {
    width: '100%',
    padding: 20,
    borderRadius: 15,
    alignItems: 'center',
    marginBottom: 20,
    elevation: 4,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginTop: 10,
  },
  card: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 12,
    marginBottom: 15,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  cardTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  date: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#003366',
  },
  service: {
    fontSize: 16,
    color: '#333',
    marginTop: 8,
  },
  statusBadge: {
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 20,
  },
  statusText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#fff',
  },
  present: {
    backgroundColor: '#28a745',
  },
  absent: {
    backgroundColor: '#dc3545',
  },
});