import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { GluestackUIProvider } from '@gluestack-ui/themed';
import { config } from '@gluestack-ui/config';
import DrawerNavigator from './src/navigation/DrawerNavigator';

export default function App() {
  return (
    <GluestackUIProvider config={config}>
      <NavigationContainer>
        <DrawerNavigator />
      </NavigationContainer>
    </GluestackUIProvider>
  );
}
