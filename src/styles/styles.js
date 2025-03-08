
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
    borderRadius: 5,
    width: '40%', // Set width to 80% of the screen to allow some margin
    alignItems: 'center', // Center the text inside the button
    justifyContent: 'center', // Center the text inside the button
  },
  buttonText: {
    color: 'black', // Make text visible over background
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export const homeScreenStyle2 = StyleSheet.create({
    button: {
      width: '80%', // Set the button width to 80% of the container's width
      paddingVertical: 12, // Vertical padding inside button
      borderRadius: 5, // Rounded corners for the button
      alignSelf: 'center', // Center the button horizontally
      marginBottom: 15, // Add space between the buttons
      justifyContent: 'center', // Vertically center the text
      alignItems: 'center', // Horizontally center the text
    },
    buttonText: {
      color: 'black', // Set text color to black
      fontSize: 16, // Set font size for the button text
      fontWeight: 'bold', // Bold text
    },
  });