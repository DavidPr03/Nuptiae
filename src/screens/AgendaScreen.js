import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import CalendarAgendaScreen from './CalendarAgendaScreen';
import TareasScreen from './TareasScreen';
import PreparativosScreen from './PreparativosScreen';

export default function AgendaScreen({ navigation }) {
  const [activeTab, setActiveTab] = useState('calendario');
  const [menuOpen, setMenuOpen] = useState(false);

  const renderScreen = () => {
    switch (activeTab) {
      case 'calendario':
        return <CalendarAgendaScreen />;
      case 'tareas':
        return <TareasScreen navigation={navigation} />;
      case 'preparativos':
        return <PreparativosScreen />;
      default:
        return <CalendarAgendaScreen />;
    }
  };

  return (
    <View style={styles.container}>
      {/* Header con menú hamburguesa */}
      <View style={styles.header}>
        <TouchableOpacity 
          onPress={() => setMenuOpen(!menuOpen)}
          style={styles.menuButton}
        >
          <Ionicons name="menu" size={28} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Agenda</Text>
        <View style={{ width: 28 }} />
      </View>

      {/* Menú desplegable */}
      {menuOpen && (
        <View style={styles.dropdown}>
          <TouchableOpacity 
            style={[
              styles.menuItem,
              activeTab === 'calendario' && styles.menuItemActive
            ]}
            onPress={() => {
              setActiveTab('calendario');
              setMenuOpen(false);
            }}
          >
            <Ionicons 
              name="calendar" 
              size={20} 
              color={activeTab === 'calendario' ? '#e57373' : '#666'} 
            />
            <Text style={[
              styles.menuItemText,
              activeTab === 'calendario' && styles.menuItemTextActive
            ]}>
              Calendario
            </Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[
              styles.menuItem,
              activeTab === 'tareas' && styles.menuItemActive
            ]}
            onPress={() => {
              setActiveTab('tareas');
              setMenuOpen(false);
            }}
          >
            <Ionicons 
              name="checkmark-done" 
              size={20} 
              color={activeTab === 'tareas' ? '#e57373' : '#666'} 
            />
            <Text style={[
              styles.menuItemText,
              activeTab === 'tareas' && styles.menuItemTextActive
            ]}>
              Tareas
            </Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[
              styles.menuItem,
              activeTab === 'preparativos' && styles.menuItemActive
            ]}
            onPress={() => {
              setActiveTab('preparativos');
              setMenuOpen(false);
            }}
          >
            <Ionicons 
              name="clipboard" 
              size={20} 
              color={activeTab === 'preparativos' ? '#e57373' : '#666'} 
            />
            <Text style={[
              styles.menuItemText,
              activeTab === 'preparativos' && styles.menuItemTextActive
            ]}>
              Preparativos
            </Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Contenido de la pantalla activa */}
      <View style={styles.content}>
        {renderScreen()}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    backgroundColor: '#fff',
  },
  menuButton: {
    padding: 5,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000',
  },
  dropdown: {
    backgroundColor: '#f5f5f5',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
    paddingVertical: 8,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderLeftWidth: 4,
    borderLeftColor: 'transparent',
  },
  menuItemActive: {
    borderLeftColor: '#e57373',
    backgroundColor: '#fff',
  },
  menuItemText: {
    marginLeft: 15,
    fontSize: 16,
    color: '#666',
    fontWeight: '500',
  },
  menuItemTextActive: {
    color: '#e57373',
    fontWeight: '600',
  },
  content: {
    flex: 1,
  },
});
