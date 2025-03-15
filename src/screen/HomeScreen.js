import React from 'react';
import { ImageBackground, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';  // Import the useNavigation hook
import { Button1 } from '../assets/components'; // Importing from index.js
import { homeScreenStyle } from '../styles/styles'; // Assuming this is your style file

export default function HomeScreen() {
  const navigation = useNavigation(); // Hook to access the navigation object

  return (
    <ImageBackground
      source={require('../assets/img/bg.png')}
      style={homeScreenStyle.backgroundImage} 
    >
      <View style={homeScreenStyle.overlayContainer}>
        {}
        <Button1
          onPress={() => navigation.navigate('HomeScreenTwo')} 
          title="GET STARTED"
          textStyle={{ color: 'black',borderRadius: 10 }} 
        />
      </View>
    </ImageBackground>
  );
}
