<<<<<<< HEAD
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
=======
import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { DrawerContentScrollView, DrawerItemList, DrawerItem } from "@react-navigation/drawer";
import { Users, Gift, Users as ProvidersIcon, Building, HelpCircle } from "lucide-react-native";
import HomeScreen from "../screens/HomeScreen";
import ProfileScreen from "../screens/ProfileScreen";
import FormsScreen from "../screens/FormsScreen";
import ProvidersScreen from "../screens/ProvidersScreen";
import PromocionesScreen from "../screens/PromocionesScreen";
import InvitadosScreen from "../screens/InvitadosScreen";
import AgendaScreen from "../screens/AgendaScreen";
import CostosScreen from "../screens/CostosScreen";
import CuentasScreen from "../screens/CuentasScreen";
import PantallaScreen from "../screens/PantallaScreen";
import IdiomaScreen from "../screens/IdiomaScreen";
import RolesScreen from "../screens/RolesScreen";
import TareasScreen from "../screens/TareasScreen";
>>>>>>> 94f9884 (h)

import HomeScreen from '../screens/HomeScreen';
import AgendaScreen from '../screens/AgendaScreen';
import AddTareaScreen from '../screens/AddTareaScreen';
import AddItinerarioScreen from '../screens/AddItinerarioScreen';
import ProfileStack from './ProfileStack';
import InvitadosScreen from '../screens/InvitadosScreen';
import AddInvitadoScreen from '../screens/AddInvitadoScreen';
const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();

<<<<<<< HEAD
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
      <Tab.Screen name="Agenda" component={AgendaScreen} />
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
      <Drawer.Screen 
        name="Principal" 
        component={BottomTabs} 
        options={{
          drawerIcon: ({ color }) => (
            <Ionicons name="home-outline" size={24} color={color} />
          ),
        }} 
      />
      <Drawer.Screen 
        name="AddTarea" 
        component={AddTareaScreen} 
        options={{
          drawerItemStyle: { height: 0 },
          title: '',
          headerShown: false,
          drawerIcon: ({ color }) => (
            <Ionicons name="add-circle-outline" size={24} color={color} />
          ),
        }} 
      />
      <Drawer.Screen 
        name="AddInvitado" 
        component={AddInvitadoScreen} 
        options={{
          drawerItemStyle: { height: 0 },
          title: '',
          headerShown: false,
          drawerIcon: ({ color }) => (
            <Ionicons name="add-circle-outline" size={24} color={color} />
          ),
        }} 
      />
      <Drawer.Screen 
        name="AddItinerario" 
        component={AddItinerarioScreen} 
        options={{
          drawerItemStyle: { height: 0 },
          title: '',
          headerShown: false,
          drawerIcon: ({ color }) => (
            <Ionicons name="add-circle-outline" size={24} color={color} />
          ),
        }} 
      />
      <Drawer.Screen 
        name="Invitados" 
        component={InvitadosScreen} 
        options={{
          drawerIcon: ({ color }) => (
            <Ionicons name="people-outline" size={24} color={color} />
          ),
        }} 
      />
      <Drawer.Screen 
        name="Promos" 
        component={PlaceholderScreen} 
        options={{
          drawerIcon: ({ color }) => (
            <Ionicons name="star-outline" size={24} color={color} />
          ),
        }} 
      />
      <Drawer.Screen 
        name="Proveedores" 
        component={PlaceholderScreen} 
        options={{
          drawerIcon: ({ color }) => (
            <Ionicons name="business-outline" size={24} color={color} />
          ),
        }} 
      />
      <Drawer.Screen 
        name="Comunidad" 
        component={PlaceholderScreen} 
        options={{
          drawerIcon: ({ color }) => (
            <Ionicons name="people-circle-outline" size={24} color={color} />
          ),
        }} 
      />
      <Drawer.Screen 
        name="Ayuda" 
        component={PlaceholderScreen} 
        options={{
          drawerIcon: ({ color }) => (
            <Ionicons name="help-circle-outline" size={24} color={color} />
          ),
        }} 
      />
    </Drawer.Navigator>
  );
}
=======
function CustomDrawerContent(props) {
  return (
    <DrawerContentScrollView {...props} style={styles.drawerContainer}>
      {/* Logo */}
      <View style={styles.logoContainer}>
        <View style={styles.menuIconContainer}>
          <Text style={styles.menuIcon}>☰</Text>
        </View>
        <Text style={styles.logoText}>Nuptiae</Text>
      </View>

      {/* Menu Items */}
      <DrawerItem
        label="Invitados"
        icon={({ focused }) => (
          <View style={styles.iconContainer}>
            <Users size={22} color={focused ? "#ff6b6b" : "#666"} />
          </View>
        )}
        onPress={() => props.navigation.navigate("Invitados")}
        labelStyle={styles.drawerLabel}
        style={styles.drawerItem}
        activeTintColor="#ff6b6b"
        inactiveTintColor="#333"
      />
      <DrawerItem
        label="Promos"
        icon={({ focused }) => (
          <View style={styles.iconContainer}>
            <Gift size={22} color={focused ? "#ff6b6b" : "#666"} />
          </View>
        )}
        onPress={() => props.navigation.navigate("Promociones")}
        labelStyle={styles.drawerLabel}
        style={styles.drawerItem}
        activeTintColor="#ff6b6b"
        inactiveTintColor="#333"
      />
      <DrawerItem
        label="Proveedores"
        icon={({ focused }) => (
          <View style={styles.iconContainer}>
            <ProvidersIcon size={22} color={focused ? "#ff6b6b" : "#666"} />
          </View>
        )}
        onPress={() => props.navigation.navigate("Providers")}
        labelStyle={styles.drawerLabel}
        style={styles.drawerItem}
        activeTintColor="#ff6b6b"
        inactiveTintColor="#333"
      />
      <DrawerItem
        label="Comunidad"
        icon={({ focused }) => (
          <View style={styles.iconContainer}>
            <Building size={22} color={focused ? "#ff6b6b" : "#666"} />
          </View>
        )}
        onPress={() => props.navigation.navigate("Forms")}
        labelStyle={styles.drawerLabel}
        style={styles.drawerItem}
        activeTintColor="#ff6b6b"
        inactiveTintColor="#333"
      />
      <DrawerItem
        label="Ayuda"
        icon={({ focused }) => (
          <View style={styles.iconContainer}>
            <HelpCircle size={22} color={focused ? "#ff6b6b" : "#666"} />
          </View>
        )}
        onPress={() => {}}
        labelStyle={styles.drawerLabel}
        style={styles.drawerItem}
        activeTintColor="#ff6b6b"
        inactiveTintColor="#333"
      />
    </DrawerContentScrollView>
  );
}

export default function DrawerNavigator() {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={{
        headerShown: false,
        drawerActiveTintColor: "#ff6b6b",
        drawerInactiveTintColor: "#333",
        drawerStyle: {
          backgroundColor: "#fff",
          width: 280,
        },
      }}
    >
      <Drawer.Screen
        name="Home"
        component={HomeScreen}
        options={{ title: "Inicio" }}
      />
      <Drawer.Screen
        name="Profile"
        component={ProfileScreen}
        options={{ title: "Perfil" }}
      />
      <Drawer.Screen
        name="Providers"
        component={ProvidersScreen}
        options={{ title: "Proveedores" }}
      />
      <Drawer.Screen
        name="Forms"
        component={FormsScreen}
        options={{ title: "Formularios" }}
      />
      <Drawer.Screen
        name="Promociones"
        component={PromocionesScreen}
        options={{ title: "Promociones" }}
      />
      <Drawer.Screen
        name="Invitados"
        component={InvitadosScreen}
        options={{ title: "Invitados" }}
      />
      <Drawer.Screen
        name="Agenda"
        component={AgendaScreen}
        options={{ title: "Agenda" }}
      />
      <Drawer.Screen
        name="Costos"
        component={CostosScreen}
        options={{ title: "Costos" }}
      />
      <Drawer.Screen
        name="Cuentas"
        component={CuentasScreen}
        options={{ title: "Cuentas" }}
      />
      <Drawer.Screen
        name="Pantalla"
        component={PantallaScreen}
        options={{ title: "Pantalla" }}
      />
      <Drawer.Screen
        name="Idioma"
        component={IdiomaScreen}
        options={{ title: "Idioma" }}
      />
      <Drawer.Screen
        name="Roles"
        component={RolesScreen}
        options={{ title: "Roles" }}
      />
      <Drawer.Screen
        name="Tareas"
        component={TareasScreen}
        options={{ title: "Tareas" }}
      />
    </Drawer.Navigator>
  );
}

const styles = StyleSheet.create({
  drawerContainer: {
    flex: 1,
    backgroundColor: "#fff",
  },
  logoContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
    marginBottom: 10,
  },
  menuIconContainer: {
    marginRight: 12,
  },
  menuIcon: {
    fontSize: 20,
    color: "#333",
  },
  logoText: {
    fontSize: 20,
    fontWeight: "700",
    color: "#ff6b6b",
  },
  drawerItem: {
    marginVertical: 0,
    marginHorizontal: 0,
    borderRadius: 0,
  },
  iconContainer: {
    width: 30,
    marginRight: 10,
    alignItems: "center",
  },
  drawerLabel: {
    fontSize: 16,
    fontWeight: "400",
    marginLeft: 0,
  },
});

>>>>>>> 94f9884 (h)
