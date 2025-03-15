import React, { useState, useEffect } from 'react';
import { useRoute } from '@react-navigation/native';
import {
  ImageBackground,
  Image,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { homeScreenStyle } from '../styles/styles';
import { Danger } from '../assets/components';
import { formStyle } from '../styles/RegisterNLogin';
import LoginScreen from './LoginScreen';

export default function RegisterScreen() {
  const route = useRoute();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [activeTab, setActiveTab] = useState('');
  const [errorMessage, setErrorMessage] = useState(''); 

  useEffect(() => {
    if (route.params?.activeTab) {
      setActiveTab(route.params.activeTab);
    }
  }, [route.params?.activeTab]);

  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async () => {
    setErrorMessage(""); 

    
    if (!name.trim() || !email.trim() || !password.trim()) {
        setErrorMessage("All fields are required!");
        return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        setErrorMessage("Invalid email format!");
        return;
    }

    const passwordRegex = /^(?=.*[A-Z])(?=.*\d).{6,}$/;
    if (!passwordRegex.test(password)) {
        setErrorMessage("Password must have at least 1 uppercase letter, 1 number, and be at least 6 characters long.");
        return;
    }

  
    console.log("Sending Request with Data:", JSON.stringify({ name, email, password }));

    try {
        const response = await fetch("http://10.0.2.2:4548/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ name, email, password }),
        });

        const data = await response.json();

        console.log("Fetch Response:", response.status, data);

        if (response.ok) {
            setErrorMessage(""); 
            Alert.alert("Success", data.message);
        } else {
            setErrorMessage(data.message); 
        }
    } catch (error) {
        console.log("Network Request Failed:", error);
        setErrorMessage("Failed to register. Try again.");
    }
};


  return (
    <ImageBackground source={require('../assets/img/bg.png')} style={homeScreenStyle.backgroundImage}>
      <View style={formStyle.container}>
        <View style={formStyle.tabContainer}>
          <TouchableOpacity
            style={[formStyle.tabButton, activeTab === 'login' && formStyle.activeTab]}
            onPress={() => setActiveTab('login')}
          >
            <Text style={[formStyle.tabText, activeTab === 'login' && formStyle.activeTabText]}>LOGIN</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[formStyle.tabButton, activeTab === 'register' && formStyle.activeTab]}
            onPress={() => setActiveTab('register')}
          >
            <Text style={[formStyle.tabText, activeTab === 'register' && formStyle.activeTabText]}>REGISTER</Text>
          </TouchableOpacity>
        </View>

        <View style={formStyle.formContainer}>
          {activeTab === 'register' && (
            <View style={formStyle.form}>
              <Text style={formStyle.label}>Username</Text>
              <TextInput style={formStyle.input} placeholder="Enter your username" value={name} onChangeText={setName} />

              <Text style={formStyle.label}>Email</Text>
              <TextInput
                style={formStyle.input}
                placeholder="Enter your email"
                keyboardType="email-address"
                value={email}
                onChangeText={setEmail}
              />

              <Text style={formStyle.label}>Password</Text>
              <View style={formStyle.passwordContainer}>
                <TextInput
                  style={formStyle.input}
                  placeholder="Enter your password"
                  secureTextEntry={!showPassword}
                  value={password}
                  onChangeText={setPassword}
                />
                <View style={formStyle.checkboxContainer}>
                  <TouchableOpacity value={showPassword} onPress={() => setShowPassword(!showPassword)}>
                    <Image
                      source={showPassword ? require('../assets/img/closedeye.png') : require('../assets/img/openeye.png')}
                      style={{ width: 45, height: 45 }}
                    />
                  </TouchableOpacity>
                </View>
              </View>

            
              {errorMessage ? <Text style={{ color: "red", marginBottom: 10 }}>{errorMessage}</Text> : null}

              <Danger onPress={handleSubmit} title="REGISTER" textStyle={{ color: 'black' }} />
            </View>
          )}

          {activeTab === 'login' && <LoginScreen />}
        </View>
      </View>
    </ImageBackground>
  );
}
