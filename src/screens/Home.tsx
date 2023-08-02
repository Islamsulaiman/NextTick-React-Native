/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

const HomeScreen: React.FC = () => {
  const [userData, setUserData] = useState<{ fullName: string } | null>(null);
  const navigation = useNavigation();

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

  const handleGoToNewTaskScreen = () => {
    navigation.navigate('new_task');
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        {userData && <Text style={styles.userName}>Welcome, {userData.fullName}!</Text>}
      </View>
      <View style={styles.header}>
          <Text style={styles.slogan}>
            <Text style={styles.nextText}>N</Text>ext
            <Text style={styles.tickText}>T</Text>ick
          </Text>
        </View>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>

        <View style={styles.centerContent}>
          <Text style={styles.centerText}>Never miss a task again</Text>
          <Image source={require('../assets/pictures/002_logo_any-01_4x.png')} style={styles.logo} />
        </View>

        <View style={styles.description}>
          <Text >
            NextTict is a task management mobile app with timers. It allows users to create tasks, set timers for them, and track their productivity. The app also offers notifications, data security, and synchronization across devices, making it a powerful tool for enhancing productivity and time management.
          </Text>
        </View>

        <TouchableOpacity style={styles.button} onPress={handleGoToNewTaskScreen}>
          <Text style={styles.buttonText}>Create a task</Text>
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
    backgroundColor: '#09008D',
    padding: 10,
    borderRadius: 20,
    marginTop: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    textAlign: 'center',
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
  description: {
    width: '90%',
    marginBottom: 30,
  },
});

export default HomeScreen;
