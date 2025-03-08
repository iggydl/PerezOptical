import React from 'react';
import { ImageBackground, View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';  // Import the useNavigation hook
import { homeScreenStyle, homeScreenStyle2 } from '../styles/styles'; // Assuming this is your style file

export default function HomeScreenTwo() {
  const navigation = useNavigation();  // Initialize the navigation hook

  return (
    <ImageBackground
      source={require('../assets/img/bg.png')}
      style={homeScreenStyle.backgroundImage} // Ensure the image fills the screen
    >
      <View style={homeScreenStyle.overlayContainer}>
        {/* TouchableOpacity for LOGIN Button */}
        <TouchableOpacity
          onPress={() => navigation.navigate('RegisterScreen')} // Navigate to RegisterScreen on button press
          style={[homeScreenStyle2.button, { backgroundColor: '#C8181E' }]} // Set red background for LOGIN
        >
          <Text style={homeScreenStyle2.buttonText}>LOGIN</Text>
        </TouchableOpacity>

        {/* TouchableOpacity for SIGNUP Button */}
        <TouchableOpacity
          onPress={() => navigation.navigate('HomeScreen')} // Navigate to HomeScreen on button press
          style={[homeScreenStyle2.button, { backgroundColor: 'white' }]} // Set green background for SIGNUP
        >
          <Text style={homeScreenStyle2.buttonText}>SIGNUP</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}
