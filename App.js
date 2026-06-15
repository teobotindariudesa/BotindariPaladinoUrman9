
import React, { useState, useEffect } from 'react';
import { View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { auth } from './src/firebase/config';
import Registro from './src/screens/Registro';
import Login from './src/screens/Login';
import HomeMenu from './src/components/HomeMenu';

const Stack = createNativeStackNavigator();

function AuthStack() {
  
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
      {user ? <HomeMenu /> : <AuthStack />}
    </NavigationContainer>
  );
}
