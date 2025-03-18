import React, { useContext } from 'react';
import { View, Text, Image, TouchableOpacity,Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StyleSheet } from 'react-native';
import { UserContext } from './UserContext'; 

export default function ProfileScreen() {
  const navigation = useNavigation();
  const { user, setUser } = useContext(UserContext); 

  const handleLogout = () => {
    setUser(null); 
    Alert.alert("Success", "Logout successfully!", [
          { text: "OK", onPress: () => navigation.navigate("RegisterScreen") }
        ]);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.icon}>&#8592;</Text>
        </TouchableOpacity>
        <Text style={styles.title}>MY PROFILE</Text>
        <TouchableOpacity onPress={() => navigation.navigate("EditProfile")}>
        <Image source={require('../assets/img/edit.png')}  />
        </TouchableOpacity>
      </View>

      <View style={styles.profileSection}>
        <Image 
          source={{ uri: 'https://static-00.iconduck.com/assets.00/profile-circle-icon-1023x1024-ucnnjrj1.png' }} 
          style={styles.profileImage} 
        />
        <Text style={styles.profileName}>{user ? user.username : "Guest"}</Text>
       
      </View>

      <View style={styles.cardContainer}>
        <TouchableOpacity style={styles.card}>
          <Text style={styles.cardIcon}>📦</Text>
          <Text style={styles.cardText}>Orders</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.card}>
          <Text style={styles.cardIcon}>❤️</Text>
          <Text style={styles.cardText}>Favorites</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.card}>
          <Text style={styles.cardIcon}>📅</Text>
          <Text style={styles.cardText}>Appointments</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.card} onPress={handleLogout}>
          <Image source={require('../assets/img/logout1.png')} style={{ width: 45, height: 45 }} />
          <Text style={styles.cardText}>Logout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#D24D57',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 40,
    paddingBottom: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
  icon: {
    fontSize: 24,
    color: 'white',
  },
  profileSection: {
    alignItems: 'center',
    marginTop: -10,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: 'white',
  },
  profileName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    marginTop: 10,
  },
  profileEmail: {
    fontSize: 14,
    color: 'white',
    marginTop: 5,
  },
  cardContainer: {
    backgroundColor: 'white',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    marginTop: 20,
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-around',
    flexWrap: 'wrap',
    height: 600,
  },
  card: {
    backgroundColor: '#D24D57',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    width: 150,
    marginTop: 20,
  },
  cardIcon: {
    fontSize: 30,
    color: 'white',
  },
  cardText: {
    color: 'white',
    marginTop: 5,
    fontWeight: 'bold',
  },
});
