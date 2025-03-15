import React, { useEffect } from "react";
import { View, Image, StyleSheet } from "react-native";

const SplashScreen = ({ navigation }) => {
  useEffect(() => {
    setTimeout(() => {
      navigation.replace("HomeScreen"); 
    }, 3000);
  }, []);

  return (
    <View style={styles.container}>
      <Image source={require("../assets/img/logo.png")} style={styles.image} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFFFFF", 
  },
  image: {
    width: '100%', 
    height: '100%',
    resizeMode: "contain",
  },
});

export default SplashScreen;