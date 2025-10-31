// src/navigation/DrawerNavigator.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import FormsScreen from '../screens/FormsScreen';
import { Text } from '@gluestack-ui/themed';

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
      </Drawer.Navigator>
    </NavigationContainer>
  );
}
