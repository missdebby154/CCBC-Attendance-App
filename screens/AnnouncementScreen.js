import { StyleSheet, Text, View, ActivityIndicator, FlatList, Image } from 'react-native';
import { collection, query, getDocs } from 'firebase/firestore';
import { db } from '../configs/firebaseconfig';
import { useEffect, useState } from 'react';
import React from 'react';

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

      const list = querySnapshot.docs.map((doc) => {
        const data = doc.data();
        return { id: doc.id, ...data };
      });

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
      {item.icon && (
        <Image source={{ uri: item.icon }} style={styles.icon} resizeMode="contain" />
      )}
      <Text style={styles.title}>{item.Title}</Text>
      <Text style={styles.body}>{item.body}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={announcements}
        horizontal={false}
        style={styles.list}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
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
    width: 250,
    marginRight: 15,
    padding: 15,
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
    elevation: 3,
  },
  icon: {
    width: 50,
    height: 50,
    marginBottom: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  body: {
    fontSize: 14,
    color: '#333',
  },
});