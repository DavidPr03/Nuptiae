import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  useWindowDimensions,
  Dimensions
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function TareasScreen({ navigation, route }) {
  const dimensions = useWindowDimensions();
  const isLandscape = dimensions.width > dimensions.height;

  // Estado explícito para forzar re-render cuando cambia orientación
  const [orientation, setOrientation] = useState(isLandscape ? 'landscape' : 'portrait');

  // Listener para cambios de dimensiones (más robusto en algunos dispositivos)
  useEffect(() => {
    const subscription = Dimensions.addEventListener('change', ({ window }) => {
      const newIsLandscape = window.width > window.height;
      setOrientation(newIsLandscape ? 'landscape' : 'portrait');
    });

    return () => {
      subscription?.remove();
    };
  }, []);

  const [tasks, setTasks] = useState([
    {
      id: 1,
      title: 'Buscar micrófonos',
      priority: 'Urgente',
      color: '#f08080',
      completed: false,
    },
    {
      id: 2,
      title: 'Conseguir spot fotos',
      priority: 'Puede esperar',
      color: '#ffa500',
      completed: false,
    },
    {
      id: 3,
      title: 'Confirmar juez civil',
      priority: 'Urgente',
      color: '#f08080',
      completed: false,
    },
    {
      id: 4,
      title: 'Contratar proveedores',
      priority: 'Importante',
      color: '#ff6b6b',
      completed: false,
    },
    {
      id: 5,
      title: 'Elegir fecha y lugar',
      priority: 'Importante',
      color: '#ff6b6b',
      completed: false,
    },
  ]);

  const toggleTask = (id) => {
    setTasks(tasks.map(task =>
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const handleAddTarea = (newTarea) => {
    setTasks([...tasks, newTarea]);
  };

  const navigateToAddTarea = () => {
    const parentNav = navigation.getParent ? navigation.getParent() : null;
    if (parentNav && parentNav.navigate) {
      parentNav.navigate('AddTarea', { onAddTarea: handleAddTarea });
    } else {
      // Fallback to local navigate
      navigation.navigate('AddTarea', { onAddTarea: handleAddTarea });
    }
  };

  const renderTaskItem = ({ item }) => (
    <TouchableOpacity
      style={[
        styles.taskItem,
        isLandscape && styles.taskItemLandscape,
        item.completed && styles.taskItemCompleted
      ]}
      onPress={() => toggleTask(item.id)}
    >
      <View style={styles.taskContent}>
        <View style={[styles.priorityDot, { backgroundColor: item.color }]} />
        <View style={styles.taskTextContainer}>
          <Text style={[
            styles.taskTitle,
            item.completed && styles.taskTitleCompleted
          ]}>
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
    <View style={styles.container}>
      {/* Encabezado */}
      <View style={styles.header}>
        <Text style={styles.headerText}>Tareas</Text>
        <Text style={styles.taskCount}>
          {tasks.filter(t => !t.completed).length} pendientes
        </Text>
      </View>

      {/* (debug removed) */}

      {/* Lista de tareas */}
      <FlatList
        data={tasks}
        key={orientation} // forzar re-render con listener de orientación
        renderItem={renderTaskItem}
        keyExtractor={item => item.id.toString()}
        scrollEnabled={!isLandscape}
        numColumns={isLandscape ? 2 : 1}
        contentContainerStyle={styles.listContent}
        columnWrapperStyle={isLandscape ? styles.columnWrapper : undefined}
      />

      {/* Botón flotante para agregar tarea */}
      <TouchableOpacity 
        style={styles.fab}
        onPress={navigateToAddTarea}
      >
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
    marginHorizontal: 5,
  },
  taskItemCompleted: {
    backgroundColor: '#f5f5f5',
    opacity: 0.6,
  },
  taskContent: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
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
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
});
