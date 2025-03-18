import React, { useState, useContext,useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { UserContext } from './UserContext';
import styles from '../styles/Editprofilestyle';

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
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.icon}>&#8592;</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Edit Profile</Text>
        <TouchableOpacity onPress={handleSave} disabled={!isChanged}>
          <Text style={[styles.icon, { opacity: isChanged ? 1 : 0.5 }]}>&#10004;</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.profileSection}>
        <Image 
          source={{ uri: 'https://static-00.iconduck.com/assets.00/profile-circle-icon-1023x1024-ucnnjrj1.png' }} 
          style={styles.profileImage} 
        />
      </View>

      <View style={styles.form}>
        <Text style={styles.label}>Name</Text>
        <TextInput 
          style={styles.input} 
          value={name} 
          onChangeText={setName} 
          placeholder="Enter your name"
        />

        <Text style={styles.label}>Email Address</Text>
        <TextInput 
          style={styles.input} 
          value={email} 
          onChangeText={setEmail} 
          placeholder="Enter your email"
          keyboardType="email-address"
        />

        <Text style={styles.label}>Password</Text>
        <TextInput 
          style={styles.input} 
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
            <Text style={styles.label}>Confirm Password</Text>
            <TextInput 
              style={styles.input} 
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


