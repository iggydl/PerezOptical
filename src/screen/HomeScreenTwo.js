import React from 'react';
import { ImageBackground, View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native'; 
import { homeScreenStyle, homeScreenStyle2 } from '../styles/styles'; 

export default function HomeScreenTwo() {
  const navigation = useNavigation();  

  return (
    <ImageBackground
      source={require('../assets/img/bg.png')}
      style={homeScreenStyle.backgroundImage} 
    >
      <View style={homeScreenStyle.overlayContainer}>
       
        <TouchableOpacity
          onPress={() => navigation.navigate('RegisterScreen', { activeTab: 'login' })}
          style={[homeScreenStyle2.button, { backgroundColor: '#C8181E' }]} 
        >
          <Text style={homeScreenStyle2.buttonText}>LOGIN</Text>
        </TouchableOpacity>

       
        <TouchableOpacity
          onPress={() => navigation.navigate('RegisterScreen', { activeTab: 'register' })}
          style={[homeScreenStyle2.button, { backgroundColor: 'white' }]} 
        >
          <Text style={homeScreenStyle2.buttonText}>SIGNUP</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}
