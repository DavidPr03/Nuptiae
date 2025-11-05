import React from 'react';
import { GluestackUIProvider } from '@gluestack-ui/themed';
import { config } from '@gluestack-ui/config';
import DrawerNavigator from './src/navigation/DrawerNavigator';
import ProfileScreen from './src/screens/ProfileScreen';

export default function App() {
  return (
    <GluestackUIProvider config={config}>
      <DrawerNavigator />
    </GluestackUIProvider>
  );
}
