/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Modal, Alert, FlatList, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';

interface Task {
  id: number;
  title: string;
  description: string;
  startTime: number;
  endTime: number;
}

const AllTasks: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [modalVisible, setModalVisible] = useState<boolean>(false);

  useFocusEffect(() => {
    loadTasksFromAsyncStorage();
  });

  const loadTasksFromAsyncStorage = async () => {
    try {
      const tasksFromStorage = await AsyncStorage.getItem('tasks');
      if (tasksFromStorage) {
        setTasks(JSON.parse(tasksFromStorage));
      }
    } catch (error) {
      console.error('Error reading tasks from AsyncStorage:', error);
    }
  };

  const deleteOneTask = (taskId: number) => {
    const updatedTasks = tasks.filter((task) => task.id !== taskId);
    updateAsyncStorage(updatedTasks);
  };

  const updateAsyncStorage = async (updatedTasks: Task[]) => {
    try {
      await AsyncStorage.setItem('tasks', JSON.stringify(updatedTasks));
      setTasks(updatedTasks);
    } catch (error) {
      console.error('Error updating tasks in AsyncStorage:', error);
    }
  };

  const renderItem = ({ item }: { item: Task }) => (
    <View style={styles.taskItem}>
      <TouchableOpacity onPress={() => openTaskDescription(item)}>
        <Text>{item.title}</Text>
      </TouchableOpacity>
      <View style={styles.buttonsContainer}>
        <TouchableOpacity style={styles.viewButton} onPress={() => openTaskDescription(item)}>
          <Text style={styles.buttonText}>View</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.deleteButton} onPress={() => deleteOneTask(item.id)}>
          <Text style={styles.buttonText}>Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const openTaskDescription = (task: Task) => {
    setSelectedTask(task);
    setModalVisible(true);
  };

  const closeModal = () => {
    setSelectedTask(null);
    setModalVisible(false);
  };

  const deleteTask = (taskId: number) => {
    deleteTask(taskId);
  };

  const formatDate = (timestamp: number) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString('en-US');
  };

  const getDifferenceInDays = (startTimestamp: number, endTimestamp: number) => {
    const oneDayInMilliseconds = 1000 * 60 * 60 * 24;
    const differenceInMilliseconds = endTimestamp - startTimestamp;
    const finalResult = Math.floor(differenceInMilliseconds / oneDayInMilliseconds);

    if (finalResult === 0){
      return 'Same day';
    } else {
      return `${finalResult} days`;
    }
  };

  const deleteAllTasks = () => {
    Alert.alert(
      'Delete All Tasks',
      'Are you sure you want to delete all tasks?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete All',
          style: 'destructive',
          onPress: () => confirmDeleteAllTasks(),
        },
      ],
      { cancelable: true }
    );
  };

  const confirmDeleteAllTasks = async () => {
    try {
      await AsyncStorage.removeItem('tasks');
      setTasks([]);
      Alert.alert('All tasks have been deleted.');
    } catch (error) {
      console.error('Error deleting tasks from AsyncStorage:', error);
      Alert.alert('Error deleting tasks.');
    }
  };

  return (
    <View style={styles.container}>

      {tasks.length === 0 ? (
        <View style={styles.imageContainer}>
          <Image source={require('../assets/pictures/nothing_to_do.jpg')} style={styles.image} />
        </View>
      ) : (
        <TouchableOpacity style={styles.deleteAllButton} onPress={deleteAllTasks}>
          <Text style={styles.deleteAllButtonText}>Delete All Tasks</Text>
        </TouchableOpacity>
      )}
      <FlatList
        data={tasks}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.listContainer}
      />

      <Modal visible={modalVisible} animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>{selectedTask?.title}</Text>
            <Text style={styles.modalDescription}>Description: {selectedTask?.description}</Text>
            <Text style={styles.modalDate}>Start Date: {formatDate(selectedTask?.startTime)}</Text>
            <Text style={styles.modalDate}>End Date: {formatDate(selectedTask?.endTime)}</Text>
            <Text style={styles.modalDate}>
              Difference: {getDifferenceInDays(selectedTask?.startTime, selectedTask?.endTime)}
            </Text>
            <TouchableOpacity style={styles.closeButton} onPress={closeModal}>
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
  },
  listContainer: {
    paddingVertical: 16,
    paddingHorizontal: 8,
  },
  taskItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  buttonsContainer: {
    flexDirection: 'row',
  },
  viewButton: {
    backgroundColor: '#09008D',
    padding: 8,
    borderRadius: 5,
    marginRight: 8,
  },
  deleteButton: {
    backgroundColor: '#AF0505',
    padding: 8,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 14,
    textAlign: 'center',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    width: '80%',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  modalDescription: {
    fontSize: 16,
    marginBottom: 8,
  },
  modalDate: {
    fontSize: 14,
    marginBottom: 4,
  },
  closeButton: {
    backgroundColor: '#09008D',
    padding: 8,
    borderRadius: 5,
  },
  closeButtonText: {
    color: 'white',
    fontSize: 14,
    textAlign: 'center',
  },
  deleteAllButton: {
    backgroundColor: '#AF0505',
    padding: 8,
    borderRadius: 5,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  deleteAllButtonText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
  },
  imageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 300,
    height: 300,
    resizeMode: 'contain',
  },
});

export default AllTasks;
