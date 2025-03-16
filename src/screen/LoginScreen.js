import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';
import { Danger } from '../assets/components';
import { formStyle } from '../styles/RegisterNLogin';
import { useNavigation } from '@react-navigation/native';

export default function LoginScreen({ registeredEmail, registeredPassword }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const navigation = useNavigation();

  const handleSubmit = () => {
    setErrorMessage("");

    if (!email.trim() && !password.trim()) {
        setErrorMessage("All fields are required!");
        return;
    }else if (!email.trim()){
      setErrorMessage("Please enter your email");
      return;
    }
    else if (!password.trim()){
      setErrorMessage("Please enter your password");
      return;
    }

    if (email === registeredEmail && password === registeredPassword) {
      Alert.alert("Success", "Login successful!", [
        { text: "OK", onPress: () => navigation.navigate("Homepage") }
      ]);
    } else {
      setErrorMessage("Invalid email or password.");
    }
  };

  return (
    <View style={formStyle.form}>
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
        <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
          <Image
            source={showPassword ? require('../assets/img/closedeye.png') : require('../assets/img/openeye.png')}
            style={{ width: 45, height: 45 }}
          />
        </TouchableOpacity>
      </View>

      {errorMessage ? <Text style={{ color: "red", marginBottom: 10 }}>{errorMessage}</Text> : null}

      <Danger onPress={handleSubmit} title="LOGIN" textStyle={{ color: 'white' }} />
    </View>
  );
}
