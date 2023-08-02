/* eslint-disable prettier/prettier */
import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Animated,
  Easing,
  Modal,
  ScrollView,
} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';

import DateTimePicker from '@react-native-community/datetimepicker';

import {useNavigation} from '@react-navigation/native';



const RegisterScreen: React.FC = () => {

  const navigation = useNavigation();

  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');

  const [startTime, setStartTime] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [dob, setDob] = useState<Date | undefined>(undefined);

  const [fullName, setFullName] = useState<string>('');
  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const [phoneExt, setPhoneExt] = useState<string>('');
  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [modalMessage, setModalMessage] = useState<string>('');


  const isEmailValid = (input: string) => {
    const emailRegex = /\S+@\S+\.\S+/;
    return emailRegex.test(input);
  };

  const isPasswordValid = (input: string) => {
    return input.length >= 8;
  };

  const storeData = async (value: any) => {
    try {
      await AsyncStorage.setItem('user', JSON.stringify(value));
      navigation.navigate('Login');
    } catch (e) {
      setModalMessage('Error during sending data, please try again later.');
      setIsModalVisible(true);
    }
  };

  const handleRegister =  () => {

    const user = {
      fullName,
      email,
      password,
    };

    console.log('user');
    console.log(user);

    storeData(user);
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
  };

  const handleFullNameChange = (input: string) => {
    // Only accept alphabets, spaces, and ensure maximum length is 30 characters
    const sanitizedInput = input.replace(/[^a-zA-Z ]/g, '').substr(0, 30);
    setFullName(sanitizedInput);
  };

  const animationValue = useRef(new Animated.Value(0)).current;

  const startAnimation = () => {
    Animated.timing(animationValue, {
      toValue: 2,
      duration: 1000,
      easing: Easing.linear,
      useNativeDriver: true,
    }).start();
  };

  const interpolatedBackgroundColor = animationValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['rgba(0, 0, 0, 0)', 'rgba(0, 0, 0, 0.5)'],
  });


  const showDatePickerHandler = () => {
    setShowDatePicker(true);
  };

  const dateChangeHandler = (event: any, selectedDate: any) => {
    setShowDatePicker(false);
    if (selectedDate) {
      setDob(selectedDate);
    }
  };

  return (

    <ScrollView contentContainerStyle={styles.scrollViewContent}>



      <View style={styles.container}>
        <Animated.View
          style={[styles.overlay, { backgroundColor: interpolatedBackgroundColor }]}
        />

        <View style={styles.header}>
          <Text style={styles.slogan}>
            <Text style={styles.nextText}>N</Text>ext
            <Text style={styles.tickText}>T</Text>ick
          </Text>
        </View>

        <View style={styles.wrapper}>
          <View style={styles.inputWrapper}>
            <Text style={styles.inputLabel}>Email</Text>
            <TextInput
              style={styles.input}
              placeholder="Email"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              onBlur={() => {
                if (email && !isEmailValid(email)) {
                  setModalMessage('Invalid email format.');
                  setIsModalVisible(true);
                }
              }}
            />
          </View>

          <View style={styles.inputWrapper}>
            <Text style={styles.inputLabel}>Password</Text>
            <TextInput
              style={styles.input}
              placeholder="Password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!isPasswordVisible}
              onBlur={() => {
                if (password && !isPasswordValid(password)) {
                  setModalMessage('Password must be at least 8 characters long.');
                  setIsModalVisible(true);
                }
              }}
            />

            <TouchableOpacity
              style={styles.passwordToggle}
              onPress={() => setIsPasswordVisible((prev) => !prev)}
            >
              <Text>{isPasswordVisible ? 'Hide' : 'Show'}</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.inputWrapper}>
            <Text style={styles.inputLabel}>Confirm Password</Text>
            <TextInput
              style={styles.input}
              placeholder="Confirm Password"
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              secureTextEntry={!isPasswordVisible}
              onBlur={() => {
                if (confirmPassword !== password) {
                  setModalMessage('Passwords do not match.');
                  setIsModalVisible(true);
                }
              }}
            />

          </View>

          <View style={styles.inputWrapper}>
            <Text style={styles.inputLabel}>Date of Birth</Text>
            <TouchableOpacity onPress={showDatePickerHandler}>
              <Text style={styles.dateOfBirthText}>
                {dob ? dob.toDateString() : 'Select Date of Birth'}
              </Text>
            </TouchableOpacity>
            {showDatePicker && (
              <DateTimePicker
                testID="dateTimePicker"
                value={dob || new Date()}
                mode="date"
                display="default"
                onChange={dateChangeHandler}
              />
            )}

          </View>

          <View style={styles.inputWrapper}>
            <Text style={styles.inputLabel}>Full Name</Text>
            <TextInput
              style={styles.input}
              placeholder="Full Name"
              value={fullName}
              onChangeText={handleFullNameChange}
            />
          </View>

          <View style={styles.inputWrapper}>
            <Text style={styles.inputLabel}>Phone Number</Text>
            <View style={styles.phoneNumberContainer}>
              <TextInput
                style={styles.phoneInput}
                placeholder="Phone Number"
                value={phoneNumber}
                onChangeText={setPhoneNumber}
                keyboardType="phone-pad"
              />
              <TextInput
                style={styles.phoneExtInput}
                placeholder="Ext"
                value={phoneExt}
                onChangeText={setPhoneExt}
                keyboardType="numeric"
              />
            </View>
          </View>

          <TouchableOpacity
            style={[
              styles.button,
              !isEmailValid(email) ||
                !isPasswordValid(password) ||
                confirmPassword !== password
                ? styles.disabled
                : null,
            ]}
            onPress={handleRegister}
            disabled={
              !isEmailValid(email) ||
              !isPasswordValid(password) ||
              confirmPassword !== password
            }
            onPressIn={startAnimation}
          >
            <Text style={styles.buttonText}>Register</Text>
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

    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollViewContent: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
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
    checkboxContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 10,
    },
    checkboxLabel: {
      marginLeft: 8,
    },
    phoneNumberContainer: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    phoneInput: {
      flex: 1,
      height: 40,
      borderColor: 'gray',
      borderWidth: 1,
      marginBottom: 10,
      paddingLeft: 10,
      borderRadius: 5,
      backgroundColor: 'white',
    },
    phoneExtInput: {
      width: '30%',
      height: 40,
      borderColor: 'gray',
      borderWidth: 1,
      marginBottom: 10,
      marginLeft: 10,
      paddingLeft: 10,
      borderRadius: 5,
      backgroundColor: 'white',
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

    dateOfBirthText: {
      fontSize: 16,
      color: 'black',
      paddingVertical: 10,
      borderBottomWidth: 1,
      borderBottomColor: 'gray',
    },

  });


export default RegisterScreen;
