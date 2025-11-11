// src/screens/TareasScreen.js
import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
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
  );
}

const styles = StyleSheet.create({
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
    flex: 1,
  },
  taskTitle: {
    fontSize: 15,
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
    right: 20,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#f08080',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
  },
  fabLandscape: {
    bottom: 15,
    right: 15,
  },
});
