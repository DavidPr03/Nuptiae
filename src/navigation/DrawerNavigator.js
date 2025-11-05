import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import FormsScreen from '../screens/FormsScreen';
import ProfileScreen from '../screens/ProfileScreen';

const Drawer = createDrawerNavigator();

export default function DrawerNavigator() {
  return (
    <NavigationContainer>
      <Drawer.Navigator
        screenOptions={{
          headerStyle: { backgroundColor: '#8e0909b5' },
          headerTintColor: '#fff',
          headerTitle: 'Tadeo David Prieto Delgado',
        }}
      >
        <Drawer.Screen
          name="Forms"
          component={FormsScreen}
          options={{ drawerLabel: 'Forms' }}
        />
        <Drawer.Screen
          name="Profile"
          component={ProfileScreen}
          options={{ drawerLabel: 'Perfil' }}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}
