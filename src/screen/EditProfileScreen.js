import React, { useState, useContext,useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { UserContext } from './UserContext';
import {editProfile} from '../styles/Editprofilestyle';

export default function EditProfileScreen() {
  const navigation = useNavigation();
  const { user, setUser } = useContext(UserContext);

  const [name, setName] = useState(user?.username || '');
  const [email, setEmail] = useState(user?.email || '');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isChanged, setIsChanged] = useState(false);

  useEffect(() => {
    if (
      name !== user?.username ||
      email !== user?.email ||
      password.length > 0 ||
      confirmPassword.length > 0
    ) {
      setIsChanged(true);
    } else {
      setIsChanged(false);
    }
  }, [name, email, password, confirmPassword]);

  const handleSave = () => {
  
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
   
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d).{6,}$/;

  
 
    if (!name.trim() && !email.trim()) {
        Alert.alert("Failed","Please enter username and email!");
      return;
    }
    else if (!name.trim()){
        Alert.alert("Failed","Please enter username !");
      return;
    }
    else if (!email.trim()){
        Alert.alert("Failed","Please enter  email!");
      return;
    }
  
   
    if (!emailRegex.test(email)) {
        Alert.alert("Failed","Please enter a valid email address!");
      return;
    }
  
    
    if (password) {
      if (!passwordRegex.test(password)) {
        Alert.alert("Failed","Password must be at least 6 characters and contain at least 1 uppercase letter.");
        return;
      }
  
      
      if (password !== confirmPassword) {
        Alert.alert("Failed","Passwords do not match!");
        return;
      }
    }
  
   
    setUser({ ...user, username: name, email });
  
    Alert.alert("Success","Profile Updated!");
    navigation.goBack();
  };

  return (
    <View style={{flex: 1,
      backgroundColor: 'white',}}>
      <View style={editProfile.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={editProfile.icon}>&#8592;</Text>
        </TouchableOpacity>
        <Text style={editProfile.title}>Edit Profile</Text>
        <TouchableOpacity onPress={handleSave} disabled={!isChanged}>
          <Text style={[editProfile.icon, { opacity: isChanged ? 1 : 0.5 }]}>&#10004;</Text>
        </TouchableOpacity>
      </View>

      <View style={editProfile.profileSection}>
        <Image 
          source={{ uri: 'https://static-00.iconduck.com/assets.00/profile-circle-icon-1023x1024-ucnnjrj1.png' }} 
          style={editProfile.profileImage} 
        />
      </View>

      <View style={editProfile.form}>
        <Text style={editProfile.label}>Name</Text>
        <TextInput 
          style={editProfile.input} 
          value={name} 
          onChangeText={setName} 
          placeholder="Enter your name"
        />

        <Text style={editProfile.label}>Email Address</Text>
        <TextInput 
          style={editProfile.input} 
          value={email} 
          onChangeText={setEmail} 
          placeholder="Enter your email"
          keyboardType="email-address"
        />

        <Text style={editProfile.label}>Password</Text>
        <TextInput 
          style={editProfile.input} 
          value={password} 
          onChangeText={(text) => {
            setPassword(text);
            setShowConfirmPassword(text.length > 0);
          }} 
          placeholder="Enter new password"
          secureTextEntry
        />

        {showConfirmPassword && (
          <>
            <Text style={editProfile.label}>Confirm Password</Text>
            <TextInput 
              style={editProfile.input} 
              value={confirmPassword} 
              onChangeText={setConfirmPassword} 
              placeholder="Re-enter password"
              secureTextEntry
            />
          </>
        )}
      </View>
    </View>
  );
}


