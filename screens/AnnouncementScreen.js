// AnnouncementScreen.js
import React, { useEffect, useRef, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  FlatList,
  Image,
  TouchableOpacity,
  Animated,
  Easing,
} from 'react-native';
import { collection, query, getDocs } from 'firebase/firestore';
import { db } from '../configs/firebaseconfig';
import { LinearGradient } from 'expo-linear-gradient';

const AnnouncementScreen = () => {
  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(true);

  // Animation refs
  const headerAnim = useRef(new Animated.Value(0)).current; // 0..1
  const itemAnims = useRef([]); // will hold Animated.Value for each item

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

      // prepare item animation values
      itemAnims.current = list.map(() => new Animated.Value(0));

      // run header animation + staggered item animations
      Animated.sequence([
        Animated.timing(headerAnim, {
          toValue: 1,
          duration: 450,
          easing: Easing.out(Easing.cubic),
          useNativeDriver: true,
        }),
        Animated.stagger(
          90,
          itemAnims.current.map((av) =>
            Animated.timing(av, {
              toValue: 1,
              duration: 420,
              easing: Easing.out(Easing.cubic),
              useNativeDriver: true,
            })
          )
        ),
      ]).start();
    } catch (error) {
      console.error('fetchAnnouncements error:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <LinearGradient colors={['#003366', '#336699']} style={styles.loadingBg}>
        <ActivityIndicator size="large" color="#fff" />
      </LinearGradient>
    );
  }

  const renderItem = ({ item, index }) => {
    // format date if present (item.date expected as ISO string)
    let dateText = '';
    if (item.date) {
      try {
        const d = new Date(item.date);
        dateText = d.toLocaleDateString();
      } catch (e) {
        dateText = '';
      }
    }

    const anim = itemAnims.current[index] || new Animated.Value(1); // fallback if missing
    const opacity = anim;
    const translateY = anim.interpolate({
      inputRange: [0, 1],
      outputRange: [18, 0],
    });

    return (
      <Animated.View
        style={[
          styles.card,
          {
            opacity,
            transform: [{ translateY }],
          },
        ]}
      >
        <TouchableOpacity activeOpacity={0.85}>
          <View style={styles.row}>
            {item.icon ? (
              <Image source={{ uri: item.icon }} style={styles.icon} resizeMode="cover" />
            ) : (
              <View style={styles.iconPlaceholder}>
                <Text style={styles.iconInitial}>{(item.Title || 'A').charAt(0)}</Text>
              </View>
            )}

            <View style={styles.textContainer}>
              <Text style={styles.title}>{item.Title}</Text>
              {item.body ? (
                <Text style={styles.body} numberOfLines={3}>
                  {item.body}
                </Text>
              ) : null}
              {dateText ? <Text style={styles.date}>{dateText}</Text> : null}
            </View>
          </View>
        </TouchableOpacity>
      </Animated.View>
    );
  };

  // header animated styles
  const headerOpacity = headerAnim;
  const headerTranslate = headerAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [8, 0],
  });

  return (
    <LinearGradient colors={['#003366', '#336699']} style={styles.background}>
      <Animated.View
        style={[
          styles.header,
          {
            opacity: headerOpacity,
            transform: [{ translateY: headerTranslate }],
          },
        ]}
      >
        <Text style={styles.headerTitle}>Announcements</Text>
        <Text style={styles.headerSubtitle}>Latest news and reminders from CCBC</Text>
      </Animated.View>

      <FlatList
        data={announcements}
        style={styles.list}
        contentContainerStyle={styles.listContent}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
      />
    </LinearGradient>
  );
};

export default AnnouncementScreen;

const styles = StyleSheet.create({
  background: {
    flex: 1,
    paddingTop: 18,
  },
  loadingBg: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    paddingHorizontal: 18,
    paddingBottom: 12,
    paddingTop: 6,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#fff',
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#e6f0ff',
    marginTop: 4,
  },
  list: {
    flex: 1,
  },
  listContent: {
    paddingHorizontal: 14,
    paddingBottom: 24,
    paddingTop: 6,
  },
  card: {
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 14,
    marginBottom: 12,
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.12,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  icon: {
    width: 64,
    height: 64,
    borderRadius: 10,
    marginRight: 12,
    backgroundColor: '#eef4fb',
  },
  iconPlaceholder: {
    width: 64,
    height: 64,
    borderRadius: 10,
    marginRight: 12,
    backgroundColor: '#eef4fb',
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconInitial: {
    color: '#003366',
    fontSize: 22,
    fontWeight: '700',
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: 17,
    fontWeight: '700',
    color: '#003366',
    marginBottom: 6,
  },
  body: {
    fontSize: 14,
    color: '#444',
    marginBottom: 8,
    lineHeight: 20,
  },
  date: {
    fontSize: 12,
    color: '#8a93a0',
  },
});
