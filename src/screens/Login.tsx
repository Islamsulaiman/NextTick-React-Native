/* eslint-disable prettier/prettier */
import React, {useState, useRef} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Linking,
  Animated,
  Easing,
} from 'react-native';
// import { red } from 'react-native-reanimated';

const LoginScreen: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);

  const isEmailValid = (input: string) => {
    const emailRegex = /\S+@\S+\.\S+/;
    return emailRegex.test(input);
  };

  const isPasswordValid = (input: string) => {
    return input.length >= 8;
  };

  const handleLogin = () => {
    //login logic here
    console.log('Login button pressed');
  };

  const handleForgotPassword = () => {
    Linking.openURL('https://toggl.com/track/forgot-password/');
  };

  const animationValue = useRef(new Animated.Value(0)).current;

  const startAnimation = () => {
    Animated.timing(animationValue, {
      toValue: 1,
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
        style={[styles.overlay, {backgroundColor: interpolatedBackgroundColor}]}
      />

        <View style={styles.header}>
          <Text style={styles.slogan}>
            <Text style={styles.nextText}>N</Text>ext
            <Text style={styles.tickText}>T</Text>ick
          </Text>
        </View>

      <View style={styles.wrapper}>


        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          onBlur={() => {
            if (email && !isEmailValid(email)) {
              console.log('Invalid email format');
            }
          }}
        />
        {/* <View style={styles.passwordContainer}> */}
          <TextInput
            style={styles.input}
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={!isPasswordVisible}
            onBlur={() => {
              if (password && !isPasswordValid(password)) {
                // Handle invalid password length
                console.log('Password must be at least 8 characters long');
              }
            }}
          />

        {/* </View> */}

        <TouchableOpacity
            style={styles.passwordToggle}
            onPress={() => setIsPasswordVisible(prev => !prev)}>
            <Text>{isPasswordVisible ? 'Hide' : 'Show'}</Text>
          </TouchableOpacity>

        <TouchableOpacity
            style={[
              styles.button,
              !isEmailValid(email) || !isPasswordValid(password)
                ? styles.disabled
                : null,
            ]}
            onPress={handleLogin}
            disabled={!isEmailValid(email) || !isPasswordValid(password)}
            onPressIn={startAnimation}>
            <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleForgotPassword}>
          <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
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
    backgroundColor: 'white',
  },
  wrapper: {
    height: 'auto',
    backgroundColor: '#f0f0f0',
    padding: 20,
    borderRadius: 10,
    width: '90%',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
  },
  header: {
    fontSize: 24,
    marginBottom: 20,
    color: '#333',
  },
  headerText: {
    fontSize: 24,
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
    width: '80%',
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
    width: '80%',
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
});

export default LoginScreen;
