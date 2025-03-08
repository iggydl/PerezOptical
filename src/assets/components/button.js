import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

// Button 1: Default style
export const Button1 = ({ onPress, title, textStyle }) => (
  <TouchableOpacity style={styles.button1} onPress={onPress}>
    {/* Apply the passed textStyle prop here */}
    <Text style={[styles.buttonText, textStyle]}>{title}</Text>
  </TouchableOpacity>
);

export const Danger = ({ onPress, title }) => (
  <TouchableOpacity style={styles.danger} onPress={onPress}>
    <Text style={styles.buttonText}>{title}</Text>
  </TouchableOpacity>
);

// Button 3: With background color
export const Button3 = ({ onPress, title }) => (
  <TouchableOpacity style={styles.button3} onPress={onPress}>
    <Text style={styles.buttonText}>{title}</Text>
  </TouchableOpacity>
);

// Button 4: Round button
export const Button4 = ({ onPress, title }) => (
  <TouchableOpacity style={styles.button4} onPress={onPress}>
    <Text style={styles.buttonText}>{title}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  button1: {
    backgroundColor: '#fff',
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 5,
    marginBottom: 20,
  },
  danger: {
    backgroundColor: '#C8181E',
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 5,
    marginBottom: 20,
  },
  button3: {
    backgroundColor: '#e74c3c',
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 30,
    marginBottom: 20,
  },
  button4: {
    backgroundColor: '#9b59b6',
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 50, // Make the button round
    marginBottom: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
