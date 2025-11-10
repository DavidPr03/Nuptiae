import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

import HomeScreen from '../screens/HomeScreen';
import ProfileStack from './ProfileStack'; // Stack de Profile + Settings

const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();

// Componente interno para pantallas temporales
function PlaceholderScreen({ route }) {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ fontSize: 20, fontWeight: 'bold' }}>
        {route.name} (en construcción)
      </Text>
    </View>
  );
}

// Bottom Tabs
function BottomTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route, navigation }) => ({
        headerLeft: () => (
          <TouchableOpacity
            onPress={() => navigation.openDrawer()}
            style={{ marginLeft: 15 }}
          >
            <Ionicons name="menu" size={28} color="#000" />
          </TouchableOpacity>
        ),
        headerTitle: '', // elimina el título
        tabBarShowLabel: false,
        tabBarStyle: { height: 70 },
        tabBarIcon: ({ focused }) => {
          let iconName;
          if (route.name === 'Home') iconName = focused ? 'home' : 'home-outline';
          else if (route.name === 'Agenda') iconName = focused ? 'calendar' : 'calendar-outline';
          else if (route.name === 'Presupuesto') iconName = focused ? 'cash' : 'cash-outline';
          else if (route.name === 'Profile') iconName = focused ? 'people' : 'people-outline';

          return <Ionicons name={iconName} size={28} color={focused ? '#e57373' : '#757575'} />;
        },
      })}
    >
      <Tab.Screen name="Home" component={PlaceholderScreen} />
      <Tab.Screen name="Agenda" component={PlaceholderScreen} />
      <Tab.Screen name="Presupuesto" component={PlaceholderScreen} />
      <Tab.Screen name="Profile" component={ProfileStack} />
    </Tab.Navigator>
  );
}

// Drawer principal
export default function DrawerNavigator() {
  return (
    <Drawer.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: '#8e0909b5' },
        headerTintColor: '#fff',
        drawerActiveTintColor: '#680b0bff',
        drawerLabelStyle: { fontSize: 16, fontWeight: '500' },
      }}
    >
      <Drawer.Screen name="Principal" component={BottomTabs} />
      <Drawer.Screen name="Invitados" component={PlaceholderScreen} />
      <Drawer.Screen name="Promos" component={PlaceholderScreen} />
      <Drawer.Screen name="Proveedores" component={PlaceholderScreen} />
      <Drawer.Screen name="Comunidad" component={PlaceholderScreen} />
      <Drawer.Screen name="Ayuda" component={PlaceholderScreen} />
    </Drawer.Navigator>
  );
}
