import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Pressable, FlatList } from 'react-native';
import { auth, db } from '../firebase/config';

function Perfil() {
    const user = auth.currentUser;
    const [username, setUsername] = useState('');
    const [posteos, setPosteos] = useState([]);

    useEffect(() => {
        db.collection('users').doc(user.uid).get().then(doc => {
            if (doc.exists) setUsername(doc.data().username);
        });

        const unsubscribe = db.collection('posts')
            .where('email', '==', user.email)
            .orderBy('createdAt', 'desc')
            .onSnapshot(snap => {
                const data = [];
                snap.forEach(doc => data.push({ id: doc.id, ...doc.data() }));
                setPosteos(data);
            });
        return () => unsubscribe();
    }, []);

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>Perfil</Text>
                {username ? <Text style={styles.username}>{username}</Text> : null}
                {user && <Text style={styles.email}>{user.email}</Text>}
                <Pressable style={styles.button} onPress={() => auth.signOut()}>
                    <Text style={styles.buttonText}>Cerrar sesión</Text>
                </Pressable>
            </View>
            <Text style={styles.sectionTitle}>Mis posteos</Text>
            <FlatList
                data={posteos}
                keyExtractor={item => item.id}
                renderItem={({ item }) => (
                    <View style={styles.post}>
                        <Text style={styles.postTexto}>{item.descripcionPost}</Text>
                        <Text style={styles.postMeta}>{item.likes?.length || 0} likes</Text>
                    </View>
                )}
                ListEmptyComponent={<Text style={styles.vacio}>No publicaste nada aún</Text>}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    header: {
        alignItems: 'center',
        padding: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    username: {
        fontSize: 18,
        fontWeight: '600',
        marginBottom: 4,
    },
    email: {
        fontSize: 14,
        color: '#555',
        marginBottom: 16,
    },
    button: {
        backgroundColor: '#cc0000',
        paddingVertical: 10,
        paddingHorizontal: 28,
        borderRadius: 8,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        paddingHorizontal: 16,
        paddingVertical: 10,
    },
    post: {
        padding: 12,
        marginHorizontal: 16,
        marginBottom: 8,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 6,
    },
    postTexto: {
        fontSize: 14,
        marginBottom: 4,
    },
    postMeta: {
        fontSize: 12,
        color: '#888',
    },
    vacio: {
        textAlign: 'center',
        marginTop: 24,
        color: '#999',
    },
});

export default Perfil;
