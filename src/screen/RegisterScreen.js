import React, { useState } from 'react';
import {
  ImageBackground,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  CheckBox, // Import CheckBox from React Native
} from 'react-native';
import { homeScreenStyle } from '../styles/styles'; // Assuming this is your style file
import { Danger } from '../assets/components'; // Importing from index.js
import { formStyle } from '../styles/RegisterNLogin';

export default function RegisterScreen() {
  // State for form inputs
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // State to handle active tab (Login or Register)
  const [activeTab, setActiveTab] = useState('register');

  // State to handle password visibility
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = () => {
    // Handle form submission (for either register or login)
    console.log('Name:', name);
    console.log('Email:', email);
    console.log('Password:', password);
    // You can add logic here for form submission or validation
  };

  return (
    <ImageBackground
      source={require('../assets/img/bg.png')}
      style={homeScreenStyle.backgroundImage} // Ensure the image fills the screen
    >
      <View style={formStyle.container}>
        {/* Tabs for Login/Register */}
        <View style={formStyle.tabContainer}>
          <TouchableOpacity
            style={[
              formStyle.tabButton,
              activeTab === 'login' && formStyle.activeTab,
            ]}
            onPress={() => setActiveTab('login')}
          >
            <Text
              style={[
                formStyle.tabText,
                activeTab === 'login' && formStyle.activeTabText,
              ]}
            >
              LOGIN
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              formStyle.tabButton,
              activeTab === 'register' && formStyle.activeTab,
            ]}
            onPress={() => setActiveTab('register')}
          >
            <Text
              style={[
                formStyle.tabText,
                activeTab === 'register' && formStyle.activeTabText,
              ]}
            >
              REGISTER
            </Text>
          </TouchableOpacity>
        </View>

        {/* Form */}
        <View style={formStyle.formContainer}>
          {activeTab === 'register' && (
            <View style={formStyle.form}>
              {/* Name Field with Label */}
              <Text style={formStyle.label}>Name</Text>
              <TextInput
                style={formStyle.input}
                placeholder="Enter your name"
                value={name}
                onChangeText={(text) => setName(text)}
              />

              {/* Email Field with Label */}
              <Text style={formStyle.label}>Email</Text>
              <TextInput
                style={formStyle.input}
                placeholder="Enter your email"
                keyboardType="email-address"
                value={email}
                onChangeText={(text) => setEmail(text)}
              />

              {/* Password Field with Label */}
              <Text style={formStyle.label}>Password</Text>
              <View style={formStyle.passwordContainer}>
                <TextInput
                  style={formStyle.input}
                  placeholder="Enter your password"
                  secureTextEntry={!showPassword} // Toggle password visibility
                  value={password}
                  onChangeText={(text) => setPassword(text)}
                />
                {/* CheckBox for Show/Hide Password */}
                <View style={formStyle.checkboxContainer}>
                  <CheckBox
                    value={showPassword}
                    onValueChange={() => setShowPassword(!showPassword)} // Toggle password visibility
                  />
                  <Text style={formStyle.checkboxText}>
                    {showPassword ? 'Hide Password' : 'Show Password'}
                  </Text>
                </View>
              </View>

              {/* Submit Button */}
              <Danger
                onPress={handleSubmit}
                title="GET STARTED"
                textStyle={{ color: 'black' }} // Set text color to black
              />
            </View>
          )}

          {activeTab === 'login' && (
            <View style={formStyle.form}>
              {/* Email Field with Label for Login */}
              <Text style={formStyle.label}>Email</Text>
              <TextInput
                style={formStyle.input}
                placeholder="Enter your email"
                keyboardType="email-address"
                value={email}
                onChangeText={(text) => setEmail(text)}
              />

              {/* Password Field with Label for Login */}
              <Text style={formStyle.label}>Password</Text>
              <View style={formStyle.passwordContainer}>
                <TextInput
                  style={formStyle.input}
                  placeholder="Enter your password"
                  secureTextEntry={!showPassword} // Toggle password visibility
                  value={password}
                  onChangeText={(text) => setPassword(text)}
                />
                {/* CheckBox for Show/Hide Password */}
                <View style={formStyle.checkboxContainer}>
                  <CheckBox
                    value={showPassword}
                    onValueChange={() => setShowPassword(!showPassword)} // Toggle password visibility
                  />
                  <Text style={formStyle.checkboxText}>
                    {showPassword ? 'Hide Password' : 'Show Password'}
                  </Text>
                </View>
              </View>

              {/* Submit Button */}
              <Danger
                onPress={handleSubmit}
                title="GET STARTED"
                textStyle={{ color: 'white' }} // Set text color to black
              />
            </View>
          )}
        </View>
      </View>
    </ImageBackground>
  );
}
