import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const Privacy = () => {
  return (
    <LinearGradient colors={['#003366', '#00509e', '#0073e6']} style={styles.background}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Privacy Policy</Text>

        <Text style={styles.subtitle}>
          Central Charismatic Baptist Church (CCBC) — Gyinase, Kumasi
        </Text>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Your Privacy Matters</Text>
          <Text style={styles.cardBody}>
            At Central Charismatic Baptist Church, we value your trust and are committed to
            protecting your personal information. This app is built with privacy and
            confidentiality as a top priority.
          </Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Data We Collect</Text>
          <Text style={styles.cardBody}>
            The CCBC app may collect basic personal details such as your full name, contact number,
            address, date of birth, and church attendance records. These details help us serve you
            better, communicate announcements, and maintain accurate church records.
          </Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>How We Protect Your Data</Text>
          <Text style={styles.cardBody}>
            Your data is securely stored and managed using Google Firebase — a trusted and
            industry-leading cloud service. Firebase automatically uses advanced security features
            including:
          </Text>
          <Text style={styles.cardList}>• End-to-end encryption for sensitive data</Text>
          <Text style={styles.cardList}>• Secure user authentication (Firebase Auth)</Text>
          <Text style={styles.cardList}>• Role-based access control</Text>
          <Text style={styles.cardList}>
            • Encrypted Firestore database storage to prevent unauthorized access
          </Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Who Can Access Your Data</Text>
          <Text style={styles.cardBody}>
            Only authorized church administrators have access to member information for
            administrative and communication purposes. No personal data is shared with third
            parties or used for commercial purposes.
          </Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>User Control</Text>
          <Text style={styles.cardBody}>
            You have the right to update or request removal of your data from the system at any
            time. For any data-related concerns, please reach out to the church administration or
            the app developer.
          </Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Contact</Text>
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

export default Privacy;

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
  cardList: {
    fontSize: 14,
    color: '#333',
    marginBottom: 4,
    marginLeft: 10,
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
