import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator } from 'react-native';
import { db, auth } from '../firebase/config';
import Post from '../components/Post';

const Home = ({ navigation }) => {
  const [posteos, setPosteos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!auth.currentUser) {
      navigation.replace('Login');
      return;
    }

    const unsubscribe = db.collection('posts')
      .orderBy('createdAt', 'desc')
      .onSnapshot(docs => {
        let posts = [];
        docs.forEach(doc => {
          posts.push({ id: doc.id, data: doc.data() });
        });
        setPosteos(posts);
        setLoading(false);
      });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Home</Text>
      <FlatList
        data={posteos}
        keyExtractor={item => item.id}
        renderItem={({ item }) => <Post data={item.data} id={item.id} navigation={navigation} />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  centered: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    paddingVertical: 16,
  },
});

export default Home;