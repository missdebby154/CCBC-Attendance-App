import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Linking } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';

const Help = () => {
  const handleEmail = () => {
    Linking.openURL('mailto:deborahapobona86@gmail.com');
  };

  const handleCall = () => {
    Linking.openURL('tel:+233546636758');
  };

  return (
    <LinearGradient colors={['#003366', '#00509e', '#0073e6']} style={styles.background}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Help & Support</Text>
        <Text style={styles.subtitle}>
          Welcome to the Help Center. We're here to assist you with any questions or issues you may have.
        </Text>

        {/* FAQ Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Frequently Asked Questions</Text>

          <View style={styles.card}>
            <Text style={styles.question}>How do I update my profile?</Text>
            <Text style={styles.answer}>
              Go to your Profile tab and tap on “Edit Profile”. You can change your personal details there.
            </Text>
          </View>

          <View style={styles.card}>
            <Text style={styles.question}>I forgot my password. What should I do?</Text>
            <Text style={styles.answer}>
              On the login screen, tap on “Forgot Password?” and follow the steps to reset your password.
            </Text>
          </View>

          <View style={styles.card}>
            <Text style={styles.question}>How do I report an issue?</Text>
            <Text style={styles.answer}>
              You can reach us directly through the contact options below, or send feedback via the app settings.
            </Text>
          </View>
        </View>

        {/* Contact Section */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: '#fff' }]}>Contact Support</Text>

          <TouchableOpacity style={styles.contactOption} onPress={handleEmail}>
            <Ionicons name="mail-outline" size={24} color="#003366" />
            <Text style={styles.contactText}>Email us at deborahapobona86@gmail.com</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.contactOption} onPress={handleCall}>
            <MaterialIcons name="call" size={24} color="#003366" />
            <Text style={styles.contactText}>Call: +233 54 663 6758</Text>
          </TouchableOpacity>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>Developed by Deborah Apobona</Text>
        </View>
      </ScrollView>
    </LinearGradient>
  );
};

export default Help;

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  container: {
    padding: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: '700',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 15,
    color: '#f0f0f0',
    textAlign: 'center',
    marginBottom: 20,
    lineHeight: 22,
  },
  section: {
    marginBottom: 25,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 10,
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 15,
    marginBottom: 10,
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowOffset: { width: 0, height: 2 },
  },
  question: {
    fontSize: 16,
    fontWeight: '600',
    color: '#222',
    marginBottom: 4,
  },
  answer: {
    fontSize: 14,
    color: '#555',
    lineHeight: 20,
  },
  contactOption: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    backgroundColor: '#eef4fb',
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 10,
  },
  contactText: {
    marginLeft: 10,
    color: '#003366',
    fontSize: 15,
    fontWeight: '500',
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
