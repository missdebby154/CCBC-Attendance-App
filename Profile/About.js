import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const About = () => {
  return (
    <LinearGradient colors={['#003366', '#00509e', '#0073e6']} style={styles.background}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>About CCBC App</Text>

        <Text style={styles.subtitle}>
          Central Charismatic Baptist Church — Gyinase, Kumasi
        </Text>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>What is this app?</Text>
          <Text style={styles.cardBody}>
            The CCBC app is designed to help Central Charismatic Baptist Church (Gyinase, Kumasi)
            manage member data, share announcements and reminders, and track attendance — all
            from a simple, secure mobile interface.
          </Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Key features</Text>
          <Text style={styles.cardBody}>• Member profile management (contact, address, DOB)</Text>
          <Text style={styles.cardBody}>• Church announcements & push notifications</Text>
          <Text style={styles.cardBody}>• Attendance checking & reports</Text>
          <Text style={styles.cardBody}>• Reminders for events and programs</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Who is this for?</Text>
          <Text style={styles.cardBody}>
            This app is built for church leaders, administrators, and members of CCBC Gyinase who
            want an easy way to stay connected, informed, and organized.
          </Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Version</Text>
          <Text style={styles.cardBody}>v1.0.0</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Contact & Support</Text>
          <Text style={styles.cardBody}>Email: deborahapobona86@gmail.com</Text>
          <Text style={styles.cardBody}>Phone: +233 54 663 6758</Text>
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>Developed by Deborah Apobona</Text>
        </View>
      </ScrollView>
    </LinearGradient>
  );
};

export default About;

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  container: {
    padding: 20,
    paddingBottom: 40,
  },
  title: {
    fontSize: 26,
    fontWeight: '700',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 14,
    color: '#e6f0ff',
    textAlign: 'center',
    marginBottom: 18,
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 14,
    marginBottom: 12,
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.12,
    shadowOffset: { width: 0, height: 2 },
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#003366',
    marginBottom: 8,
  },
  cardBody: {
    fontSize: 14,
    color: '#333',
    marginBottom: 6,
    lineHeight: 20,
  },
  footer: {
    borderTopWidth: 1,
    borderColor: '#ffffff55',
    marginTop: 18,
    paddingVertical: 14,
    alignItems: 'center',
  },
  footerText: {
    fontSize: 14,
    color: '#fff',
    fontStyle: 'italic',
  },
});
