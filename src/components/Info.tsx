/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';


const Info = () => {
  const [userData, setUserData] = useState(null);
  const navigation = useNavigation();

  useEffect(() => {
    fetchUserDataFromAsyncStorage();
  }, []);

  const fetchUserDataFromAsyncStorage = async () => {
    try {
      const userFromStorage = await AsyncStorage.getItem('user');
      if (userFromStorage) {
        setUserData(JSON.parse(userFromStorage));
      }
    } catch (error) {
      console.error('Error reading user data from AsyncStorage:', error);
    }
  };

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('user');
      setUserData(null);
      navigation.navigate('Login');
    } catch (error) {
      console.error('Error deleting user data from AsyncStorage:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Hola</Text>
      {userData && (
        <View style={styles.userInfoContainer}>
          <Text style={styles.infoLabel}>Full Name:</Text>
          <Text style={styles.infoValue}>{userData.fullName}</Text>

          <Text style={styles.infoLabel}>Email:</Text>
          <Text style={styles.infoValue}>{userData.email}</Text>

          <Text style={styles.infoLabel}>Phone Number:</Text>
          <Text style={styles.infoValue}>{userData.phoneNumber}</Text>

          <Text style={styles.infoLabel}>Phone Extension:</Text>
          <Text style={styles.infoValue}>{userData.phoneExt}</Text>

          <Text style={styles.infoLabel}>Date of Birth:</Text>
          <Text style={styles.infoValue}>{userData.dob}</Text>

          <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
            <Text style={styles.logoutButtonText}>Logout</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    padding: 16,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  userInfoContainer: {
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 10,
  },
  infoLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  infoValue: {
    fontSize: 16,
    marginBottom: 16,
  },
  logoutButton: {
    position: 'absolute',
    bottom: 16,
    left: 16,
    right: 16,
    marginTop: 16,
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 5,
  },
  logoutButtonText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
  },
});

export default Info;
