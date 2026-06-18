
import React, { useState, useEffect } from 'react';
import { View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { auth } from './src/firebase/config';
import Registro from './src/screens/Registro';
import Login from './src/screens/Login';
import HomeMenu from './src/components/HomeMenu';

const Stack = createNativeStackNavigator();

function AutStack() {
  
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen 
          name="Login" 
          component={Login} />
      <Stack.Screen 
          name="Registro" 
          component={Registro} />
    </Stack.Navigator>
  );
}

export default function App() {
  const [user, setUser] = useState(undefined);

  useEffect(() => {
    return auth.onAuthStateChanged(u => setUser(u));
  }, []);

  return (
    <NavigationContainer>
      {user ? <HomeMenu /> : <AutStack />}
    </NavigationContainer>
  );
}




// EXPLICACION DE LA NAVEGCACION 
// El App.js es el punto de partida en el cual hay una funcion con un Stack con el Login y Registro. Tambien tiene una funcion que evalua si hay un usuario logueado o no. 

// Si no hay usuario logueado se muestra la funcion AuthStack que tiene el stack con Login y Registro.

// Si si hay un usuario pasa al HomeMenu el cual es una navegacion del tipo Tab. 
// Dentro del HomeMenu, esta Home, Agregar posteo (Te lleva a crearPosteo.js) y Perfil (te lleva a Perfil.js).
// En el caso de Home te lleva a un stack en el cual esta el Home y el ComentarPosteo.
