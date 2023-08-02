/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const HomeScreen: React.FC = () => {
  const [userData, setUserData] = useState<{ fullName: string } | null>(null);

  useEffect(() => {

    const getUserData = async () => {
      try {
        const data = await AsyncStorage.getItem('user');
        if (data) {
          const parsedData = JSON.parse(data);
          setUserData(parsedData);
        }
      } catch (error) {
        console.error('Error retrieving user data:', error);
      }
    };

    getUserData();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        {userData && <Text style={styles.userName}>Welcome, {userData.fullName}!</Text>}
      </View>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>

        <View style={styles.centerContent}>
          <Text style={styles.centerText}>Never miss a task again</Text>
          <Image source={require('../assets/pictures/002_logo_any-01_4x.png')} style={styles.logo} />
        </View>

        <TouchableOpacity style={styles.button} onPress={() => console.log('Button pressed')}>
          <Text style={styles.buttonText}>Go to Another Screen</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 20,
    backgroundColor: '#ffffff',
    width: '100%',
    position: 'absolute',
    top: 0,
    zIndex: 1,
  },
  userName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  scrollViewContent: {
    paddingTop: 100,
    alignItems: 'center',
  },
  centerContent: {
    alignItems: 'center',
  },
  centerText: {
    fontSize: 24,
    textAlign: 'center',
    marginBottom: 20,
  },
  logo: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
  },
  button: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 20,
    marginTop: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    textAlign: 'center',
  },
});

export default HomeScreen;
