<<<<<<< HEAD
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { GluestackUIProvider } from '@gluestack-ui/themed';
import { config } from '@gluestack-ui/config';
import DrawerNavigator from './src/navigation/DrawerNavigator';
import { enableScreens } from 'react-native-screens';

export default function App() {
  return (
    <GluestackUIProvider config={config}>
      <NavigationContainer>
        <DrawerNavigator />
      </NavigationContainer>
    </GluestackUIProvider>
=======
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import AppNavigator from "./src/navigation/AppNavigator";

export default function App() {
  return (
    <NavigationContainer>
      <AppNavigator />
    </NavigationContainer>
>>>>>>> 94f9884 (h)
  );
}
