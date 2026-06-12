  import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import StackMenu from './StackMenu';
import Profile from '../screens/Profile';
import Usuarios from '../screens/Usuarios';
import NuevoPost from '../screens/NuevoPost';
import AntDesign from '@expo/vector-icons/AntDesign';

const Tab = createBottomTabNavigator();

const HomeMenu = () => {
  return (
    <Tab.Navigator screenOptions={{ tabBarShowLabel: false }}>
      <Tab.Screen name="HomeStack" component={StackMenu} options={{ headerShown: false, tabBarIcon: () => <AntDesign name="home" size={24} color="black" /> }} />
      <Tab.Screen name="Usuarios" component={Usuarios} options={{ tabBarIcon: () => <AntDesign name="team" size={24} color="black" /> }} />
      <Tab.Screen name="Nuevo post" component={NuevoPost} options={{ tabBarIcon: () => <AntDesign name="plus" size={24} color="black" /> }} />
      <Tab.Screen name="Profile" component={Profile} options={{ tabBarIcon: () => <AntDesign name="user" size={24} color="black" /> }} />
    </Tab.Navigator>
  );
};

export default HomeMenu;

