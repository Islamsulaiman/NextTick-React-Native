/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable prettier/prettier */
import * as React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/Home';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AllTasks from '../components/AllTasks';
import NewTask from '../components/NewTask';
import Info from '../components/Info';
import LoginScreen from '../screens/Login';

MaterialCommunityIcons;

const Tab = createBottomTabNavigator();

export default function TabBase() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        tabBarActiveTintColor: 'green',
      }}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarLabel: 'Home',
          headerShown: false,
          tabBarIcon: ({color, size}) => (
            <Ionicons name="home-outline" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="tasks"
        component={AllTasks}
        options={{
          tabBarLabel: 'My Tasks',
          headerShown: false,
          tabBarIcon: ({color, size}) => (
            <FontAwesome5 name="tasks" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="new_task"
        component={NewTask}
        options={{
          tabBarLabel: 'New Task',
          headerShown: false,
          tabBarIcon: ({color, size}) => (
            <Ionicons name="add-circle-outline" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="settings"
        component={Info}
        options={{
          tabBarLabel: 'Profile',
          headerShown: false,
          tabBarIcon: ({color, size}) => (
            <MaterialCommunityIcons
              name="account"
              color={color}
              size={size}
            />
          ),
        }}
      />

    </Tab.Navigator>
  );
}
