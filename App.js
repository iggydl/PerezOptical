import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import SplashScreen from './src/screen/SplashScreen';
import HomeScreenTwo from './src/screen/HomeScreenTwo';
import HomeScreen from './src/screen/HomeScreen';
import RegisterScreen from './src/screen/RegisterScreen';
import LoginScreen from './src/screen/LoginScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="HomeScreen" component={HomeScreen} />
        <Stack.Screen name="HomeScreenTwo" component={HomeScreenTwo} />
        <Stack.Screen name="RegisterScreen" component={RegisterScreen}/>
        <Stack.Screen name="LoginScreen" component={LoginScreen}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
