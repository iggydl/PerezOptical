import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import SplashScreen from './src/screen/SplashScreen';
import HomeScreenTwo from './src/screen/HomeScreenTwo';
import HomeScreen from './src/screen/HomeScreen';
import RegisterScreen from './src/screen/RegisterScreen';
import LoginScreen from './src/screen/LoginScreen';
import HomepageScreen from './src/screen/Homepage';
import ProfileScreen from './src/screen/ProfileScreen';
import EditProfileScreen from './src/screen/EditProfileScreen';
import { UserProvider } from './src/screen/UserContext';
import DashboardScreen from './src/screen/AdminDbScreen';
import OrdersScreen from './src/screen/OrderManageScreen';
import InventoryScreen from './src/screen/InventoryScreen';
import AppointmentsScreen from './src/screen/AppointmentScreen';


const Stack = createStackNavigator();

export default function App() {
  return (
    <UserProvider>
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="HomeScreen" component={HomeScreen} />
        <Stack.Screen name="HomeScreenTwo" component={HomeScreenTwo} />
        <Stack.Screen name="RegisterScreen" component={RegisterScreen}/>
        <Stack.Screen name="LoginScreen" component={LoginScreen}/>
        <Stack.Screen name="Homepage" component={HomepageScreen}/>
        <Stack.Screen name="Profile" component={ProfileScreen}/>
        <Stack.Screen name="EditProfile" component={EditProfileScreen}/>
        <Stack.Screen name="Dashboard" component={DashboardScreen}/>
        <Stack.Screen name="Orders" component={OrdersScreen}/>
        <Stack.Screen name="Inventory" component={InventoryScreen}/>
        <Stack.Screen name="Appointment" component={AppointmentsScreen}/>
       
      </Stack.Navigator>
    </NavigationContainer>
    </UserProvider>
  );
}
