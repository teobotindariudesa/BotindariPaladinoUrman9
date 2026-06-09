import React, { useState } from 'react';
import { View, Text, Pressable, StyleSheet, TextInput } from 'react-native';
import { auth, db } from '../firebase/config';

function Registro(props) {
    const [email, setEmail] = useState('');
    const [username, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const validar = () => {
        if (!email) return 'El email es obligatorio';
        if (!email.includes('@') || !email.includes('.')) return 'El email no tiene un formato válido';
        if (!username) return 'El nombre de usuario es obligatorio';
        if (username.length < 3) return 'El nombre de usuario debe tener al menos 3 caracteres';
        if (!password) return 'La contraseña es obligatoria';
        if (password.length < 6) return 'La contraseña debe tener al menos 6 caracteres';
        return null;
    };

    const onSubmit = () => {
        setError('');

        const mensajeError = validar();
        if (mensajeError) {
            setError(mensajeError);
            return;
        }

        auth.createUserWithEmailAndPassword(email, password)
            .then((userCredential) => {
                return db.collection('users').doc(userCredential.user.uid).set({
                    email: email,
                    username: username,
                });
            })
            .then(() => {
                props.navigation.navigate('Login');
            })
            .catch((e) => {
                setError(e.message);
            });
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Registro</Text>
            <TextInput
                style={styles.field}
                keyboardType='email-address'
                placeholder='Ingrese su mail'
                onChangeText={text => setEmail(text)}
                value={email}
                autoCapitalize='none'
            />
            <TextInput
                style={styles.field}
                keyboardType='default'
                placeholder='Ingrese su usuario'
                onChangeText={text => setUserName(text)}
                value={username}
            />
            <TextInput
                style={styles.field}
                keyboardType='default'
                placeholder='Ingrese su contraseña'
                secureTextEntry={true}
                onChangeText={text => setPassword(text)}
                value={password}
            />
            {error ? <Text style={styles.error}>{error}</Text> : null}
            <Pressable style={styles.registrarme} onPress={onSubmit}>
                <Text style={styles.buttonText}>Registrate</Text>
            </Pressable>
            <Pressable onPress={() => props.navigation.navigate('Login')}>
                <Text style={styles.cuentaExiste}>Ya tengo cuenta</Text>
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: 20,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
    field: {
        height: 20,
        paddingVertical: 15,
        paddingHorizontal: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        borderStyle: 'solid',
        borderRadius: 6,
        marginVertical: 10,
    },
    error: {
        color: 'red',
        marginVertical: 6,
        textAlign: 'center',
    },
    registrarme: {
        alignItems: 'center',
        backgroundColor: '#166fc2',
        paddingHorizontal: 10,
        paddingVertical: 6,
        borderRadius: 4,
        borderWidth: 1,
        borderStyle: 'solid',
        borderColor: '#166fc2',
        marginTop: 6,
    },
    buttonText: {
        color: '#fff',
    },
    cuentaExiste: {
        paddingTop: 10,
        textAlign: 'center',
        color: '#166fc2',
    },
});

export default Registro;
