import React from 'react';
import { useState} from 'react';
import { View, Text, Pressable, StyleSheet, TextInput} from 'react-native';

function Registro(props) {
    const [email, setEmail] = useState()
    const [username, setUserName] = useState()
    const [password, setPassword] = useState()
    const [error, setError] = useState()

    function onSubmit(email,username,password){
        console.log(email,username,password)
        props.navigation.navigate('Login')
    }

    return (
        <View style={styles.container}>
        <Text style={styles.title}>Registro</Text>
        <TextInput style={styles.field}
                keyboardType='email-adress'
                placeholder='Ingrese su mail'
                onChangeText = {text => setEmail(text)}
                value={email}/>
        <TextInput style={styles.field}
                keyboardType='default'
                placeholder='Ingrese su usuario'
                onChangeText = {text => setUserName(text)}
                value={username}/>
        <TextInput style={styles.field}
                keyboardType='default'
                placeholder='Ingrese su contraseña'
                secureTextEntry= {true}
                onChangeText = {text => setPassword(text)}
                value={password}/>
        <Pressable style={styles.registrarme} onPress={() => {onSubmit(email, username, password); props.navigation.navigate('Login')}}>
            <Text style={styles.buttonText}>Registrate</Text>
        </Pressable>
        <Pressable style={styles.cuentaExiste} onPress={() => {props.navigation.navigate('Login')}}>
            <Text style={styles.cuentaExiste}>Ya tengo cuenta</Text>
        </Pressable>
        </View>
    );
    }

    const styles = StyleSheet.create({
    container: {
        flex: 1,        
        justifyContent: "center",
        paddingHorizontal: 20,
        },
    title: { 
        fontSize: 28, 
        fontWeight  : "bold", 
        marginBottom: 20, 
        textAlign: "center"},
    field: {height: 20,
        paddingVertical: 15,
        paddingHorizontal: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        borderStyle: 'solid',
        borderRadius: 6,
        marginVertical: 10,
    },
    registrarme: {
        alignItems: "center",
        backgroundColor: '#166fc2',
        paddingHorizontal: 10,
        paddingVertical: 6,
        textAlign: 'center',
        borderRadius: 4,
        borderWidth: 1,
        borderStyle: 'solid',
        borderColor: '#166fc2',
    },
    buttonText: {
        color: '#fff'},
    cuentaExiste: {
        paddingTop: 5,
        alignItems: "center"
    }
    });

export default Registro