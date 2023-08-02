/* eslint-disable prettier/prettier */
import React, { useRef, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Animated,
} from 'react-native';

import DateTimePicker from '@react-native-community/datetimepicker';

import AsyncStorage from '@react-native-async-storage/async-storage';


const NewTask = () => {
  const [taskTitle, setTaskTitle] = useState('');
  const [taskDescription, setTaskDescription] = useState('');
  const [startTime, setStartTime] = useState(new Date());
  const [endTime, setEndTime] = useState(new Date());
  const [showStartTimePicker, setShowStartTimePicker] = useState(false);
  const [showEndTimePicker, setShowEndTimePicker] = useState(false);

  const handleTaskSubmit = async () => {

    const newTask = {
      title: taskTitle,
      description: taskDescription,
      startTime: startTime.getTime(),
      endTime: endTime.getTime(),
    };

    try {
      // Get existing tasks from AsyncStorage
      const existingTasksJson = await AsyncStorage.getItem('tasks');
      const existingTasks = existingTasksJson ? JSON.parse(existingTasksJson) : [];

      // Add the new task to the existing tasks array
      const updatedTasks = [...existingTasks, newTask];

      // Save the updated tasks array back to AsyncStorage
      await AsyncStorage.setItem('tasks', JSON.stringify(updatedTasks));

      const final = await AsyncStorage.getItem('tasks');
      console.log('final');
      console.log(final);

      // Clear the input fields after submission
      setTaskTitle('');
      setTaskDescription('');
      setStartTime(new Date());
      setEndTime(new Date());
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



  return (
    <View style={styles.container}>

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
        <TouchableOpacity onPress={showStartTimePickerHandler}>
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
        <TouchableOpacity onPress={showEndTimePickerHandler}>
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
    color: 'red',
  },
  tickText: {
    color: 'red',
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
    backgroundColor: 'blue',
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
    color: 'blue',
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
    backgroundColor: 'blue',
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
});


export default NewTask;
