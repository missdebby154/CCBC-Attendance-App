import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

export default function AnnouncementScreen() {
  const announcements = [
    { icon: '📖', text: 'Wednesday Prayer Meeting at 6:30 PM', color: '#003366' },
    { icon: '🔥', text: 'Friday Fire for Fire at 6:30 PM', color: '#cc0000' },
    { icon: '⛪', text: 'Sunday First Service at 6:30 AM', color: '#006600' },
    { icon: '⛪', text: 'Sunday Second Service at 9:00 AM', color: '#006600' },
    { icon: '⛪', text: 'Sunday Third Service at 11:00 AM', color: '#006600' },
    { icon: '🎶', text: 'Choir Practice Saturday at 4:00 PM', color: '#990099' },
  ];

  return (
    <LinearGradient colors={['#e6f0ff', '#ffffff']} style={styles.background}>
      <ScrollView contentContainerStyle={styles.container}>
        <MaterialIcons name="announcement" size={80} color="#cc0000" />
        <Text style={styles.title}>Church Announcements</Text>
        <Text style={styles.subtitle}>“Let everything be done decently and in order.” — 1 Corinthians 14:40</Text>

        {announcements.map((item, index) => (
          <View key={index} style={[styles.card, { borderLeftColor: item.color }]}>
            <Text style={styles.cardIcon}>{item.icon}</Text>
            <Text style={styles.cardText}>{item.text}</Text>
          </View>
        ))}
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  container: {
    padding: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginVertical: 10,
    color: '#cc0000',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 14,
    fontStyle: 'italic',
    color: '#555',
    marginBottom: 20,
    textAlign: 'center',
  },
  card: {
    width: '100%',
    backgroundColor: '#fff',
    padding: 15,
    marginBottom: 12,
    borderRadius: 12,
    elevation: 3,
    flexDirection: 'row',
    alignItems: 'center',
    borderLeftWidth: 6,
  },
  cardIcon: {
    fontSize: 24,
    marginRight: 12,
  },
  cardText: {
    fontSize: 16,
    color: '#333',
    flexShrink: 1,
  },
});