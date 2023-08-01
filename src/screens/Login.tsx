/* eslint-disable prettier/prettier */
import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Linking,
  Animated,
  Easing,
  Modal,
} from 'react-native';

import {useNavigation} from '@react-navigation/native';

const LoginScreen: React.FC = () => {

  const navigation = useNavigation();

  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
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

  const handleLogin = () => {

    navigation.navigate('Home');
  };

  const handleRegister = () =>{
    navigation.navigate('Register');
  };

  const handleForgotPassword = () => {
    Linking.openURL('https://toggl.com/track/forgot-password/');
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
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

  return (
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
            onPress={() => setIsPasswordVisible(prev => !prev)}
          >
            <Text>{isPasswordVisible ? 'Hide' : 'Show'}</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={[
            styles.button,
            !isEmailValid(email) || !isPasswordValid(password) ? styles.disabled : null,
          ]}
          onPress={handleLogin}
          disabled={!isEmailValid(email) || !isPasswordValid(password)}
          onPressIn={startAnimation}
        >
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.registerButton} onPress={handleRegister}>
          <Text style={styles.registerButtonText}>Register</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={handleForgotPassword}>
          <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
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
});

export default LoginScreen;
