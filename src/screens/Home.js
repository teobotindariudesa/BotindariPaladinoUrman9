import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { db, auth } from '../firebase/config';
import Post from '../components/Post';

const Home = ({ navigation }) => {
  const [posteos, setPosteos] = useState([]);

  useEffect(() => {
    db.collection('posts')
      .orderBy('createdAt', 'desc')
      .onSnapshot(docs => {
        let posts = [];
        docs.forEach(doc => {
          posts.push({ id: doc.id, data: doc.data() });
        });
        setPosteos(posts);
      });
  }, []);

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
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    paddingVertical: 16,
  },
});

export default Home;