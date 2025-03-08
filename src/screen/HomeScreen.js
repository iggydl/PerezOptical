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
      style={homeScreenStyle.backgroundImage} // Ensure the image fills the screen
    >
      <View style={homeScreenStyle.overlayContainer}>
        {/* Using Button1 here */}
        <Button1
          onPress={() => navigation.navigate('HomeScreenTwo')} // Navigate to Homescreen2 on button press
          title="GET STARTED"
          textStyle={{ color: 'black' }} // Set text color to black
        />
      </View>
    </ImageBackground>
  );
}
