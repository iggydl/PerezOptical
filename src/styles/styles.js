
import { StyleSheet } from "react-native";


export const homeScreenStyle = StyleSheet.create({
  
  backgroundImage: {
    flex: 1, // Ensure the background image covers the full screen
    justifyContent: 'center', // Center the content vertically
    alignItems: 'center', // Center the content horizontally
  },
  overlayContainer: {
    flex: 1,
    justifyContent: 'flex-end', // This will push the button to the bottom
    alignItems: 'center', // Center the button horizontally
    width: '100%',
    paddingBottom: 30, // Optional: Add some space at the bottom of the button
  },
  button: {
    backgroundColor: 'white', // Button background color
    paddingVertical: 10, // Vertical padding to make it more clickable
    paddingHorizontal: 20, // Horizontal padding for more width
    borderRadius: 10,
    width: '40%', 
    alignItems: 'center', 
    justifyContent: 'center', 
  },
  buttonText: {
    color: 'black', 
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export const homeScreenStyle2 = StyleSheet.create({
    button: {
      width: '80%', 
      paddingVertical: 12,
      borderRadius: 5, 
      alignSelf: 'center', 
      marginBottom: 15, 
      justifyContent: 'center', 
      alignItems: 'center', 
    },
    buttonText: {
      color: 'black', 
      fontSize: 16, 
      fontWeight: 'bold', 
    },
  });