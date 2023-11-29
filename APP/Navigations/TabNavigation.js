import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ChatScreen from '../Screen/chatScreen';
import HomeScreen from '../Screen/HomeScreen';
import ProfileScreen from '../Screen/ProfileScreen';
import NfcScreen from '../Screen/NfcScreen';
import { AntDesign ,MaterialCommunityIcons,Ionicons,Entypo } from '@expo/vector-icons'; 
const Tab = createBottomTabNavigator();

const TabNavigation = () => {
  return (
    <Tab.Navigator screenOptions={{headerShown:false}}>
      <Tab.Screen name="Chat" component={ChatScreen}
      options={{
        tabBarIcon:({color,size})=>(
            <Ionicons name="chatbox" size={size} color={color} />
        )
      }} />
      <Tab.Screen name="Home" component={HomeScreen} 
      options={{
        tabBarIcon:({color,size})=>(
            <Entypo name="home" size={size} color={color} />
        )
      }}/>
      <Tab.Screen name="Profile" component={ProfileScreen}
      options={{
        tabBarIcon:({color,size})=>(
            <AntDesign name="profile" size={size} color={color} />
        )
      }} />
      <Tab.Screen name="Nfc" component={NfcScreen} 
      options={{
        tabBarIcon:({color,size})=>(
            <MaterialCommunityIcons name="nfc" size={size} color={color} />
        )


      }}/>
    </Tab.Navigator>
  );
};

export default TabNavigation;
