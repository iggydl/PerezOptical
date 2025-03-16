import React, { useState, useEffect } from 'react';
import { useRoute, useNavigation } from '@react-navigation/native';
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
  const navigation = useNavigation();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [cpassword, setConfirmPassword]= useState('');
  const [activeTab, setActiveTab] = useState('register');
  const [errorMessage, setErrorMessage] = useState(''); 
  const [registeredEmail, setRegisteredEmail] = useState('');
  const [registeredPassword, setRegisteredPassword] = useState('');

  useEffect(() => {
    if (route.params?.activeTab) {
      setActiveTab(route.params.activeTab);
    }
  }, [route.params?.activeTab]);

  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = () => {
    setErrorMessage(""); 

    if (!name.trim() && !email.trim() && !password.trim() && !cpassword.trim()) {
        setErrorMessage("All fields are required!");
        return;
    }
    else if (!name.trim()){
      setErrorMessage("Please enter your name!");
        return;
    }
    else if (!email.trim()){
      setErrorMessage("Please enter your email!");
        return;
    }
    else if (!password.trim()){
      setErrorMessage("Please enter your password!");
        return;
    }
    else if (!cpassword.trim()){
      setErrorMessage("Please confirm your password!");
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
    else if (cpassword != password){
      setErrorMessage("Passwords do not match. Please enter the same password!");
        return;
    }

    setRegisteredEmail(email);
    setRegisteredPassword(password);
    Alert.alert("Success", "Registration successful ", [
      { text: "OK", onPress: () => setActiveTab('login') }
    ]);
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
              <TextInput style={formStyle.input} placeholder="Username" value={name} onChangeText={setName} />

              <Text style={formStyle.label}>Email</Text>
              <TextInput
                style={formStyle.input}
                placeholder="Email"
                keyboardType="email-address"
                value={email}
                onChangeText={setEmail}
              />

              <Text style={formStyle.label}>Password</Text>
              <View style={formStyle.passwordContainer}>
                <TextInput
                  style={formStyle.input}
                  placeholder="Password"
                  secureTextEntry={!showPassword}
                  value={password}
                  onChangeText={setPassword}
                />
                <View style={formStyle.checkboxContainer}>
                  <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                    <Image
                      source={showPassword ? require('../assets/img/closedeye.png') : require('../assets/img/openeye.png')}
                      style={{ width: 45, height: 45 }}
                    />
                  </TouchableOpacity>
                </View>
              </View>
              <Text style={formStyle.label}>Confirm Password</Text>
              <View style={formStyle.passwordContainer}>
                <TextInput
                  style={formStyle.input}
                  placeholder="Confirm Password"
                  secureTextEntry={!showPassword}
                  value={cpassword}
                  onChangeText={setConfirmPassword}
                />
              </View>

              {errorMessage ? <Text style={{ color: "red", marginBottom: 10 }}>{errorMessage}</Text> : null}

              <Danger onPress={handleSubmit} title="REGISTER" textStyle={{ color: 'black' }} />
            </View>
          )}

          {activeTab === 'login' && (
            <LoginScreen registeredEmail={registeredEmail} registeredPassword={registeredPassword} />
          )}
        </View>
      </View>
    </ImageBackground>
  );
}
