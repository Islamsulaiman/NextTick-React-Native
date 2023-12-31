/* eslint-disable prettier/prettier */
import React, { useRef, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Animated,
  Modal,
} from 'react-native';

import DateTimePicker from '@react-native-community/datetimepicker';

import AsyncStorage from '@react-native-async-storage/async-storage';

import {useNavigation} from '@react-navigation/native';


const NewTask = () => {

  const navigation = useNavigation();

  const [taskTitle, setTaskTitle] = useState('');
  const [taskDescription, setTaskDescription] = useState('');
  const [startTime, setStartTime] = useState(new Date());
  const [endTime, setEndTime] = useState(new Date());
  const [showStartTimePicker, setShowStartTimePicker] = useState(false);
  const [showEndTimePicker, setShowEndTimePicker] = useState(false);

  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [modalMessage, setModalMessage] = useState<string>('');


  const handleTaskSubmit = async () => {

    if (!taskTitle.trim() || taskTitle.length > 100) {
      setModalMessage('Task title must be between 1 and 100 characters.');
      setIsModalVisible(true);
      return;
    }

    if (taskDescription.length > 300) {
      setModalMessage('Task description must not exceed 300 characters.');
      setIsModalVisible(true);
      return;
    }

    if (endTime < startTime) {
      setModalMessage('End date can"t be before the start date!');
      setIsModalVisible(true);
      return;
    }

    if (endTime < startTime) {
      setModalMessage('End date can"t be before start date!.');
      setIsModalVisible(true);
      return;
    }

    const newTask = {
      id: Date.now(),
      title: taskTitle,
      description: taskDescription,
      startTime: startTime.getTime(),
      endTime: endTime.getTime(),
    };

    try {
      const existingTasksJson = await AsyncStorage.getItem('tasks');
      const existingTasks = existingTasksJson ? JSON.parse(existingTasksJson) : [];

      const updatedTasks = [...existingTasks, newTask];

      await AsyncStorage.setItem('tasks', JSON.stringify(updatedTasks));

      const final = await AsyncStorage.getItem('tasks');
      console.log('final');
      console.log(final);

      setTaskTitle('');
      setTaskDescription('');
      setStartTime(new Date());
      setEndTime(new Date());

      navigation.navigate('tasks');
    } catch (error) {
      console.error('Error saving task:', error);
    }
  };

  const animationValue = useRef(new Animated.Value(0)).current;

  const interpolatedBackgroundColor = animationValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['rgba(0, 0, 0, 0)', 'rgba(0, 0, 0, 0.5)'],
  });



  const showStartTimePickerHandler = () => {
    setShowStartTimePicker(true);
  };

  const showEndTimePickerHandler = () => {
    setShowEndTimePicker(true);
  };

  const hideStartTimePickerHandler = () => {
    setShowStartTimePicker(false);
  };

  const hideEndTimePickerHandler = () => {
    setShowEndTimePicker(false);
  };

  const startTimeChangeHandler = (event, selectedTime) => {
    const currentTime = selectedTime || startTime;
    setShowStartTimePicker(false);
    setStartTime(currentTime);
  };

  const endTimeChangeHandler = (event, selectedTime) => {
    const currentTime = selectedTime || endTime;
    setShowEndTimePicker(false);
    setEndTime(currentTime);
  };



  const handleCloseModal = () => {
    setIsModalVisible(false);
  };


  const shadowStyle = {
    shadowColor: 'rgba(0, 0, 0, 0.5)',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.8,
    shadowRadius: 3.84,
    elevation: 5,
  };

  return (
    <View style={styles.container}>

      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>Let's start</Text>
      </View>

      <Animated.View
        style={[styles.overlay, { backgroundColor: interpolatedBackgroundColor }]}
      />

      <View style={styles.wrapper}>

        <View style={styles.inputWrapper}>
          <Text style={styles.inputLabel}>Task Title</Text>
          <TextInput
              style={styles.input}
              placeholder="Enter task title"
              value={taskTitle}
              onChangeText={setTaskTitle}
            />
        </View>

        <View style={styles.inputWrapper}>
          <Text style={styles.inputLabel}>Task Description</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter task description"
            value={taskDescription}
            onChangeText={setTaskDescription}
          />
        </View>

        <View style={styles.inputWrapper}>
          <Text style={styles.inputLabel}>Start Time</Text>
          <TouchableOpacity
            onPress={showStartTimePickerHandler}
            style={[styles.dateTimePicker, shadowStyle]}
            >
            <Text style={styles.dateText}>{startTime.toLocaleString()}</Text>
          </TouchableOpacity>
          {showStartTimePicker && (
            <DateTimePicker
              testID="dateTimePicker"
              value={startTime}
              mode="date"
              is24Hour={true}
              display="default"
              onChange={startTimeChangeHandler}
            />
          )}
      </View>

      <View style={styles.inputWrapper}>
        <Text style={styles.inputLabel}>End Time</Text>
        <TouchableOpacity
          onPress={showEndTimePickerHandler}
          style={[styles.dateTimePicker, shadowStyle]}
          >
          <Text style={styles.dateText}>{endTime.toLocaleString()}</Text>
        </TouchableOpacity>
        {showEndTimePicker && (
          <DateTimePicker
            testID="dateTimePicker"
            value={endTime}
            mode="date"
            is24Hour={true}
            display="default"
            onChange={endTimeChangeHandler}
          />
        )}
      </View>


      <TouchableOpacity style={styles.button} onPress={handleTaskSubmit}>
        <Text style={styles.buttonText}>Submit</Text>
      </TouchableOpacity>

      </View>



      <Modal
        visible={isModalVisible}
        animationType="fade"
        transparent
        onRequestClose={handleCloseModal}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>{modalMessage}</Text>
            <TouchableOpacity style={styles.modalButton} onPress={handleCloseModal}>
              <Text style={styles.modalButtonText}>OK</Text>
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
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
  },
  wrapper: {
    height: 'auto',
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    width: '90%',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
  },
  inputWrapper: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    alignSelf: 'flex-start',
    marginBottom: 10,
    width: '100%',
  },
  inputLabel: {
    fontSize: 18,
    marginBottom: 5,
  },
  header: {
    fontSize: 24,
    marginBottom: 20,
    color: '#333',
  },
  slogan: {
    fontSize: 30,
    color: '#333',
  },
  nextText: {
    fontWeight: 'bold',
    color: '#AF0505',
  },
  tickText: {
    color: '#AF0505',
  },
  input: {
    width: '97%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 10,
    borderRadius: 5,
    backgroundColor: 'white',
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  passwordInput: {
    flex: 1,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 10,
    borderRadius: 5,
    backgroundColor: 'white',
  },
  passwordToggle: {
    paddingHorizontal: 10,
    height: 40,
    justifyContent: 'center',
    backgroundColor: '#f0f0f0',
    borderTopRightRadius: 5,
    borderBottomRightRadius: 5,
  },
  button: {
    backgroundColor: '#0D01AF',
    padding: 10,
    borderRadius: 20,
    width: '97%',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    textAlign: 'center',
  },
  disabled: {
    backgroundColor: 'gray',
  },
  forgotPasswordText: {
    marginTop: 10,
    color: '#0D01AF',
    fontSize: 16,
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
  },
  modalText: {
    fontSize: 18,
    marginBottom: 10,
  },
  modalButton: {
    backgroundColor: '#0D01AF',
    padding: 10,
    borderRadius: 20,
    alignSelf: 'center',
  },
  modalButtonText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
  },
  registerButton: {
    backgroundColor: 'green',
    padding: 10,
    borderRadius: 20,
    width: '97%',
    marginTop: 10,
  },
  registerButtonText: {
    color: 'white',
    fontSize: 18,
    textAlign: 'center',
  },
  dateText: {
    fontSize: 16,
    color: 'black',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'gray',
  },
  headerContainer: {
    backgroundColor: '#f0f0f0',
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1,
  },
  headerText: {
    color: 'gray',
    fontSize: 30,
    fontWeight: 'bold',
  },
  dateTimePicker: {
    width: '97%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 10,
    borderRadius: 5,
    backgroundColor: 'white',
    justifyContent: 'center',
  },
});


export default NewTask;
