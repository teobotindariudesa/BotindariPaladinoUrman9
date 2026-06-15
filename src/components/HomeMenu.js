import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import StackMenu from './StackMenu';
import Perfil from '../screens/Perfil';
import CrearPosteo from '../screens/CrearPosteo';
import { AntDesign } from '@expo/vector-icons';
const Tab = createBottomTabNavigator();

const HomeMenu = () => {
  return (
    <Tab.Navigator screenOptions={{ tabBarShowLabel: false }}>
      <Tab.Screen name="Home" component={StackMenu} options={{ headerShown: false, tabBarIcon: () => <AntDesign name="home" size={24} color="black" /> }} />
      <Tab.Screen name="Nuevo post" component={CrearPosteo} options={{ tabBarIcon: () => <AntDesign name="plus" size={24} color="black" /> }} />
      <Tab.Screen name="Perfil" component={Perfil} options={{ tabBarIcon: () => <AntDesign name="user" size={24} color="black" /> }} />
    </Tab.Navigator>
  );
};

export default HomeMenu;

