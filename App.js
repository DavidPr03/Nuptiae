import React from 'react';
import { GluestackUIProvider } from '@gluestack-ui/themed';
import { config } from '@gluestack-ui/config';
import DrawerNavigator from './src/navigation/DrawerNavigator';

export default function App() {
  return (
    <GluestackUIProvider config={config}>
      <DrawerNavigator />
    </GluestackUIProvider>
  );
}
