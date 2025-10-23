// Profile/Settings.js  (UI-only — functionality intentionally left as TODOs)
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Switch,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons, MaterialIcons, Feather } from '@expo/vector-icons';

export default function Settings() {
  return (
    <LinearGradient colors={['#003366', '#336699']} style={styles.background}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.header}>Settings</Text>

        {/* Preferences Card */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Preferences</Text>

          <View style={styles.row}>
            <View style={styles.rowText}>
              <Text style={styles.rowTitle}>Notifications</Text>
              <Text style={styles.rowSubtitle}>Choose which alerts you receive</Text>
            </View>
            {/* UI switch only — implement toggle logic later */}
            <Switch value={true} onValueChange={() => { /* TODO: toggle master notifications */ }} />
          </View>

          <View style={styles.row}>
            <View style={styles.rowText}>
              <Text style={styles.rowTitle}>Language</Text>
              <Text style={styles.rowSubtitle}>Select app language</Text>
            </View>

            <View style={styles.langButtons}>
              {/* UI chips only — implement selection logic later */}
              <TouchableOpacity style={[styles.smallChip, styles.smallChipActive]}>
                <Text style={[styles.chipText, styles.chipTextActive]}>EN</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.smallChip}>
                <Text style={styles.chipText}>TW</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.row}>
            <View style={styles.rowText}>
              <Text style={styles.rowTitle}>Appearance</Text>
              <Text style={styles.rowSubtitle}>Light / Dark / System</Text>
            </View>

            <View style={{ flexDirection: 'row' }}>
              <TouchableOpacity style={[styles.smallChip] } onPress={() => { /* TODO: set Light */ }}>
                <Text style={styles.chipText}>Light</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.smallChip, styles.smallChipActive, { marginLeft: 8 }]} onPress={() => { /* TODO: set Dark */ }}>
                <Text style={[styles.chipText, styles.chipTextActive]}>Dark</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Data & Backup Card */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Data & Backup</Text>

          <TouchableOpacity style={styles.option} onPress={() => { /* TODO: export user data as JSON */ }}>
            <Feather name="download-cloud" size={20} color="#003366" />
            <Text style={styles.optionText}>Export my data</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.option} onPress={() => { /* TODO: backup to cloud (Google Drive) */ }}>
            <Feather name="upload-cloud" size={20} color="#003366" />
            <Text style={styles.optionText}>Backup to Cloud</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.option, styles.lastOption]} onPress={() => { /* TODO: restore from backup */ }}>
            <Feather name="refresh-ccw" size={20} color="#003366" />
            <Text style={styles.optionText}>Restore from Backup</Text>
          </TouchableOpacity>
        </View>

        {/* Notification Preferences Card */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Notification Preferences</Text>

          <View style={styles.row}>
            <View style={styles.rowText}>
              <Text style={styles.rowTitle}>Announcements</Text>
              <Text style={styles.rowSubtitle}>Receive church announcements</Text>
            </View>
            <Switch value={true} onValueChange={() => { /* TODO */ }} />
          </View>

          <View style={styles.row}>
            <View style={styles.rowText}>
              <Text style={styles.rowTitle}>Attendance Reminders</Text>
              <Text style={styles.rowSubtitle}>Remind me before meetings</Text>
            </View>
            <Switch value={false} onValueChange={() => { /* TODO */ }} />
          </View>

          <View style={[styles.row, { marginBottom: 0 }]}>
            <View style={styles.rowText}>
              <Text style={styles.rowTitle}>Program Reminders</Text>
              <Text style={styles.rowSubtitle}>Events, programs and special services</Text>
            </View>
            <Switch value={true} onValueChange={() => { /* TODO */ }} />
          </View>
        </View>

        {/* Accessibility & Legal Card */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Accessibility & Legal</Text>

          <TouchableOpacity style={styles.option} onPress={() => { /* TODO: accessibility options */ }}>
            <Ionicons name="accessibility-outline" size={22} color="#003366" />
            <Text style={styles.optionText}>Accessibility</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.option} onPress={() => { /* TODO: open Privacy screen */ }}>
            <MaterialIcons name="privacy-tip" size={22} color="#003366" />
            <Text style={styles.optionText}>Privacy Policy</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.option, styles.lastOption]} onPress={() => { /* TODO: open About screen */ }}>
            <Ionicons name="information-circle-outline" size={22} color="#003366" />
            <Text style={styles.optionText}>About CCBC App</Text>
          </TouchableOpacity>
        </View>

        {/* Account Card */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Account</Text>

          {/* UI-only change password placeholder */}
          <TouchableOpacity style={styles.option} onPress={() => { /* TODO: navigate to ChangePassword */ }}>
            <Ionicons name="key-outline" size={22} color="#003366" />
            <Text style={styles.optionText}>Change Password</Text>
          </TouchableOpacity>

          {/* Delete account (UI-only) */}
          <TouchableOpacity style={[styles.option, styles.dangerOption]} onPress={() => { /* TODO: delete account flow */ }}>
            <MaterialIcons name="delete-outline" size={22} color="#cc0000" />
            <Text style={[styles.optionText, { color: '#cc0000' }]}>Delete Account</Text>
          </TouchableOpacity>

          {/* Sign out UI-only */}
          <TouchableOpacity
            style={[styles.signOutButton]}
            onPress={() => { /* TODO: sign out user and reset navigation */ }}
          >
            <Text style={styles.signOutText}>Sign Out</Text>
          </TouchableOpacity>
        </View>

        {/* Developer footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>Developed by Deborah Apobona</Text>
        </View>
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  background: { flex: 1 },
  container: {
    padding: 20,
    paddingBottom: 40,
  },
  header: {
    color: '#fff',
    fontSize: 26,
    fontWeight: '700',
    marginBottom: 12,
    textAlign: 'center',
  },

  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 14,
    marginBottom: 14,
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 2 },
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#003366',
    marginBottom: 10,
  },

  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  rowText: {
    flex: 1,
    paddingRight: 12,
  },
  rowTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#222',
  },
  rowSubtitle: {
    fontSize: 13,
    color: '#666',
    marginTop: 2,
  },

  langButtons: { flexDirection: 'row', alignItems: 'center' },
  smallChip: {
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#cbd6e6',
    paddingVertical: 6,
    paddingHorizontal: 10,
    marginLeft: 6,
    backgroundColor: '#fff',
  },
  smallChipActive: {
    backgroundColor: '#003366',
    borderColor: '#003366',
  },
  chipText: { color: '#003366', fontWeight: '700' },
  chipTextActive: { color: '#fff' },

  option: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderColor: '#eee',
  },
  lastOption: { borderBottomWidth: 0 },
  optionText: {
    marginLeft: 12,
    fontSize: 15,
    color: '#003366',
    fontWeight: '600',
  },

  dangerOption: {
    borderTopWidth: 8,
    borderTopColor: 'transparent',
  },

  signOutButton: {
    backgroundColor: '#cc0000',
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 12,
  },
  signOutText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 16,
  },

  footer: {
    marginTop: 8,
    paddingVertical: 12,
    alignItems: 'center',
  },
  footerText: {
    color: '#fff',
    fontSize: 13,
    fontStyle: 'italic',
  },
});
