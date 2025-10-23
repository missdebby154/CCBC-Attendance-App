// ReportScreen.js
import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  FlatList,
} from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import * as Animatable from 'react-native-animatable';
import { auth, db } from '../configs/firebaseconfig';
import { collection, query, where, orderBy, getDocs } from 'firebase/firestore';

export default function ReportScreen() {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRecords();
  }, []);

  const fetchRecords = async () => {
    try {
      setLoading(true);
      const user = auth.currentUser;
      if (!user) {
        setRecords([]);
        setLoading(false);
        return;
      }

      const q = query(
        collection(db, 'attendance'),
        where('uid', '==', user.uid),
        orderBy('createdAt', 'desc')
      );

      const snap = await getDocs(q);
      const list = snap.docs.map((d) => {
        const data = d.data();
        return {
          id: d.id,
          date: data.date || '',
          time: data.time || '',
          service: data.service || '',
          status: data.status || '',
        };
      });

      setRecords(list);
    } catch (err) {
      console.error('fetchRecords error', err);
      setRecords([]);
    } finally {
      setLoading(false);
    }
  };

  const renderRecord = ({ item, index }) => (
    <Animatable.View
      animation="fadeInUp"
      delay={index * 100}
      duration={500}
      style={styles.card}
    >
      <View style={styles.cardTop}>
        <View style={styles.dateTimeContainer}>
          <View style={styles.row}>
            <Ionicons name="calendar" size={16} color="#003366" />
            <Text style={styles.date}>{item.date}</Text>
          </View>
          <View style={styles.row}>
            <MaterialIcons name="access-time" size={16} color="#003366" />
            <Text style={styles.time}>{item.time}</Text>
          </View>
        </View>

        <View
          style={[
            styles.statusBadge,
            item.status === 'Present' ? styles.present : styles.absent,
          ]}
        >
          <Text style={styles.statusText}>{item.status}</Text>
        </View>
      </View>
      <Text style={styles.service}>{item.service}</Text>
    </Animatable.View>
  );

  const Header = () => (
    <Animatable.View animation="fadeInDown" duration={800}>
      <LinearGradient
        colors={['#003366', '#990000']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.header}
      >
        <Ionicons name="stats-chart" size={60} color="#fff" />
        <Text style={styles.headerText}>Attendance Report</Text>
      </LinearGradient>
    </Animatable.View>
  );

  if (loading) {
    return (
      <LinearGradient colors={['#003366', '#990000']} style={styles.loadingBg}>
        <ActivityIndicator size="large" color="#fff" />
      </LinearGradient>
    );
  }

  return (
    <FlatList
      data={records}
      keyExtractor={(i) => i.id}
      renderItem={renderRecord}
      contentContainerStyle={
        records.length
          ? styles.container
          : [styles.container, { flex: 1, justifyContent: 'center' }]
      }
      ListHeaderComponent={<Header />}
      ListEmptyComponent={
        <View style={styles.empty}>
          <Text style={styles.emptyText}>No attendance records yet.</Text>
        </View>
      }
    />
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#f2f2f2',
    paddingBottom: 40,
  },
  loadingBg: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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
  dateTimeContainer: {
    justifyContent: 'center',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 2,
  },
  date: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#003366',
    marginLeft: 4,
  },
  time: {
    fontSize: 14,
    color: '#003366',
    marginLeft: 4,
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
  present: { backgroundColor: '#28a745' },
  absent: { backgroundColor: '#dc3545' },

  empty: {
    paddingTop: 40,
    alignItems: 'center',
  },
  emptyText: {
    color: '#666',
    fontSize: 15,
  },
});
