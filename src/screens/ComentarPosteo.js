
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Pressable, FlatList, StyleSheet } from 'react-native';
import { db, auth } from '../firebase/config';

function ComentarPosteo({ route }) {
    const { postId } = route.params;
    const [comentarios, setComentarios] = useState([]);
    const [texto, setTexto] = useState('');

    useEffect(() => {
        const comentarioss = db.collection('posts').doc(postId)
            .collection('comentarios')
            .orderBy('createdAt', 'asc')
            .onSnapshot(snap => {
                const data = [];
                snap.forEach(doc => {
                    const info = doc.data();
                    data.push({ id: doc.id, texto: info.texto, email: info.email, createdAt: info.createdAt });
                });
                setComentarios(data);
            });
        return () => comentarioss();
    }, [postId]);

    const publicar = () => {
        if (texto === '') return;
        db.collection('posts')
        .doc(postId)
        .collection('comentarios')
        .add({
            texto: texto,
            email: auth.currentUser.email,
            createdAt: Date.now(),
        }).then(() => setTexto(''));
    };

    return (
        <View style={styles.container}>
            {comentarios.length === 0
                ? <Text style={styles.vacio}>Sin comentarios aún</Text>
                : <FlatList
                    data={comentarios}
                    keyExtractor={item => item.id}
                    renderItem={({ item }) => (
                        <View style={styles.comentario}>
                            <Text style={styles.email}>{item.email}</Text>
                            <Text>{item.texto}</Text>
                        </View>
                    )}
                />
            }
            <View style={styles.inputRow}>
                <TextInput
                    style={styles.input}
                    placeholder="Escribí un comentario..."
                    value={texto}
                    onChangeText={setTexto}
                />
                <Pressable style={styles.button} onPress={publicar}>
                    <Text style={styles.buttonText}>Enviar</Text>
                </Pressable>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    comentario: {
        padding: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    email: {
        fontWeight: 'bold',
        marginBottom: 4,
        fontSize: 12,
        color: '#555',
    },
    vacio: {
        textAlign: 'center',
        marginTop: 40,
        color: '#999',
    },
    inputRow: {
        flexDirection: 'row',
        padding: 12,
        borderTopWidth: 1,
        borderTopColor: '#eee',
        gap: 8,
    },
    input: {
        flex: 1,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        paddingHorizontal: 12,
        paddingVertical: 8,
        fontSize: 14,
    },
    button: {
        backgroundColor: '#007AFF',
        paddingHorizontal: 16,
        borderRadius: 8,
        justifyContent: 'center',
    },
    buttonText: {
        color: '#fff',
        fontWeight: '600',
    },
});

export default ComentarPosteo;