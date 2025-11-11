import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

import HomeScreen from '../screens/HomeScreen';
import AgendaScreen from '../screens/AgendaScreen';
import AddTareaScreen from '../screens/AddTareaScreen';
import ProfileStack from './ProfileStack';
import InvitadosScreen from '../screens/InvitadosScreen';
import AddInvitadoScreen from '../screens/AddInvitadoScreen';
import AddItinerarioScreen from '../screens/AddItinerarioScreen';

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
      screenOptions={({ route }) => ({
        headerTitle: '',
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
      <Tab.Screen name="Agenda" component={AgendaScreen} />
      <Tab.Screen name="Presupuesto" component={PlaceholderScreen} />
      <Tab.Screen name="Profile" component={ProfileStack} />
    </Tab.Navigator>
  );
}

// Custom drawer content
function CustomDrawerContent(props) {
  const { navigation } = props;
  return (
    <DrawerContentScrollView {...props} contentContainerStyle={{ flex: 1 }}>
      <View style={styles.header}>
        <Text style={styles.title}>Nuptiae</Text>
      </View>

      <DrawerItem
        label="Invitados"
        icon={({ color, size }) => (
          <Ionicons name="person-add-outline" size={28} color="#000" />
        )}
        labelStyle={styles.drawerLabel}
        onPress={() => navigation.navigate('Invitados')}
      />

      <DrawerItem
        label="Promos"
        icon={({ color, size }) => (
          <Ionicons name="pricetag-outline" size={28} color="#000" />
        )}
        labelStyle={styles.drawerLabel}
        onPress={() => navigation.navigate('Promos')}
      />

      <DrawerItem
        label="Proveedores"
        icon={({ color, size }) => (
          <Ionicons name="briefcase-outline" size={28} color="#000" />
        )}
        labelStyle={styles.drawerLabel}
        onPress={() => navigation.navigate('Proveedores')}
      />

      <DrawerItem
        label="Comunidad"
        icon={({ color, size }) => (
          <Ionicons name="people-outline" size={28} color="#000" />
        )}
        labelStyle={styles.drawerLabel}
        onPress={() => navigation.navigate('Comunidad')}
      />

      <DrawerItem
        label="Ayuda"
        icon={({ color, size }) => (
          <Ionicons name="help-circle-outline" size={28} color="#000" />
        )}
        labelStyle={styles.drawerLabel}
        onPress={() => navigation.navigate('Ayuda')}
      />
    </DrawerContentScrollView>
  );
}

// Drawer principal
export default function DrawerNavigator() {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={{
        headerStyle: { backgroundColor: '#8e0909b5' },
        headerTintColor: '#fff',
        drawerActiveTintColor: '#680b0bff',
        drawerLabelStyle: { fontSize: 16, fontWeight: '500' },
        
      }}
    >
      <Drawer.Screen name="Principal" component={BottomTabs} />
      {/* Ruta oculta para agregar tarea (navegable desde TareasScreen) */}
      <Drawer.Screen
        name="AddTarea"
        component={AddTareaScreen}
        options={{
          // esconder del drawer
          drawerItemStyle: { height: 0 },
          title: '',
          headerShown: false,
        }}
      />
      <Drawer.Screen name="Invitados" component={InvitadosScreen} />
      
      {/* AddInvitado y AddItinerario ocultas (como AddTarea) */}
      <Drawer.Screen
        name="AddInvitado"
        component={AddInvitadoScreen}
        options={{
          drawerItemStyle: { height: 0 },
          title: '',
          headerShown: false,
        }}
      />
      
      <Drawer.Screen
        name="AddItinerario"
        component={AddItinerarioScreen}
        options={{
          drawerItemStyle: { height: 0 },
          title: '',
          headerShown: false,
        }}
      />

      <Drawer.Screen name="Promos" component={PlaceholderScreen} />
      <Drawer.Screen name="Proveedores" component={PlaceholderScreen} />
      <Drawer.Screen name="Comunidad" component={PlaceholderScreen} />
      <Drawer.Screen name="Ayuda" component={PlaceholderScreen} />
    </Drawer.Navigator>
  );
}

const styles = StyleSheet.create({
  header: { padding: 20, borderBottomWidth: 1, borderBottomColor: '#eee' },
  title: { fontSize: 20, fontWeight: '700', color: '#ff6b6b' },
  drawerLabel: { fontSize: 16, fontWeight: '500', color: '#333', marginLeft: -10 },
});
