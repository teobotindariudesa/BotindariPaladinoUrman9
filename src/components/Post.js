import React from 'react';
import { View, Text, Image, Pressable, StyleSheet } from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';
import firebase from 'firebase/app';
import { db, auth } from '../firebase/config';

const Post = ({ data, id, navigation }) => {
  const likes = data.likes || [];
  const emailUsuario = auth.currentUser?.email;
  const likeo = likes.includes(emailUsuario);

  const likear = () => {
    db.collection('posts')
      .doc(id)
      .update({ likes: firebase.firestore.FieldValue.arrayUnion(emailUsuario) });
  };

  const unLikear = () => {
    db.collection('posts')
      .doc(id)
      .update({ likes: firebase.firestore.FieldValue.arrayRemove(emailUsuario) });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.username}>{data.username || data.email}</Text>
      <Text style={styles.descripcion}>{data.description}</Text>
      {data.imageUri ? (
        <Image source={{ uri: data.imageUri }} style={styles.imagen} resizeMode="cover" />
      ) : null}
      <View style={styles.acciones}>
        <Pressable style={styles.botonAccion} onPress={likeo ? unLikear : likear}>
          <AntDesign name={likeo ? 'like1' : 'like2'} size={20} color={likeo ? '#166fc2' : 'black'} />
          <Text style={styles.botonTexto}>{likes.length}</Text>
        </Pressable>
        <Pressable style={styles.botonAccion} onPress={() => navigation.navigate('ComentarPosteo', { postId: id })}>
          <AntDesign name="message1" size={20} color="black" />
          <Text style={styles.botonTexto}>Comentar</Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#ccc',
    marginVertical: 8,
    marginHorizontal: 16,
    padding: 12,
  },
  username: {
    fontWeight: 'bold',
    marginBottom: 6,
  },
  descripcion: {
    marginBottom: 10,
  },
  imagen: {
    width: '100%',
    height: 200,
    borderRadius: 6,
    marginBottom: 10,
  },
  acciones: {
    flexDirection: 'row',
    gap: 16,
  },
  botonAccion: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  botonTexto: {
    fontSize: 14,
  },
});

export default Post;
