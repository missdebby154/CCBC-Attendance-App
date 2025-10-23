import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  FlatList,
  Image,
} from 'react-native';
import { collection, query, getDocs } from 'firebase/firestore';
import { db } from '../configs/firebaseconfig';

const AnnouncementScreen = () => {
  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAnnouncements();
  }, []);

  const fetchAnnouncements = async () => {
    try {
      setLoading(true);
      const q = query(collection(db, 'Annoucements')); // Ensure this matches your Firestore collection name
      const querySnapshot = await getDocs(q);

      const list = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setAnnouncements(list);
    } catch (error) {
      console.error('fetchAnnouncements error:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <View style={styles.row}>
        {item.icon && (
          <Image
            source={{ uri: item.icon }}
            style={styles.icon}
            resizeMode="contain"
          />
        )}
        <View style={styles.textContainer}>
          <Text style={styles.title}>{item.Title}</Text>
          <Text style={styles.body}>{item.body}</Text>
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={announcements}
        style={styles.list}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default AnnouncementScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 20,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  list: {
    paddingHorizontal: 10,
  },
  card: {
    width: '100%', // full row width
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    padding: 15,
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
    elevation: 3,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  icon: {
    width: 50,
    height: 50,
    marginRight: 15,
  },
  textContainer: {
    flex: 1,
    flexShrink: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 3,
    color: '#000',
  },
  body: {
    fontSize: 14,
    color: '#333',
  },
});
