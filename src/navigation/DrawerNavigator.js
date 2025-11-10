import React from 'react';
import { View, Text } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

import FormsScreen from '../screens/FormsScreen';
import ProfileScreen from '../screens/ProfileScreen';
import DisplayScreen from '../screens/DisplayScreen';
import SettingsScreen from '../screens/SettingsScreen';


const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();

// 🧩 Pantalla temporal para placeholders
function PlaceholderScreen({ route }) {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ fontSize: 20, fontWeight: 'bold' }}>
        {route.name} (en construcción)
      </Text>
    </View>
  );
}

// 🧭 Bottom Tabs
function BottomTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: { height: 70 },
        tabBarIcon: ({ color, size, focused }) => {
          let iconName;

          if (route.name === 'Home') iconName = focused ? 'home' : 'home-outline';
          else if (route.name === 'Forms') iconName = focused ? 'albums' : 'albums-outline';
          else if (route.name === 'Display') iconName = focused ? 'cash' : 'cash-outline';
          else if (route.name === 'Profile') iconName = focused ? 'people' : 'people-outline';

          return <Ionicons name={iconName} size={28} color={focused ? '#e57373' : '#757575'} />;
        },
      })}
    >
      <Tab.Screen name="Home" component={FormsScreen} />
      <Tab.Screen name="Forms" component={FormsScreen} />
      <Tab.Screen name="Display" component={DisplayScreen} />
      <Tab.Screen name="Profile" component={SettingsScreen} />
    </Tab.Navigator>
  );
}

// 🧭 Drawer principal
export default function DrawerNavigator() {
  return (
    <Drawer.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: '#8e0909b5' },
        headerTintColor: '#fff',
        headerTitleStyle: { fontWeight: 'bold', fontSize: 18 },
        headerTitleAlign: 'left',
        headerTitle: 'Tadeo David Prieto Delgado',
        drawerActiveTintColor: '#680b0bff',
        drawerLabelStyle: { fontSize: 16, fontWeight: '500' },
      }}
    >
      <Drawer.Screen name="Principal" component={BottomTabs} />
      <Drawer.Screen name="Invitados" component={PlaceholderScreen} />
      <Drawer.Screen name="Promos" component={PlaceholderScreen} />
      <Drawer.Screen name="Provedores" component={PlaceholderScreen} />
      <Drawer.Screen name="Comunidad" component={PlaceholderScreen} />
      <Drawer.Screen name="Ayuda" component={PlaceholderScreen} />
    </Drawer.Navigator>
  );
}
