import {StyleSheet} from 'react-native';
export const formStyle = StyleSheet.create({
  container: {
    position: 'absolute', // This will position the container at the bottom
    bottom: 0, // Position it at the bottom of the screen
    width: '100%', // Set the container to take up 100% of the screen width
    height: '70%', // Container height will be 70% of the screen height
    backgroundColor: 'white', // White background color
    borderTopLeftRadius: 30, // Optional: rounded corners
    borderTopRightRadius: 30, // Optional: rounded corners
    paddingHorizontal: 20, // Add horizontal padding for the inputs and button
  },
  tabContainer: {
    flexDirection: 'row', // Align tabs horizontally
    width: '100%', // Take full width of the container
    justifyContent: 'space-around', // Space out the tabs with equal space around them
    paddingTop: 10, // Add top padding for a little space from the container edge
  },
  tabButton: {
    flex: 1, // Each button will take up 50% of the width
    paddingVertical: 10,
    borderBottomWidth: 2,
    borderBottomColor: 'transparent', // Initial border color (not active)
    borderWidth: 1, // Border around the tab button
    borderColor: '#ccc', // Default border color
    borderRadius: 5, // Slightly rounded corners for the tab button
    alignItems: 'center', // Center the text horizontally
    justifyContent: 'center', // Center the text vertically
    marginHorizontal: 6, // Add horizontal margin to create space between buttons
  },
  activeTab: {
    backgroundColor: '#C8181E', // Active tab has red background
  },
  tabText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black', // Default color for text (not active)
  },
  activeTabText: {
    color: 'white', // Text color is white for active tab
  },
  formContainer: {
    flex: 1, // Take remaining space after tabs
    justifyContent: 'center', // Center the form vertically
    alignItems: 'center', // Center the form horizontally
  },
  form: {
    width: '100%', // Ensure the form takes up the full width
  },

  input: {
    height: 45,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 15,
    paddingLeft: 10,
    // Add shadow for iOS
    shadowColor: '#000', // Shadow color
    shadowOffset: { width: 0, height: 2 }, // Offset for shadow
    shadowOpacity: 0.25, // Shadow opacity
    shadowRadius: 3.5, // Shadow radius
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333', // You can customize this color as per your design
    marginBottom: 7, // Space between the label and input field
    alignSelf: 'flex-start', // Align label to the left
  },
  passwordContainer: {
    flexDirection: 'row',  // Align the input field and the button horizontally
    alignItems: 'center',  // Vertically align the button with the input field
    width: '100%',         // Ensure the container takes full width
  },
  eyeButton: {
    position: 'absolute',  // Position the button inside the input field
    right: 10,             // Right align the button
  },
  eyeButtonText: {
    fontSize: 16,
    color: '#007BFF',  // Make the text blue for visibility
  },
  button: {
    backgroundColor: '#4CAF50', // Green button color
    paddingVertical: 12,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
  },
});
