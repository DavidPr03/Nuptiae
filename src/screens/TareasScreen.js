<<<<<<< HEAD
// src/screens/TareasScreen.js
import React, { useState, useEffect, useCallback } from 'react';
=======
import React, { useState } from "react";
>>>>>>> 94f9884 (h)
import {
  View,
  Text,
  StyleSheet,
<<<<<<< HEAD
  FlatList,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import * as ScreenOrientation from 'expo-screen-orientation';
import { Ionicons } from '@expo/vector-icons';
import { useFocusEffect } from '@react-navigation/native';

export default function TareasScreen({ navigation }) {
  // estado inicial basado en dimensiones actuales
  const window = Dimensions.get('window');
  const [isLandscape, setIsLandscape] = useState(window.width > window.height);

  // Detectar rotación real del dispositivo
  useEffect(() => {
    const subscription = Dimensions.addEventListener('change', ({ window }) => {
      setIsLandscape(window.width > window.height);
    });
    return () => {
      subscription?.remove();
    };
  }, []);

  // ✅ Permitir rotación solo aquí + ocultar header y tabs en landscape
  useFocusEffect(
    useCallback(() => {
      const enableOrientation = async () => {
        try {
          await ScreenOrientation.unlockAsync();
        } catch (err) {
          console.warn('Error desbloqueando orientación:', err);
        }
      };

      enableOrientation();

      // 👇 Ajustar header y tabs dinámicamente
      navigation.setOptions({
        headerShown: !isLandscape, // Oculta header si está en landscape
        tabBarStyle: isLandscape ? { display: 'none' } : {}, // Oculta tabs si landscape
      });

      return () => {
        const lockPortrait = async () => {
          try {
            await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT_UP);
          } catch (err) {
            console.warn('Error bloqueando orientación al salir:', err);
          }
        };

        lockPortrait();

        // Restaurar visibilidad cuando salgamos
        navigation.setOptions({
          headerShown: true,
          tabBarStyle: {},
        });
      };
    }, [isLandscape])
  );

  const [tasks, setTasks] = useState([
    { id: 1, title: 'Buscar micrófonos', priority: 'Urgente', color: '#f08080', completed: false },
    { id: 2, title: 'Conseguir spot fotos', priority: 'Puede esperar', color: '#ffa500', completed: false },
    { id: 3, title: 'Confirmar juez civil', priority: 'Urgente', color: '#f08080', completed: false },
    { id: 4, title: 'Contratar proveedores', priority: 'Importante', color: '#ff6b6b', completed: false },
    { id: 5, title: 'Elegir fecha y lugar', priority: 'Importante', color: '#ff6b6b', completed: false },
  ]);

  const toggleTask = (id) => {
    setTasks(current =>
      current.map(task =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const handleAddTarea = (newTarea) => {
    setTasks(current => [...current, newTarea]);
  };

  const navigateToAddTarea = () => {
    const parentNav = navigation.getParent ? navigation.getParent() : null;

    if (parentNav && parentNav.navigate) {
      parentNav.navigate('AddTarea', { onAddTarea: handleAddTarea });
    } else {
      navigation.navigate('AddTarea', { onAddTarea: handleAddTarea });
    }
  };

  const renderTaskItem = ({ item }) => (
    <TouchableOpacity
      style={[
        styles.taskItem,
        isLandscape && styles.taskItemLandscape,
        item.completed && styles.taskItemCompleted,
      ]}
      onPress={() => toggleTask(item.id)}
    >
      <View style={styles.taskContent}>
        <View style={[styles.priorityDot, { backgroundColor: item.color }]} />
        <View style={styles.taskTextContainer}>
          <Text style={[styles.taskTitle, item.completed && styles.taskTitleCompleted]}>
            {item.title}
          </Text>
          <Text style={styles.priorityText}>{item.priority}</Text>
        </View>
      </View>

      <View style={styles.checkboxContainer}>
        {item.completed ? (
          <View style={styles.checkboxChecked}>
            <Ionicons name="checkmark" size={18} color="#fff" />
          </View>
        ) : (
          <View style={styles.checkboxEmpty} />
        )}
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={[styles.container, isLandscape && styles.containerLandscape]}>
      {/* Encabezado (solo visible en portrait ahora) */}
      {!isLandscape && (
        <View style={styles.header}>
          <Text style={styles.headerText}>Tareas</Text>
          <Text style={styles.taskCount}>
            {tasks.filter(t => !t.completed).length} pendientes
          </Text>
        </View>
      )}

      <FlatList
        key={isLandscape ? 'h' : 'v'} // Fuerza re-render cuando cambian columnas
        data={tasks}
        renderItem={renderTaskItem}
        keyExtractor={(item) => item.id.toString()}
        numColumns={isLandscape ? 2 : 1}
        contentContainerStyle={styles.listContent}
        columnWrapperStyle={isLandscape ? styles.columnWrapper : undefined}
      />

      {/* Botón flotante */}
      <TouchableOpacity style={[styles.fab, isLandscape && styles.fabLandscape]} onPress={navigateToAddTarea}>
        <Ionicons name="add" size={32} color="#fff" />
      </TouchableOpacity>
    </View>
=======
  ScrollView,
  TouchableOpacity,
  StatusBar,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ArrowLeft, Menu, Plus, Calendar, Users, ChevronDown } from "lucide-react-native";

export default function TareasScreen({ navigation }) {
  const [filterVisible, setFilterVisible] = useState(false);

  const tasks = {
    septiembre: [
      { id: 1, title: "Buscar micrófonos", priority: "Urgente", color: "#ff6b6b" },
      { id: 2, title: "Conseguir spot fotos", priority: "Puede esperar", color: "#FFB347" },
      { id: 3, title: "Confirmar juez civil", priority: "Urgente", color: "#ff6b6b" },
    ],
    noviembre: [
      { id: 4, title: "Buscar micrófonos", priority: "Urgente", color: "#ff6b6b" },
      { id: 5, title: "Conseguir spot fotos", priority: "Puede esperar", color: "#FFB347" },
    ],
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={["top", "left", "right"]}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" translucent={false} />
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Menu size={24} color="#333" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Agenda</Text>
          <View style={{ width: 24 }} />
        </View>

        {/* Filter Bar */}
        <View style={styles.filterBar}>
          <Text style={styles.filterLabel}>Filtrado por</Text>
          <TouchableOpacity style={styles.filterButton}>
            <Text style={styles.filterText}>Fecha</Text>
            <ChevronDown size={16} color="#333" />
          </TouchableOpacity>
        </View>

        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          {/* Septiembre Section */}
          <View style={styles.monthSection}>
            <Text style={styles.monthTitle}>Septiembre</Text>
            {tasks.septiembre.map((task) => (
              <TouchableOpacity key={task.id} style={styles.taskCard}>
                <View style={[styles.taskIndicator, { backgroundColor: task.color }]} />
                <View style={styles.taskContent}>
                  <Text style={styles.taskTitle}>{task.title}</Text>
                  <Text style={styles.taskPriority}>{task.priority}</Text>
                </View>
                <ChevronDown size={20} color="#ccc" style={styles.chevron} />
              </TouchableOpacity>
            ))}
          </View>

          {/* Noviembre Section */}
          <View style={styles.monthSection}>
            <Text style={styles.monthTitle}>Noviembre</Text>
            {tasks.noviembre.map((task) => (
              <TouchableOpacity key={task.id} style={styles.taskCard}>
                <View style={[styles.taskIndicator, { backgroundColor: task.color }]} />
                <View style={styles.taskContent}>
                  <Text style={styles.taskTitle}>{task.title}</Text>
                  <Text style={styles.taskPriority}>{task.priority}</Text>
                </View>
                <ChevronDown size={20} color="#ccc" style={styles.chevron} />
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>

        {/* Add Button */}
        <TouchableOpacity style={styles.addButton}>
          <Plus size={24} color="#fff" />
        </TouchableOpacity>

        {/* Bottom Navigation */}
        <View style={styles.bottomNav}>
          <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate("Home")}>
            <Text style={styles.navIcon}>🏠</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.navItem}>
            <Text style={styles.navIcon}>📋</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.navItem}>
            <Calendar size={24} color="#ff6b6b" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate("Cuentas")}>
            <Users size={24} color="#666" />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
>>>>>>> 94f9884 (h)
  );
}

const styles = StyleSheet.create({
<<<<<<< HEAD
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  containerLandscape: {
    paddingTop: 10,
  },
  header: {
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  headerText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000',
    marginBottom: 5,
  },
  taskCount: {
    fontSize: 14,
    color: '#999',
  },
  listContent: {
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  columnWrapper: {
    justifyContent: 'space-between',
  },
  taskItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    paddingHorizontal: 15,
    paddingVertical: 14,
    marginBottom: 10,
    borderLeftWidth: 4,
    borderLeftColor: '#f08080',
  },
  taskItemLandscape: {
    width: '48%',
  },
  taskItemCompleted: {
    backgroundColor: '#f5f5f5',
    opacity: 0.6,
  },
  taskContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  priorityDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginRight: 12,
  },
  taskTextContainer: {
=======
  safeArea: {
    flex: 1,
    backgroundColor: "#fff",
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
  },
  filterBar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  filterLabel: {
    fontSize: 14,
    color: "#666",
  },
  filterButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  filterText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#333",
  },
  content: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  monthSection: {
    paddingHorizontal: 16,
    paddingTop: 20,
  },
  monthTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#333",
    marginBottom: 12,
  },
  taskCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    elevation: 1,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },
  taskIndicator: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 12,
  },
  taskContent: {
>>>>>>> 94f9884 (h)
    flex: 1,
  },
  taskTitle: {
    fontSize: 15,
<<<<<<< HEAD
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  taskTitleCompleted: {
    textDecorationLine: 'line-through',
    color: '#999',
  },
  priorityText: {
    fontSize: 12,
    color: '#999',
  },
  checkboxContainer: {
    marginLeft: 10,
  },
  checkboxEmpty: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#ddd',
  },
  checkboxChecked: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#4caf50',
    justifyContent: 'center',
    alignItems: 'center',
  },
  fab: {
    position: 'absolute',
    bottom: 25,
=======
    fontWeight: "600",
    color: "#333",
    marginBottom: 4,
  },
  taskPriority: {
    fontSize: 13,
    color: "#666",
  },
  chevron: {
    marginLeft: 8,
  },
  addButton: {
    position: "absolute",
    bottom: 80,
>>>>>>> 94f9884 (h)
    right: 20,
    width: 56,
    height: 56,
    borderRadius: 28,
<<<<<<< HEAD
    backgroundColor: '#f08080',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
  },
  fabLandscape: {
    bottom: 15,
    right: 15,
=======
    backgroundColor: "#ff6b6b",
    alignItems: "center",
    justifyContent: "center",
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  bottomNav: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 20,
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderTopColor: "#f0f0f0",
  },
  navItem: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 8,
  },
  navIcon: {
    fontSize: 24,
>>>>>>> 94f9884 (h)
  },
});
