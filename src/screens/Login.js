import React, { useEffect } from 'react';
import { useState } from 'react';
import { View, Text, Pressable, StyleSheet,TextInput} from 'react-native';
import { auth } from '../firebase/config';

function Login(props) {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")

    function onSubmit(email,password){
        auth.signInWithEmailAndPassword(email, password)
            .then(res => {})
            .catch(error => {setError("Credenciales incorrectas")})
        }

        useEffect(
            () => {
                auth.onAuthStateChanged(
                    user=>{
                        if(user){
                            props.navigation.navigate("Home")
                        }
                    }
                )
            }
        ,[])
    return (
        <View style={styles.container}>
            <Text style={styles.titulo}>Login</Text>
            <TextInput style={styles.field}
                    keyboardType='email-adress'
                    placeholder='email'
                    onChangeText = {text => setEmail(text)}
                    value={email}/>
                <TextInput style={styles.field}
                    keyboardType='default'
                    placeholder='password'
                    secureTextEntry= {true}
                    onChangeText = {text => setPassword(text)}
                    value={password}/>
        <Pressable style={styles.boton} onPress={()=> onSubmit(email, password)}>
            <Text style={styles.textoBoton}>Ingresar</Text>
        </Pressable>
        <Pressable onPress={() => props.navigation.navigate('Registro')}>
            <Text style={styles.cuentaExiste}>No tengo cuenta</Text>
        </Pressable>        
        </View>
        );
    }

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: 20,
        backgroundColor: '#f0f0f0'
    },
    titulo: {
        fontSize: 28,
        fontWeight: "bold",
        marginBottom: 20,
        textAlign: "center",
    },
        field: {
        height: 20,
        paddingVertical: 15,
        paddingHorizontal: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        borderStyle: 'solid',
        borderRadius: 6,
        marginVertical: 10
    },
    boton: {
        alignItems: 'center',
            backgroundColor: '#166fc2',
            paddingHorizontal: 10,
            paddingVertical: 6,
            borderRadius: 4,
            borderWidth: 1,
            borderStyle: 'solid',
            borderColor: '#166fc2',
            marginTop: 6
    },
    textoBoton: {
        color: '#fff',
        fontSize: 16,
    },
    cuentaExiste: {
        paddingTop: 10,
        textAlign: 'center',
        color: '#166fc2',
    },
});
export default Login