/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Login from './screens/Login';
// import Register from './screens/Register';
import RegisterScreen from './screens/Register';
import TabBase from './navigation/TabBase';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Info from './components/Info';

const Stack = createStackNavigator();

const getUser = async () => {
  const currentUser = await AsyncStorage.getItem('user');
  return currentUser ? JSON.parse(currentUser) : null;
};

function App(): JSX.Element {

  const [user, setUser] = useState(null);

  useEffect(() => {
    (async () => {
      const userData = await getUser();
      setUser(userData);
    })();

  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {!user || !user.email ? (
          <>
            <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
            <Stack.Screen name="Register" component={RegisterScreen} />
            <Stack.Screen name="tabBase" component={TabBase} options={{ headerShown: false }} />
          </>
        ) : (
          <>
            <Stack.Screen name="tabBase" component={TabBase} options={{ headerShown: false }} />
            <Stack.Screen name="Info" component={Info} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
