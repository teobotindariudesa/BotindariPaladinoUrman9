import { useState } from 'react';
import { View, Text, Pressable, StyleSheet, TextInput } from 'react-native';
import { db, auth } from '../firebase/config';

function CrearPosteo(props) {
    const [descripcionPost, setDescripcionPost] = useState('');

    function handlePublicar() {
        db.collection('posts').add({
            email: auth.currentUser.email,
            descripcionPost: descripcionPost,
            createdAt: Date.now(),
            likes: [],
        }).then(() => {
            setDescripcionPost('');
        })
        .catch(error => console.log(error));
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Nuevo post</Text>
            <TextInput
                style={styles.input}
                placeholder="¿Qué querés compartir?"
                value={descripcionPost}
                onChangeText={setDescripcionPost}
                multiline
                numberOfLines={4}
                textAlignVertical="top"
            />
            <Pressable style={styles.button} onPress={handlePublicar}>
                <Text style={styles.buttonText}>Publicar</Text>
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        padding: 12,
        fontSize: 16,
        marginBottom: 16,
        minHeight: 100,
    },
    button: {
        backgroundColor: '#007AFF',
        paddingVertical: 14,
        borderRadius: 8,
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },
});

export default CrearPosteo;