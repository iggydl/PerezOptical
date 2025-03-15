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

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async () => {
    setErrorMessage(""); 

    if (!email.trim() || !password.trim()) {
        setErrorMessage("All fields are required!");
        return;
    }


   

    try {
        const response = await fetch("http://10.0.2.2:4548/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, password }), 
        });

        const text = await response.text();
        console.log("📩 Server Response (Raw):", text);

        try {
            const data = JSON.parse(text);
            console.log("Parsed JSON Response:", data);

            if (response.ok) {
                setErrorMessage("");
                Alert.alert("Success", data.message);
            } else {
                setErrorMessage(data.message);
            }
        } catch (error) {
            console.log("JSON Parse Error:", error);
            setErrorMessage("Server returned an invalid response.");
        }
    } catch (error) {
        console.log("Network Request Failed:", error);
        setErrorMessage("Failed to connect to the server. Please try again.");
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
