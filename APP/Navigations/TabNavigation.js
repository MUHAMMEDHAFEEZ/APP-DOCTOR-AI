import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ChatScreen from '../Screen/ChatScreen';
import HomeScreen from '../Screen/HomeScreen';
import ProfileScreen from '../Screen/ProfileScreen';
import NfcScreen from '../Screen/NfcScreen';
import MapsScreen from '../Screen/MapsScreen'
import { AntDesign ,MaterialCommunityIcons,Ionicons,Entypo,Feather } from '@expo/vector-icons'; 
import Colors from '../Utils/Colors';
const Tab = createBottomTabNavigator();

const TabNavigation = () => {
  return (
    <Tab.Navigator screenOptions={{headerShown:false}}>
      <Tab.Screen name="Chat" component={ChatScreen}
      options={{
        tabBarIcon:({color,size})=>(
            <Ionicons name="chatbox" size={size} color="#00A859" />
        )
      }} />
      <Tab.Screen name="Home" component={HomeScreen} 
      options={{
        tabBarIcon:({color,size})=>(
            <Entypo name="home" size={size} color="#00A859" />
        )
      }}/>
      <Tab.Screen name="Profile" component={ProfileScreen}
      options={{
        tabBarIcon:({color,size})=>(
            <AntDesign name="profile" size={size} color="#00A859" />
        )
      }} />
      <Tab.Screen name="Nfc" component={NfcScreen} 
      options={{
        tabBarIcon:({color,size})=>(
            <MaterialCommunityIcons name="nfc" size={size} color="#00A859" />
        )


      }}/>
      <Tab.Screen name="MAP" component={MapsScreen} 
      options={{
        tabBarIcon:({color,size})=>(
          <Feather name="map" size={24} color="#00A859" />
        )


      }}/>
    </Tab.Navigator>
  );
};

export default TabNavigation;
